import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

interface AnimalParams {
  animal: string; // animal은 문자열이어야 함을 명시
}

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify: FastifyInstance, options: Object) {
  // const collection = fastify.mongo.db?.collection("test_collection");

  // if (!collection) {
  //   throw new Error("MongoDB collection not found");
  // }

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  // fastify.get("/ping", async (request, reply) => {
  //   return "pong\n";
  // });

  // fastify.get("/animals", async (request, reply) => {
  //   const result = await collection.find().toArray();
  //   if (result.length === 0) {
  //     throw new Error("No documents found");
  //   }
  //   return result;
  // });

  // fastify.get(
  //   "/animals/:animal",
  //   async (
  //     request: FastifyRequest<{ Params: AnimalParams }>,
  //     reply: FastifyReply
  //   ) => {
  //     const result = await collection.findOne({
  //       animal: request.params.animal,
  //     });
  //     if (!result) {
  //       throw new Error("Invalid value");
  //     }
  //     return result;
  //   }
  // );

  // const animalBodyJsonSchema = {
  //   type: "object",
  //   required: ["animal"],
  //   properties: {
  //     animal: { type: "string" },
  //   },
  // };

  // const schema = {
  //   body: animalBodyJsonSchema,
  // };

  // fastify.post(
  //   "/animals",
  //   { schema },
  //   async (request: FastifyRequest<{ Body: unknown }>, reply) => {
  //     // we can use the `request.body` object to get the data sent by the client
  //     const result = await collection.insertOne({
  //       animal: (request as any).body.animal,
  //     });
  //     return result;
  //   }
  // );
}

export default routes;
