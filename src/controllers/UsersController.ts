// src/controllers/UsersController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { UsersService } from '../services/UsersService';

export class UsersController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  /**
   * 회원가입 컨트롤러
   * 요청 본문에서 name, password, email을 받아서 사용자 등록 처리
   */
  async register(request: FastifyRequest, reply: FastifyReply) {
    const { name, password, email } = request.body as { name: string; password: string; email: string };
    try {
      const user = await this.usersService.register(name, password, email);
      reply.send({ success: true, user });
    } catch (error) {
      console.error('Registration error:', error);
      reply.status(500).send({ error: 'Registration failed' });
    }
  }

  /**
   * 로그인 컨트롤러
   * 요청 본문에서 name, password를 받아서 로그인 처리 후 JWT 토큰 발급
   */
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { name, password } = request.body as { name: string; password: string };
    try {
      const token = await this.usersService.login(name, password);
      if (!token) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }
      reply.send({ success: true, token });
    } catch (error) {
      console.error('Login error:', error);
      reply.status(500).send({ error: 'Login failed' });
    }
  }

  /**
   * 사용자 프로필 조회 컨트롤러 (인증 필요)
   * 인증 미들웨어에서 request.user에 사용자 정보가 설정되어 있다고 가정
   */
  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request.user as any)?.id;
      if (!userId) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }
      reply.send({ success: true, user });
    } catch (error) {
      console.error('Get profile error:', error);
      reply.status(500).send({ error: 'Failed to fetch profile' });
    }
  }
}
