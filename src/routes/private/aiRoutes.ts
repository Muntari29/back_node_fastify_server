// src/routes/private/aiRoutes.ts
import { FastifyInstance } from 'fastify';
import { AiController } from '../../controllers/AiController';
import { authenticate } from '../../middlewares/auth';
import { AiService } from '../../services/AIService';

export default async function privateAiRoutes(fastify: FastifyInstance, options: any) {
  const aiService = new AiService();
  const aiController = new AiController(aiService);

  // 인증 미들웨어를 preHandler에 추가하여, 로그인한 사용자만 접근 가능하도록 설정합니다.
  fastify.post('/ai/chat', { preHandler: [authenticate] }, async (request, reply) => {
    return aiController.chat(request, reply);
  });
}
