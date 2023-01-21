import { type Resolvers } from "../graphql/raywhite";
import { resolveAnilistAnime } from "./AnilistAnime/index.js";
import { resolveAnilistUser } from "./AnilistUser/index.js";
import { resolveAnime } from "./Anime/index.js";
import { resolvePlatformAnime } from "./PlatformAnime/index.js";
import { resolvePlatformUser } from "./PlatformUser/index.js";
import { resolveQuery } from "./Query/index.js";

export const resolvers = () =>
  ({
    Query: resolveQuery(),
    Anime: resolveAnime(),
    PlatformAnime: resolvePlatformAnime(),
    AnilistAnime: resolveAnilistAnime(),
    PlatformUser: resolvePlatformUser(),
    AnilistUser: resolveAnilistUser(),
  } satisfies Resolvers);
