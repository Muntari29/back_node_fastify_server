import axios from 'axios';

// 간단한 메모리 기반 대화 세션 저장소 (예시)
const sessions: { [sessionId: string]: any[] } = {};

// 게임별 기본 시스템 메시지 맵 (필요에 따라 확장)
const gameSystemMessages: { [gameId: string]: string } = {
  lostark: "너는 로스트 아크 전문가야. 사용자에게 로스트 아크에 관한 정보를 제공해줘.",
  leagueoflegends: "너는 League of Legends 전문가야. 사용자에게 LoL에 관한 정보를 제공해줘.",
  overwatch2: "너는 Overwatch 2 전문가야. 사용자에게 Overwatch 2에 관한 정보를 제공해줘.",
  valorant: "너는 Valorant 전문가야. 사용자에게 Valorant에 관한 정보를 제공해줘."
};

function initSession(sessionId: string, gameId: string) {
  const systemMessage = gameSystemMessages[gameId.toLowerCase()] ||
    "너는 게임 전문가야. 사용자에게 게임에 관한 정보를 제공해줘.";
  sessions[sessionId] = [
    {
      role: "system",
      content: systemMessage
    }
  ];
}

export class AiService {
  async sendMessage(sessionId: string, gameId: string, userMessage: string): Promise<string> {
    // 세션이 없으면 해당 게임에 맞춰 초기화
    if (!sessions[sessionId]) {
      initSession(sessionId, gameId);
    }
    // 사용자의 메시지를 세션에 추가
    sessions[sessionId].push({ role: "user", content: userMessage });

    // GPT API 호출
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: sessions[sessionId],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    // 응답 메시지를 세션에 추가하고 반환
    const aiMessage = response.data.choices[0].message.content;
    sessions[sessionId].push({ role: "assistant", content: aiMessage });
    return aiMessage;
  }
}
