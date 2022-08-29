import ValidateError from '../middleWares/ValidateError';
import { IMatch } from '../interfaces/index';
import Matches from '../database/models/matches';
import { auth } from '../middleWares/authentication';
import Teams from '../database/models/teams';

export default class matchService {
  static async get() {
    const matches = await Matches.findAll({ include: [
      { association: 'teamHome',
        attributes: [
          'teamName',
        ] },
      { association: 'teamAway',
        attributes: [
          'teamName',
        ] },
    ] });
    return matches;
  }

  public static async getByProgress(progress: boolean) {
    const matches = await Matches.findAll({
      where: { inProgress: progress },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  }

  static async add(body: IMatch, token: string) {
    const authorization = await auth(token as string);

    if (!authorization) {
      throw new ValidateError(401, 'Token must be a valid token');
    }

    // não permite criar uma partida com o mesmo time
    if (body.homeTeam === body.awayTeam) {
      throw new ValidateError(401, 'It is not possible to create a match with two equal teams');
    }
    // encontra o id de cada time
    const homeTeam = await Matches.findByPk(body.homeTeam);
    const awayTeam = await Matches.findByPk(body.awayTeam);
    // dispara um erro caso não encontre algum time que corresponda ao id buscado
    if (!homeTeam || !awayTeam) {
      throw new ValidateError(404, 'There is no team with such id!');
    }
    // cria uma nova partida
    const newMatch = await Matches.create({ ...body, inProgress: true });

    return newMatch;
  }

  static async finish(id: number) {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  static async update(id: number, body: IMatch) {
    await Matches.update(
      { ...body },
      { where: { id } },
    );
  }
}
