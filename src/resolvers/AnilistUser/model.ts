import { UserModel } from "../User/model.js";

export class AnilistUserModel extends UserModel {
  constructor(private readonly entity: { id: number }) {
    super();
  }

  get internalId() {
    return this.entity.id;
  }
}
