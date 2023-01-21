import { type Resolvers } from "../graphql.js";
import { resolveAnime } from "./Anime/index.js";
import { resolveQuery } from "./Query/index.js";
import { resolveUser } from "./User/index.js";

export const resolvers = () =>
  ({
    Query: resolveQuery(),
    User: resolveUser(),
    Anime: resolveAnime(),
  } satisfies Resolvers);
