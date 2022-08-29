import Matches from '../database/models/matches';

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
}
