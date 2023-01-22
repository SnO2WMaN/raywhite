import { AnilistWatchstatusResolvers } from "../../graphql/raywhite/index.js";
import { ResolverInjections } from "../index.js";
import { resolveAnime } from "./resolveAnime.anilist.js";

export const resolveAnilistWatchstatus = ({ redis }: Pick<ResolverInjections, "redis">) =>
  ({
    id: ({ anilistUserId, anilistAnimeId }) => {
      return JSON.stringify({ user: anilistUserId, anime: anilistAnimeId });
    },
    anime: resolveAnime({ redis }),
  } as AnilistWatchstatusResolvers);
