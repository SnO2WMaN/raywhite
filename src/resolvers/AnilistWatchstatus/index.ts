import { AnilistWatchstatusResolvers } from "../../graphql/raywhite/index.js";

export const resolveAnilistWatchstatus = () =>
  ({
    id: ({ anilistUserId, anilistAnimeId }) => {
      return JSON.stringify({ user: anilistUserId, anime: anilistAnimeId });
    },
  } as AnilistWatchstatusResolvers);
