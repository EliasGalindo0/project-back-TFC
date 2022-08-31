import { queryAwayTeam, queryHomeTeam } from '../utils/sql';
import sequelize from '../database/models';

import { IBoard } from '../interfaces/index';

// A sua tabela deverá renderizar somente as PARTIDAS que já foram FINALIZADAS! Os seguintes pontos serão avaliados:
// - Se a lista de classificação está correta;
// - Se a regra de classificação se mantém mesmo com mudanças na classificação;
// - Se a tabela de classificação tem 10 colunas;
// - Se a tabela tem uma linha para cada time.

export default class leaderBoardService {
  static async get(): Promise<IBoard[] | unknown> {
    const [response] = await sequelize.query(queryHomeTeam);
    return response;
  }

  static async getAway(): Promise<IBoard[] | unknown> {
    const [response] = await sequelize.query(queryAwayTeam);
    return response;
  }
}
