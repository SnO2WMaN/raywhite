import RedisModule from "ioredis";

import { type Resolvers } from "../graphql/raywhite";
import { resolveAnilistAnime } from "./AnilistAnime/index.js";
import { resolveAnilistUser } from "./AnilistUser/index.js";
import { resolveAnilistWatchstatus } from "./AnilistWatchstatus/index.js";
import { resolveAnime } from "./Anime/index.js";
import { resolveQuery } from "./Query/index.js";
import { resolveUser } from "./User/index.js";
import { resolveWatchstatus } from "./Watchstatus/index.js";

export type ResolverInjections = {
  redis: RedisModule.Redis;
};

export const resolvers = ({ redis }: ResolverInjections) =>
  ({
    Query: resolveQuery(),
    Anime: resolveAnime(),
    AnilistAnime: resolveAnilistAnime(),
    User: resolveUser(),
    AnilistUser: resolveAnilistUser({ redis }),
    Watchstatus: resolveWatchstatus(),
    AnilistWatchstatus: resolveAnilistWatchstatus({ redis }),
  } satisfies Resolvers);
