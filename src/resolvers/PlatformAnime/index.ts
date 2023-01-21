import { PlatformAnimeResolvers } from "../../graphql.js";

export const resolvePlatformAnime = () =>
  ({
    __resolveType() {
      return "AnilistAnime";
    },
  } satisfies PlatformAnimeResolvers);
