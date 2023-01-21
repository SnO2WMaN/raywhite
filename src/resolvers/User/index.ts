import { GraphQLError } from "graphql";

import { Platform, UserResolvers } from "../../graphql.js";
import { getAnimesFromAnilist } from "./GetAnimesFromAnilist.js";

export const resolveUser = () =>
  ({
    platform: ({ platform }) => {
      if (!platform) throw new GraphQLError("Cannot parse id to platform");

      switch (platform) {
        case "anilist":
          return Platform.Anilist;
        case "annict":
          return Platform.Annict;
        default:
          throw new GraphQLError("Cannot parse id to platform");
      }
    },
    name: ({ name }) => {
      if (!name) throw new GraphQLError("Cannot parse id to name");
      return name;
    },

    animes: ({ platform, name }, { input }) => {
      if (!platform) throw new GraphQLError("Cannot parse id to platform");
      if (!name) throw new GraphQLError("Cannot parse id to platform");

      switch (platform) {
        case "anilist": {
          if (input.status) return getAnimesFromAnilist(name, input.status);
          throw new GraphQLError("Cannot parse id to platform");
        }
        default:
          throw new GraphQLError("Unsupported");
      }
    },
  } satisfies UserResolvers);
