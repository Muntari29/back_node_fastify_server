import { FastifyInstance } from "fastify";
import fastifyMySql from "@fastify/mysql";
import fp from "fastify-plugin";

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */

const dbConnector = fp(async (fastify: FastifyInstance) => {
  // MySQL connection settings
  fastify.register(fastifyMySql, {
    promise: true,
    connectionString: `mysql://root:${process.env.MYSQL_DB_ROOT_PASSWORD}@localhost/sys`,
  });
  fastify.ready(() => {
    // const mysql = fastify.mysql; // MySQL 풀 가져오기
    console.log("MySQL is ready");
  });

});

export default dbConnector;
