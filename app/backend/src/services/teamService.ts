import Teams from '../database/models/teams';

export default class teamService {
  static async getTeams() {
    const teams = await Teams.findAll();
    return teams;
  }

  static async getById(id: number) {
    const team = await Teams.findOne({
      where: { id },
    });
    return team;
  }
}
