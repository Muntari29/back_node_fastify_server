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
    connectionString: `mysql://root:${process.env.MYSQL_DB_ROOT_PASSWORD}@localhost/sys`,
  });
});

export default dbConnector;
