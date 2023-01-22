import { GraphQLError } from "graphql";
import { request as gqlRequest } from "graphql-request";
import * as z from "zod";

import { graphql } from "../../graphql/anilist/gql.js";
import { AnilistWatchstatusResolvers } from "../../graphql/raywhite/index.js";
import { AnilistAnimeModel } from "../AnilistAnime/model.js";
import { ResolverInjections } from "../index.js";

const cacheSchema = z.object({
  anilistId: z.number(),
  malId: z.union([z.number(), z.null()]),
});

export const resolveAnime = ({ redis }: Pick<ResolverInjections, "redis">) =>
  (async ({ anilistAnimeId }) => {
    const cacheKey = `anilist:anime:${anilistAnimeId}`;
    const cache = await redis.get(cacheKey);
    if (cache) {
      const parsed = cacheSchema.safeParse(JSON.parse(cache));
      if (parsed.success) {
        const { malId, anilistId } = parsed.data;
        return new AnilistAnimeModel({ anilistId, malId });
      }
    }

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

    const entity = {
      anilistId: data.Media.id,
      malId: data.Media.idMal || null,
    };

    redis.set(cacheKey, JSON.stringify(entity));

    return new AnilistAnimeModel(entity);
  }) satisfies AnilistWatchstatusResolvers["anime"];
