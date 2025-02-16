// src/services/GamesService.ts
import { GamesRepository } from "../repositories/GamesRepository";
import { Game } from "../models/Game";

export class GamesService {
  private gamesRepository: GamesRepository;

  constructor(gamesRepository: GamesRepository) {
    this.gamesRepository = gamesRepository;
  }

  /**
   * 전체 게임 목록 조회
   * @returns 게임 목록 배열
   */
  async getGames(): Promise<Game[]> {
    return await this.gamesRepository.getAllGames();
  }
}
