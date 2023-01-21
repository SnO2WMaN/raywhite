import { AnilistUserResolvers, Platform } from "../../graphql/raywhite/index.js";
import { buildGraphQLId } from "../../utils/id.js";
import { getAnimesFromAnilist } from "./GetAnimes.anilist.js";

export const resolveAnilistUser = () =>
  ({
    id: ({ internalId }) => {
      return buildGraphQLId("AnilistUser", `${internalId}`);
    },

    platform: () => Platform.Anilist,

    animes: ({ internalId }, { input }) => {
      return getAnimesFromAnilist(internalId, input.status);
    },
  } satisfies AnilistUserResolvers);
