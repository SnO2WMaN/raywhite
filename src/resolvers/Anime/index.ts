import { AnimeResolvers } from "../../graphql/raywhite/index.js";

export const resolveAnime = () =>
  ({
    __resolveType() {
      return "AnilistAnime";
    },
  } satisfies AnimeResolvers);
