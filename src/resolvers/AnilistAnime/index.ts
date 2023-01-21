import { AnilistAnimeResolvers } from "../../graphql.js";

export const resolveAnilistAnime = () =>
  ({
    id: ({ id }) => {
      return `AnilistAnime:${id}`;
    },
  } satisfies AnilistAnimeResolvers);
