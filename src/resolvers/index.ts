import { type Resolvers } from "../graphql.js";
import { resolveAnilistAnime } from "./AnilistAnime/index.js";
import { resolveAnime } from "./Anime/index.js";
import { resolvePlatformAnime } from "./PlatformAnime/index.js";
import { resolveQuery } from "./Query/index.js";
import { resolveUser } from "./User/index.js";

export const resolvers = () =>
  ({
    Query: resolveQuery(),
    User: resolveUser(),
    Anime: resolveAnime(),
    AnilistAnime: resolveAnilistAnime(),
    PlatformAnime: resolvePlatformAnime(),
  } satisfies Resolvers);
