import { AnilistUserResolvers, Platform } from "../../graphql/raywhite/index.js";
import { buildGraphQLId } from "../../utils/id.js";
import { ResolverInjections } from "../index.js";
import { getAnimesFromAnilist } from "./GetAnimes.anilist.js";

export const resolveAnilistUser = ({ redis }: Pick<ResolverInjections, "redis">) =>
  ({
    id: ({ internalId }) => {
      return buildGraphQLId("AnilistUser", `${internalId}`);
    },

    platform: () => Platform.Anilist,

    watchstatuses: ({ internalId }, { input }) => {
      return getAnimesFromAnilist(redis, internalId, input.status);
    },
  } satisfies AnilistUserResolvers);
