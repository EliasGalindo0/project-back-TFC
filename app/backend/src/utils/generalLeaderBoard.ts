import Matches from '../database/models/matches';

export default class GeneralLeaderBoard {
  private _name: string;
  private _teamId: number;
  private _matches : Matches[];
  private _totalPoints = 0;
  private _totalGames = 0;
  private _totalVictories = 0;
  private _totalDraws = 0;
  private _totalLosses = 0;
  private _goalsFavor = 0;
  private _goalsOwn = 0;
  private _goalsBalance = 0;
  private _efficiency = 0;

  constructor(name: string, teamId: number, matchs: Matches[]) {
    this._name = name;
    this._teamId = teamId;
    this._matches = matchs;
    this.getAttributes();
    this.getBalance();
    this.getEfficiency();
  }

  private findTeam = (teamId: number, teamHomeId: number, teamAwayId: number) => {
    if (teamId === teamHomeId || teamId === teamAwayId) {
      return true;
    }
    return false;
  };

  getAttributes() {
    this._matches.forEach((match) => {
      if (this.findTeam(this._teamId, match.homeTeam, match.awayTeam)) {
        const { teamHomeGoals, teamAwayGoals } = this.getTeamGoals(
          this._teamId,
          match.homeTeam,
          match.homeTeamGoals,
          match.awayTeamGoals,
        );
        this._totalPoints += this.getPoints(teamHomeGoals, teamAwayGoals);
        this._totalGames += 1; this._goalsFavor += teamHomeGoals;
        this._goalsOwn += teamAwayGoals;
      }
    });
  }

  private getBalance() {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  private getEfficiency() {
    const efficiency = (this._totalPoints / (this._totalGames * 3)) * 100;
    this._efficiency = +efficiency.toFixed(2);
  }

  private getPoints = (teamHomeGoals: number, teamAwayGoals: number) => {
    if (teamHomeGoals > teamAwayGoals) {
      this._totalVictories += 1;
      return 3;
    }
    if (teamHomeGoals === teamAwayGoals) {
      this._totalDraws += 1;
      return 1;
    }
    this._totalLosses += 1;
    return 0;
  };

  private getTeamGoals = (
    teamId: number,
    homeTeamID: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    const teamHomeGoals = teamId === homeTeamID
      ? homeTeamGoals
      : awayTeamGoals;
    const teamAwayGoals = teamId === homeTeamID
      ? awayTeamGoals
      : homeTeamGoals;

    return { teamHomeGoals, teamAwayGoals };
  };

  get attributes() {
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}
