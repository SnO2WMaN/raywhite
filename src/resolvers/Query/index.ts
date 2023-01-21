import { QueryResolvers } from "../../graphql.js";
import { findUser } from "./findUser/index.js";

export const resolveQuery = () =>
  ({
    findUser,
  } satisfies QueryResolvers);
