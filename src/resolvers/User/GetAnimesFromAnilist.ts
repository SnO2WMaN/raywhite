import { GraphQLError } from "graphql";
import { GraphQLClient } from "graphql-request";
import * as z from "zod";

import { getSdk } from "../../anilist.js";
import { AnimeStatus } from "../../graphql.js";
import { convertToAnilistStatus } from "../../utils/anilist.js";
import { AnilistAnimeModel } from "../AnilistAnime/model.js";

const schema = z.object({
  MediaListCollection: z.object({
    lists: z.array(
      z.object({
        entries: z.array(
          z.object({
            media: z.object({
              id: z.number(),
              idMal: z.number(),
            }),
          })
        ),
      })
    ),
  }),
});

export const getAnimesFromAnilist = async (name: string, status: AnimeStatus) => {
  const anilistStatus = convertToAnilistStatus(status);

  const data = await getSdk(new GraphQLClient("https://graphql.anilist.co")).GetAnimes({ name, status: anilistStatus });
  const parsed = schema.safeParse(data);

  if (!parsed.success) throw new GraphQLError("Parse Error"); // TODO: zod error

  const {
    MediaListCollection: { lists },
  } = parsed.data;

  return lists.reduce(
    (prev, { entries }) => [
      ...prev,
      ...entries.map(({ media }) => new AnilistAnimeModel({ id: media.id, idMal: media.idMal })),
    ],
    [] as AnilistAnimeModel[]
  );
};
