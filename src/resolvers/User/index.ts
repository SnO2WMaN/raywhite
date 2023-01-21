// import { PlatformUserResolvers } from "../../graphql/raywhite/index.js";

import { UserResolvers } from "../../graphql/raywhite/index.js";

export const resolveUser = () =>
  ({
    __resolveType: () => {
      return "AnilistUser";
    },
  } as UserResolvers);
