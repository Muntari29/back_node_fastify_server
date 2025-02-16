// src/controllers/GamesController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { GamesService } from '../services/GameService';

export class GamesController {
  private gamesService: GamesService;

  constructor(gamesService: GamesService) {
    this.gamesService = gamesService;
  }

  /**
   * 전체 게임 목록 조회 컨트롤러
   */
  async getGames(request: FastifyRequest, reply: FastifyReply) {
    try {
      const games = await this.gamesService.getGames();
      reply.send({ success: true, games });
    } catch (error) {
      console.error('Get games error:', error);
      reply.status(500).send({ error: 'Failed to fetch games' });
    }
  }
}
