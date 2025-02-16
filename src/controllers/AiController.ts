import { FastifyRequest, FastifyReply } from 'fastify';
import { AiService } from '../services/AIService';

export class AiController {
  private aiService: AiService;

  constructor(aiService: AiService) {
    this.aiService = aiService;
  }

  async chat(request: FastifyRequest, reply: FastifyReply) {
    // 클라이언트에서 sessionId와 gameId를 함께 전달하도록 한다.
    const { sessionId, gameId, message } = request.body as { sessionId: string; gameId: string; message: string };

    try {
      const aiResponse = await this.aiService.sendMessage(sessionId, gameId, message);
      reply.send({ success: true, response: aiResponse });
    } catch (error) {
      console.error('AI Chat error:', error);
      reply.status(500).send({ success: false, error: 'AI chat failed' });
    }
  }
}
