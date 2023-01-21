export class UserModel {
  constructor(
    private readonly entity: {
      id: string;
    }
  ) {}

  get id() {
    return this.entity.id;
  }

  get platform() {
    return this.id.split(":").at(0);
  }

  get name() {
    return this.id.split(":").at(1);
  }
}
