import { GraphQLError } from "graphql";
import { request as gqlRequest } from "graphql-request";

import { graphql } from "../../graphql/anilist/gql.js";
import { AnilistWatchstatusResolvers } from "../../graphql/raywhite/index.js";
import { AnilistAnimeModel } from "../AnilistAnime/model.js";

export const resolveAnime = () =>
  (async ({ anilistAnimeId }) => {
    const data = await gqlRequest(
      "https://graphql.anilist.co",
      graphql(`
        query ResolveAnilistWatchStatusAnime($id: Int!) {
          Media(id: $id) {
            id
            idMal
          }
        }
      `),
      { id: anilistAnimeId }
    );

    if (!data.Media) throw new GraphQLError("Not found"); // TODO: detailed message

    return new AnilistAnimeModel({
      anilistId: data.Media.id,
      malId: data.Media.idMal?.valueOf(),
    });
  }) satisfies AnilistWatchstatusResolvers["anime"];
