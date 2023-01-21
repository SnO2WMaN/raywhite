import { QueryResolvers } from "../../graphql/raywhite/index.js";
import { findUser } from "./findUser/index.js";

export const resolveQuery = () =>
  ({
    findUser,
  } satisfies QueryResolvers);
