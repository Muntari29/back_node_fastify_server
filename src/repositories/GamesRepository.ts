import { Game } from "../models/Game"; 
import { MySQLPromisePool } from "@fastify/mysql";

export class GamesRepository {
  private pool: MySQLPromisePool;

  constructor(pool: MySQLPromisePool) {
    this.pool = pool;
  }

  // 모든 게임 데이터를 조회하는 메서드
  async getAllGames(): Promise<Game[]> {
    const [rows] = await this.pool.query("SELECT id, name, description FROM games");
    return rows as Game[];
  }
}
