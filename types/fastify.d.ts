// 기존 FastifyInstance 확장
import {
  MySQLConnection,
  MySQLPool,
  MySQLPromiseConnection,
  MySQLPromisePool,
} from "@fastify/mysql";

// if you passed promise = true, type = 'connection'
declare module "fastify" {
  interface FastifyInstance {
    // promise: true 옵션을 사용하면 MySQLPromisePool 타입을 사용해야 합니다.
    mysql: MySQLPromisePool;
  }
}

// FastifyRequest에 user 속성 추가
declare module "fastify" {
  interface FastifyRequest {
    user?: any; // 필요한 경우 구체적인 타입으로 지정
  }
}
