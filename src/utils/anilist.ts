import { GraphQLError } from "graphql";

import { MediaListStatus } from "../anilist.js";
import { AnimeStatus } from "../graphql.js";

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
