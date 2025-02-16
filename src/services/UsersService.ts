// src/services/UsersService.ts
import { UsersRepository } from "../repositories/UsersRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export class UsersService {
  private usersRepository: UsersRepository;
  private jwtSecret: string;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
    this.jwtSecret = process.env.JWT_SECRET || "default_secret";
  }

  /**
   * 사용자 등록 로직
   * @param name 사용자 이름
   * @param password 평문 비밀번호
   * @param email 사용자 이메일
   * @returns 생성된 사용자 정보
   */
  async register(name: string, password: string, email: string): Promise<User> {
    // 필요에 따라 중복 사용자 체크 로직 추가 가능
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await this.usersRepository.createUser(name, hashedPassword, email);
    return { id: userId, name, password: hashedPassword, email };
  }

  /**
   * 사용자 로그인 로직
   * @param name 사용자 이름
   * @param password 평문 비밀번호
   * @returns 인증 성공 시 JWT 토큰, 실패 시 null
   */
  async login(name: string, password: string): Promise<string | null> {
    const user = await this.usersRepository.findUserByName(name);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;
    
    const token = jwt.sign({ id: user.id, name: user.name }, this.jwtSecret, { expiresIn: "1h" });
    return token;
  }

  /**
   * 사용자 ID로 사용자 정보 조회
   * @param userId 사용자 ID
   * @returns 사용자 정보 또는 null
   */
  async getUserById(userId: number): Promise<User | null> {
    return await this.usersRepository.getUserById(userId);
  }
}
