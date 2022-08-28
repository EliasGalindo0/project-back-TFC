export interface IUser {
  id?: number,
  username?: string,
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

export interface ITeam {
  id: number,
  teamName: string
}
