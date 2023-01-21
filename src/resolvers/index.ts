import { type Resolvers } from "../graphql/raywhite";
import { resolveAnilistAnime } from "./AnilistAnime/index.js";
import { resolveAnilistUser } from "./AnilistUser/index.js";
import { resolveAnilistWatchstatus } from "./AnilistWatchstatus/index.js";
import { resolveAnime } from "./Anime/index.js";
import { resolvePlatformAnime } from "./PlatformAnime/index.js";
import { resolveQuery } from "./Query/index.js";
import { resolveUser } from "./User/index.js";
import { resolveWatchstatus } from "./Watchstatus/index.js";

export const resolvers = () =>
  ({
    Query: resolveQuery(),
    Anime: resolveAnime(),
    PlatformAnime: resolvePlatformAnime(),
    AnilistAnime: resolveAnilistAnime(),
    User: resolveUser(),
    AnilistUser: resolveAnilistUser(),
    Watchstatus: resolveWatchstatus(),
    AnilistWatchstatus: resolveAnilistWatchstatus(),
  } satisfies Resolvers);
