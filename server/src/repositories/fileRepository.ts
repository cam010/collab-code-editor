import { db } from "../db/database.js";
import { FileUpdates } from "../types/types.js";

export async function getFilesByWorkspaceIdRepository(workspaceId: string) {
  return db
    .selectFrom("files")
    .select(["id", "workspace_id", "name", "language", "content"])
    .where("workspace_id", "=", workspaceId)
    .execute();
}

export async function createFileRepository(
  id: string,
  workspaceId: string,
  name: string,
  language?: string,
  content?: string
) {
  const values = {
    id,
    workspace_id: workspaceId,
    name,
    ...(language !== undefined && { language }),
    ...(content !== undefined && { content }),
  };

  return db
    .insertInto("files")
    .values(values)
    .returning(["id", "workspace_id", "name", "language", "content"])
    .executeTakeFirstOrThrow();
}

export async function getFileByFileIdRepository(
  fileId: string,
  workspaceId: string
) {
  return db
    .selectFrom("files")
    .select(["id", "workspace_id", "name", "language", "content"])
    .where("workspace_id", "=", workspaceId)
    .where("id", "=", fileId)
    .executeTakeFirst();
}

export async function updateFileRepository(
  workspaceId: string,
  fileId: string,
  // updates: FileUpdates
  updates: {
    name?: string;
    language?: string;
    content?: string;
  }
) {
  return db
    .updateTable("files")
    .set(updates)
    .where("workspace_id", "=", workspaceId)
    .where("id", "=", fileId)
    .returning(["id", "workspace_id", "name", "language", "content"])
    .executeTakeFirst();
}
