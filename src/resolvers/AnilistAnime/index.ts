import { AnilistAnimeResolvers } from "../../graphql/raywhite/index.js";

export const resolveAnilistAnime = () =>
  ({
    id: ({ anilistId }) => {
      return `AnilistAnime:${anilistId}`;
    },
  } satisfies AnilistAnimeResolvers);
