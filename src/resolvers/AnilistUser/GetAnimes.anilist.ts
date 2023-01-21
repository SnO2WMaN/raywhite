import { GraphQLError } from "graphql";
import { request as gqlRequest } from "graphql-request";
import * as z from "zod";

import { graphql } from "../../graphql/anilist/gql.js";
import { AnimeStatus } from "../../graphql/raywhite/index.js";
import { convertToAnilistStatus } from "../../utils/anilist.js";
import { AnilistWatchstatusModel } from "../AnilistWatchstatus/model.js";

const schema = z.object({
  MediaListCollection: z.object({
    lists: z.array(
      z.object({
        entries: z.array(
          z.object({
            userId: z.number(),
            media: z.object({
              id: z.number(),
            }),
          })
        ),
      })
    ),
  }),
});

export const getAnimesFromAnilist = async (id: number, status: AnimeStatus) => {
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
  if (!parsed.success) throw new GraphQLError("Parse Error"); // TODO: zod error

  const {
    MediaListCollection: { lists },
  } = parsed.data;

  return lists.reduce(
    (prev, { entries }) => [
      ...prev,
      ...entries.map(
        ({ userId, media }) =>
          new AnilistWatchstatusModel({
            userAnilistId: userId,
            animeAnilistId: media.id,
          })
      ),
    ],
    [] as AnilistWatchstatusModel[]
  );
};