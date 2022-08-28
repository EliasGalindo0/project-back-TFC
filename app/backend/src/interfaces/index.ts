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
  inProgress: boolean,
}

export interface ITeam {
  id: number,
  teamName: string
}
