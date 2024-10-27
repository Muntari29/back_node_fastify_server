import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";

interface User {
  name: string;
  birthdate: string; // 'YYYY-MM-DD' 형식의 문자열
  gender: "Male" | "Female" | "Other";
  nickname: string;
  password: string;
}

async function routes(fastify: FastifyInstance, options: Object) {
  const connection = await fastify.mysql;

  // fastify.get("/", async (request, reply) => {
  //   return { hello: "world" };
  // });

  fastify.get("/", async (request, reply) => {
    // const connection = await fastify.mysql.getConnection();
    // Now you can use the connection to run queries
    const result = await connection.query("SELECT * FROM sys_config");
    reply.send(result);
    // Don't forget to release the connection back to the pool
    // connection.release();
  });

  // 회원가입 로직 추가
  // fastify.post(
  //   "/register",
  //   async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
  //     const { name, birthdate, gender, nickname, password } = request.body;

  //     // 비밀번호 해시화
  //     const hashedPassword = await bcrypt.hash(password, 10); // 10은 saltRounds

  //     // MySQL 데이터베이스에 사용자 추가
  //     const query = `
  //     INSERT INTO user (name, birthdate, gender, nickname, password)
  //     VALUES (?, ?, ?, ?, ?)
  //   `;

  //     try {
  //       await connection.query(query, [
  //         name,
  //         birthdate,
  //         gender,
  //         nickname,
  //         hashedPassword,
  //       ]);
  //       reply.code(201).send({ message: "User registered successfully!" });
  //     } catch (error) {
  //       console.error(error);
  //       reply.code(500).send({ message: "User registration failed." });
  //     } finally {
  //       connection.release();
  //     }
  //   }
  // );
}

export default routes;
