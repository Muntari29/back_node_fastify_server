// src/plugins/dbConnector.ts
import { FastifyInstance } from "fastify";
import fastifyMySql from "@fastify/mysql";
import fp from "fastify-plugin";

/**
 * DB Connector Plugin
 *
 * Fastify 인스턴스에 MySQL 커넥션 풀을 등록합니다.
 *
 * 환경변수를 사용하여 유연하게 설정할 수 있습니다.
 * - MYSQL_USER (기본값: 'root')
 * - MYSQL_DB_ROOT_PASSWORD
 * - MYSQL_HOST (기본값: 'localhost')
 * - MYSQL_DB_NAME (기본값: 'contents')
 *
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
const dbConnector = fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyMySql, {
    promise: true,
    connectionString: `mysql://${process.env.MYSQL_USER || "root"}:${
      process.env.MYSQL_DB_ROOT_PASSWORD
    }@${process.env.MYSQL_HOST || "localhost"}/${
      process.env.MYSQL_DB_NAME || "GP"
    }`,
  });

  fastify.ready((err) => {
    if (err) {
      console.error("MySQL 연결 오류:", err);
      process.exit(1);
    }
    console.log("MySQL is ready");
  });
});

export default dbConnector;
