export type NodeType = "User" | "AnilistUser";

export const buildGraphQLId = (type: NodeType, internalId: string): string =>
  Buffer.from(JSON.stringify({ type, id: internalId })).toString("base64url");
