import { fastify, FastifyReply, FastifyRequest } from "fastify";
import { createSchema, createYoga } from "graphql-yoga";
import RedisModule from "ioredis";

import { typeDefs } from "./graphql/raywhite/index.js";
import { ResolverInjections, resolvers as makeResolvers } from "./resolvers/index.js";

const redisClient = new RedisModule.default(process.env.REDIS_URL);

const app = fastify({
  logger: {
    enabled: true,
    transport: {
      target: "pino-pretty",
    },
  },
});

// graphql
const yoga = createYoga<{ req: FastifyRequest; reply: FastifyReply }>({
  schema: createSchema<{ req: FastifyRequest; reply: FastifyReply }>({
    typeDefs,
    resolvers: makeResolvers({ redis: redisClient } satisfies ResolverInjections),
  }),
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
  plugins: [],
});
app.route({
  url: "/graphql",
  method: ["GET", "POST", "OPTIONS"],
  config: { collectMetrics: true },
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequest(req, { req, reply });

    for (const [name, value] of response.headers) {
      reply.header(name, value);
    }

    reply.status(response.status);
    reply.send(response.body);

    return reply;
  },
});

app
  .listen({ port: 4000 })
  .then((serverUrl) => {
    app.log.info(`server listening at ${serverUrl}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
