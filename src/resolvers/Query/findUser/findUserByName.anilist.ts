import { GraphQLError } from "graphql";
import { request as gqlRequest } from "graphql-request";

import { graphql } from "../../../graphql/anilist/gql.js";
import { AnilistUserModel } from "../../AnilistUser/model.js";

export const findUserFromNameFromAnilist = async (name: string): Promise<AnilistUserModel> => {
  const data = await gqlRequest(
    "https://graphql.anilist.co",
    graphql(`
      query FindUserFromName($name: String!) {
        User(name: $name) {
          id
        }
      }
    `),
    { name }
  );

  if (!data.User) throw new GraphQLError("Not found");

  return new AnilistUserModel({ id: data.User.id });
};
