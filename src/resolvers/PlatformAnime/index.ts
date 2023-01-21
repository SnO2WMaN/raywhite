import { PlatformAnimeResolvers } from "../../graphql/raywhite/index.js";

export const resolvePlatformAnime = () =>
  ({
    __resolveType() {
      return "AnilistAnime";
    },
  } satisfies PlatformAnimeResolvers);
