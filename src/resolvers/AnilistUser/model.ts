import { PlatformUserModel } from "../PlatformUser/model.js";

export class AnilistUserModel extends PlatformUserModel {
  constructor(private readonly entity: { id: number }) {
    super();
  }

  get internalId() {
    return this.entity.id;
  }
}
