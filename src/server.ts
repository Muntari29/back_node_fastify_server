import fastify from "fastify";
import firstRoute from "./routes/first_route";

const server = fastify();

server.register(firstRoute);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
