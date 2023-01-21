import { GraphQLError } from "graphql";
import { GraphQLClient } from "graphql-request";
import * as z from "zod";

import { getSdk, MediaListStatus } from "../../anilist.js";
import { AnimeStatus } from "../../graphql.js";
import { AnimeModel } from "../Anime/model.js";

const convertAnimeStatusForAnilist = (status: AnimeStatus): MediaListStatus => {
  switch (status) {
    case AnimeStatus.Completed:
      return MediaListStatus.Completed;
    case AnimeStatus.Watching:
      return MediaListStatus.Current;
    case AnimeStatus.Dropped:
      return MediaListStatus.Dropped;
    case AnimeStatus.Planning:
      return MediaListStatus.Planning;
    case AnimeStatus.Paused:
      return MediaListStatus.Paused;
    default:
      throw new GraphQLError("Error");
  }
};

const schema = z.object({
  MediaListCollection: z.object({
    lists: z.array(
      z.object({
        entries: z.array(
          z.object({
            media: z.object({
              idMal: z.number(),
            }),
          })
        ),
      })
    ),
  }),
});

export const getFromStatus = async (name: string, status: AnimeStatus) => {
  const ss = convertAnimeStatusForAnilist(status);

  const data = await getSdk(new GraphQLClient("https://graphql.anilist.co")).GetAnimes({ name, status: ss });
  const parsed = schema.safeParse(data);

  if (!parsed.success) throw new GraphQLError("Parse Error"); // TODO: zod error

  const {
    MediaListCollection: { lists },
  } = parsed.data;

  return lists.reduce(
    (prev, { entries }) => [...prev, ...entries.map(({ media }) => new AnimeModel({ idMal: media.idMal }))],
    [] as AnimeModel[]
  );
};
