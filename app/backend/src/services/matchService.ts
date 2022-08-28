import Matches from '../database/models/matches';

export default class matchService {
  static async get() {
    const matches = await Matches.findAll();
    return matches;
  }
}
