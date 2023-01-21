export class AnilistAnimeModel {
  constructor(
    private readonly entity: {
      id: number;
      idMal: number;
    }
  ) {}

  get id() {
    return this.entity.id;
  }
}
