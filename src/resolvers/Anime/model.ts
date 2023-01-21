export class AnimeModel {
  constructor(
    private readonly entity: {
      idMal: number;
    }
  ) {}

  get idMal() {
    return this.entity.idMal;
  }
}
