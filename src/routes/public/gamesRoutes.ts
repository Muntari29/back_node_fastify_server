import { FastifyInstance } from "fastify";
import { GamesRepository } from "../../repositories/GamesRepository";
import { GamesService } from "../../services/GameService";
import { GamesController } from "../../controllers/GamesController";

export default async function publicGamesRoutes(fastify: FastifyInstance, options: any) {
  // fastify.mysql는 dbConnector 플러그인에서 등록한 MySQL 풀입니다.
  const pool = fastify.mysql;
  const gamesRepository = new GamesRepository(pool);
  const gamesService = new GamesService(gamesRepository);
  const gamesController = new GamesController(gamesService);

  // GET /api/games : 게임 목록 조회 엔드포인트
  fastify.get("/games", async (request, reply) => {
    return gamesController.getGames(request, reply);
  });
}
