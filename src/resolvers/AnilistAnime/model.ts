export class AnilistAnimeModel {
  constructor(
    private readonly entity: {
      anilistId: number;
      malId?: number;
    }
  ) {}

  get anilistId() {
    return this.entity.anilistId;
  }

  get malId() {
    return this.entity.malId;
  }
}
