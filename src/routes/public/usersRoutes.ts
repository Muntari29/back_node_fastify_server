import { FastifyInstance } from "fastify";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersService } from "../../services/UsersService";
import { UsersController } from "../../controllers/UsersController";

export default async function publicUsersRoutes(fastify: FastifyInstance, options: any) {
  const pool = fastify.mysql;
  const usersRepository = new UsersRepository(pool);
  const usersService = new UsersService(usersRepository);
  const usersController = new UsersController(usersService);

  // POST /api/register : 회원가입 엔드포인트
  fastify.post("/register", async (request, reply) => {
    return usersController.register(request, reply);
  });

  // POST /api/login : 로그인 엔드포인트
  fastify.post("/login", async (request, reply) => {
    return usersController.login(request, reply);
  });
}
