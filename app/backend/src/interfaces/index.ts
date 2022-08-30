export interface IUser {
  id?: number,
  username?: string,
  role?: string,
  email: string,
  password: string
}

export interface IMatch {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean | string,
}

export interface ITeam {
  id: number,
  teamName: string
}

export type IBoard = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};
