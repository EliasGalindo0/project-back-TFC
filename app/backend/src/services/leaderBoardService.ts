import GeneralLeaderBoard from '../utils/generalLeaderBoard';
import { queryAwayTeam, queryHomeTeam } from '../utils/sql';
import sequelize from '../database/models';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { IBoard } from '../interfaces/index';

// A sua tabela deverá renderizar somente as PARTIDAS que já foram FINALIZADAS! Os seguintes pontos serão avaliados:
// - Se a lista de classificação está correta;
// - Se a regra de classificação se mantém mesmo com mudanças na classificação;
// - Se a tabela de classificação tem 10 colunas;
// - Se a tabela tem uma linha para cada time.

const sortRanking = (teamA: IBoard, teamB: IBoard) => {
  const points = teamA.totalPoints === teamB.totalPoints;
  const victories = teamA.totalVictories === teamB.totalVictories;
  const goalsBalance = teamA.goalsBalance === teamB.goalsBalance;
  const goalsFavor = teamA.goalsFavor === teamB.goalsFavor;

  if (points && victories && goalsBalance && goalsFavor) {
    return (teamB.goalsOwn - teamA.goalsOwn);
  }
  if (points && victories && goalsBalance) {
    return (teamB.goalsFavor - teamA.goalsFavor);
  }
  if (points && victories) {
    return (teamB.goalsBalance - teamA.goalsBalance);
  }
  if (points) {
    return (teamB.totalVictories - teamA.totalVictories);
  }
  return teamB.totalPoints - teamA.totalPoints;
};

export default class leaderBoardService {
  static async getHome(): Promise<IBoard[] | unknown> {
    const [response] = await sequelize.query(queryHomeTeam);
    return response;
  }

  static async getAway(): Promise<IBoard[] | unknown> {
    const [response] = await sequelize.query(queryAwayTeam);
    return response;
  }

  // desenvolvido em POO
  static async getGeneral(): Promise<IBoard[] | unknown> {
    const teams = await Teams.findAll({ raw: true }) as unknown as Teams[];
    const matches = await Matches.findAll({ where: { inProgress: false } }) as Matches[];
    const leaderBoard = teams.map((team) => new GeneralLeaderBoard(
      team.teamName,
      team.id,
      matches,
    ).attributes);
    return leaderBoard.sort((a, b) => sortRanking(a, b));
  }
}
