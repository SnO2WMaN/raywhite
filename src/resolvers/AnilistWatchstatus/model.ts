import { WatchstatusModel } from "../Watchstatus/model.js";

export class AnilistWatchstatusModel extends WatchstatusModel {
  constructor(
    private readonly entity: {
      userAnilistId: number;
      animeAnilistId: number;
      // status: AnimeStatus;
    }
  ) {
    super();
  }

  get anilistUserId() {
    return this.entity.userAnilistId;
  }

  get anilistAnimeId() {
    return this.entity.animeAnilistId;
  }
}
