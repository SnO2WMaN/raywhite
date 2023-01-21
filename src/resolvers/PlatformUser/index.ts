import { PlatformUserResolvers } from "../../graphql/raywhite/index.js";

export const resolvePlatformUser = () =>
  ({
    __resolveType: () => {
      return "AnilistUser";
    },
  } as PlatformUserResolvers);
