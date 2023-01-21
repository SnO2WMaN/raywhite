import { WatchstatusResolvers } from "../../graphql/raywhite/index.js";

export const resolveWatchstatus = () =>
  ({
    __resolveType() {
      return "AnilistWatchstatus";
    },
  } as WatchstatusResolvers);
