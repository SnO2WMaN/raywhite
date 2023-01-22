import { GraphQLError } from "graphql";
import { request as gqlRequest } from "graphql-request";
import * as z from "zod";

import { graphql } from "../../graphql/anilist/gql.js";
import { WatchingStatus } from "../../graphql/raywhite/index.js";
import { convertToAnilistStatus } from "../../utils/anilist.js";
import { AnilistWatchstatusModel } from "../AnilistWatchstatus/model.js";
import { ResolverInjections } from "../index.js";

const schema = z.object({
  MediaListCollection: z.object({
    lists: z.array(
      z.object({
        entries: z.array(
          z.object({
            userId: z.number(),
            media: z.object({
              id: z.number(),
              idMal: z.union([z.null(), z.number()]),
            }),
          })
        ),
      })
    ),
  }),
});

export const getAnimesFromAnilist = async (
  redis: ResolverInjections["redis"],
  id: number,
  status: WatchingStatus
): Promise<AnilistWatchstatusModel[]> => {
  const anilistStatus = convertToAnilistStatus(status);

  const data = await gqlRequest(
    "https://graphql.anilist.co",
    graphql(`
      query GetWatchstatuses($userId: Int!, $status: MediaListStatus!) {
        MediaListCollection(type: ANIME, userId: $userId, status: $status) {
          lists {
            entries {
              userId
              status
              media {
                id
                idMal
              }
            }
          }
        }
      }
    `),
    {
      userId: id,
      status: anilistStatus,
    }
  );

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new GraphQLError("Parse Error"); // TODO: zod error
  }

  const {
    MediaListCollection: { lists },
  } = parsed.data;

  const reduced = lists.reduce(
    (prev, { entries }) => [
      ...prev,
      ...entries.map(({ userId, media }) => ({
        anilistUserId: userId,
        anilistAnimeId: media.id,
        malAnimeId: media.idMal,
      })),
    ],
    [] as {
      anilistUserId: number;
      anilistAnimeId: number;
      malAnimeId: number | null;
    }[]
  );
  for (const e of reduced) {
    await redis.set(
      `anilist:anime:${e.anilistAnimeId}`,
      JSON.stringify({ anilistId: e.anilistAnimeId, malId: e.malAnimeId })
    );
  }

  return reduced.map(
    ({ anilistAnimeId, anilistUserId }) =>
      new AnilistWatchstatusModel({
        animeAnilistId: anilistAnimeId,
        userAnilistId: anilistUserId,
      })
  );
};
