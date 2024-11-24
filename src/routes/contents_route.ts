import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance, options: Object) {
  const connection = await fastify.mysql;

  fastify.get("/categories", async (request, reply) => {
    try {
      const [rows] = await connection.query("SELECT * FROM category");
      reply.send(rows);
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch categories" });
    }
  });

  fastify.get("/articles", async (request, reply) => {
    try {
      const [rows] = await connection.query("SELECT * FROM article");
      reply.send(rows);
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch articles" });
    }
  });
}

export default routes;
