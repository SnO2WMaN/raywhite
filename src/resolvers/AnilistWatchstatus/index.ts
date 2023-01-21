import { AnilistWatchstatusResolvers } from "../../graphql/raywhite/index.js";
import { resolveAnime } from "./resolveAnime.anilist.js";

export const resolveAnilistWatchstatus = () =>
  ({
    id: ({ anilistUserId, anilistAnimeId }) => {
      return JSON.stringify({ user: anilistUserId, anime: anilistAnimeId });
    },
    anime: resolveAnime(),
  } as AnilistWatchstatusResolvers);
