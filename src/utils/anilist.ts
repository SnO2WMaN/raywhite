import { GraphQLError } from "graphql";

import { MediaListStatus } from "../graphql/anilist/graphql.js";
import { WatchingStatus } from "../graphql/raywhite/index.js";

export const convertToAnilistStatus = (status: WatchingStatus): MediaListStatus => {
  switch (status) {
    case WatchingStatus.Completed:
      return MediaListStatus.Completed;
    case WatchingStatus.Watching:
      return MediaListStatus.Current;
    case WatchingStatus.Dropped:
      return MediaListStatus.Dropped;
    case WatchingStatus.Planning:
      return MediaListStatus.Planning;
    case WatchingStatus.Paused:
      return MediaListStatus.Paused;
    default:
      throw new GraphQLError("Error");
  }
};
