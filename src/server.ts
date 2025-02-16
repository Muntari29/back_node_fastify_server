import fastify from "fastify";
import dotenv from "dotenv";

import publicGamesRoutes from "./routes/public/gamesRoutes";
import publicUsersRoutes from "./routes/public/usersRoutes";
import dbConnector from "./plugins/register/dbConnector";
import privateAiRoutes from "./routes/private/aiRoutes";
import privateUsersRoutes from "./routes/private/usersRoutes";

dotenv.config();

const server = fastify({ logger: true });

// DB 플러그인 등록: fastify.mysql 로 MySQL 커넥션 풀에 접근 가능
server.register(dbConnector);

// Public API 엔드포인트 등록 (예: 게임 목록, 회원가입, 로그인)
// URL 예시: http://localhost:8080/api/games, http://localhost:8080/api/register, http://localhost:8080/api/login
server.register(publicGamesRoutes, { prefix: "/api" });
server.register(publicUsersRoutes, { prefix: "/api" });

server.register(privateAiRoutes, { prefix: "/api" });
server.register(privateUsersRoutes, { prefix: "/api" });

// 서버 시작
const start = async () => {
  try {
    await server.listen({ port: 8080, host: "0.0.0.0" });
    console.log(`Server listening on ${server.server.address()}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
