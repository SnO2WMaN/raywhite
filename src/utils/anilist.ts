import { GraphQLError } from "graphql";

import { MediaListStatus } from "../graphql/anilist/graphql.js";
import { AnimeStatus } from "../graphql/raywhite/index.js";

export const convertToAnilistStatus = (status: AnimeStatus): MediaListStatus => {
  switch (status) {
    case AnimeStatus.Completed:
      return MediaListStatus.Completed;
    case AnimeStatus.Watching:
      return MediaListStatus.Current;
    case AnimeStatus.Dropped:
      return MediaListStatus.Dropped;
    case AnimeStatus.Planning:
      return MediaListStatus.Planning;
    case AnimeStatus.Paused:
      return MediaListStatus.Paused;
    default:
      throw new GraphQLError("Error");
  }
};
