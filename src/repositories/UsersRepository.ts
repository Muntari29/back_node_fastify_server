import { User } from "../models/User";
import { MySQLPromisePool } from "@fastify/mysql";

export class UsersRepository {
  private pool: MySQLPromisePool;

  constructor(pool: MySQLPromisePool) {
    this.pool = pool;
  }

  // 새로운 사용자를 생성하고, 생성된 사용자 ID를 반환합니다.
  async createUser(name: string, hashedPassword: string, email: string): Promise<number> {
    const [result]: any = await this.pool.execute(
      "INSERT INTO users (name, password, email) VALUES (?, ?, ?)",
      [name, hashedPassword, email]
    );
    return result.insertId;
  }

  // 사용자 이름으로 사용자를 조회합니다.
  async findUserByName(name: string): Promise<User | null> {
    const [rows]: any = await this.pool.execute(
      "SELECT * FROM users WHERE name = ?",
      [name]
    );
    if (rows.length > 0) {
      return rows[0] as User;
    }
    return null;
  }

  // 사용자 ID로 사용자 정보를 조회합니다.
  // 여기서는 이메일과 이름, ID를 반환합니다.
  async getUserById(userId: number): Promise<User | null> {
    const [rows]: any = await this.pool.execute(
      "SELECT id, name, email FROM users WHERE id = ?",
      [userId]
    );
    if (rows.length > 0) {
      return rows[0] as User;
    }
    return null;
  }
}
