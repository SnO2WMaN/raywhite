import { GraphQLError } from "graphql";

import { Platform, QueryResolvers } from "../../../graphql/raywhite/index.js";
import { findUserFromNameFromAnilist } from "./findUserByName.anilist.js";

export const findUser = (async (
  _parent,
  {
    input: {
      user: { name, platform },
    },
  }
) => {
  switch (platform) {
    case Platform.Anilist:
      return findUserFromNameFromAnilist(name);
    default:
      throw new GraphQLError("Not supported");
  }
}) satisfies QueryResolvers["findUser"];
