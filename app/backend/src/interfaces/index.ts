export interface IUser {
  id?: number,
  userName?: string,
  role?: string,
  email: string,
  password: string
}

export interface IMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number
}
