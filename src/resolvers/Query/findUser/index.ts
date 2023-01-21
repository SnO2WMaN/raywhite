import { GraphQLError } from "graphql";

import { Platform, QueryResolvers } from "../../../graphql.js";
import { UserModel } from "../../User/model.js";

export const findUser = (async (
  _parent,
  {
    input: {
      user: { name, platform },
    },
  }
) => {
  switch (platform) {
    case Platform.Annict:
      return new UserModel({ id: `annict:${name}` });
    case Platform.Anilist:
      return new UserModel({ id: `anilist:${name}` });
    default:
      throw new GraphQLError("Invalid input");
  }
}) satisfies QueryResolvers["findUser"];
