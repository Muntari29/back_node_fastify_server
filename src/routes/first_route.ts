import { FastifyInstance } from "fastify";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify: FastifyInstance, options: Object) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/ping", async (request, reply) => {
    return "pong\n";
  });
}

export default routes;
