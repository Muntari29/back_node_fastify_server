import fastify from "fastify";
import firstRoute from "./routes/first_route";
import dbConnector from "./plugins/register/dbConnector";
import dotenv from "dotenv";

dotenv.config();

const server = fastify();

server.register(dbConnector);
server.register(firstRoute);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
