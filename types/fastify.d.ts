import {
  MySQLConnection,
  MySQLPool,
  MySQLPromiseConnection,
  MySQLPromisePool,
} from "@fastify/mysql";

// // if you only pass connectionString
// declare module "fastify" {
//   interface FastifyInstance {
//     mysql: MySQLPool;
//   }
// }

// // if you passed type = 'connection'
// declare module "fastify" {
//   interface FastifyInstance {
//     mysql: MySQLConnection;
//   }
// }

// // if you passed promise = true
// declare module "fastify" {
//   interface FastifyInstance {
//     mysql: MySQLPromisePool;
//   }
// }

// if you passed promise = true, type = 'connection'
declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromiseConnection;
    // mysql: MySQLPool;
  }
}
