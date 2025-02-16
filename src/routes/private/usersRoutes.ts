import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/auth";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersService } from "../../services/UsersService";
import { UsersController } from "../../controllers/UsersController";

export default async function privateUsersRoutes(fastify: FastifyInstance, options: any) {
  // MySQL 커넥션 풀 사용 (dbConnector 플러그인에서 등록된 fastify.mysql)
  const pool = fastify.mysql;
  const usersRepository = new UsersRepository(pool);
  const usersService = new UsersService(usersRepository);
  const usersController = new UsersController(usersService);

  // GET /api/auth/test 엔드포인트 (인증이 필요한 API)
  fastify.get('/auth/test', { preHandler: [authenticate] }, async (request, reply) => {
    return usersController.testAuth(request, reply);
  });
}
