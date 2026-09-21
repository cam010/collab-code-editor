import { db } from "../db/database.js";

export class DuplicateFileNameError extends Error {
  constructor() {
    super("A file with this name already exists in this workspace");
    this.name = "DuplicateFileNameError";
  }
}

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
  try {
    return await db
      .insertInto("files")
      .values(values)
      .returning(["id", "workspace_id", "name", "language", "content"])
      .executeTakeFirstOrThrow();
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "constraint" in error &&
      error.code === "23505" &&
      error.constraint === "files_workspace_id_name_unique"
    ) {
      throw new DuplicateFileNameError();
    }

    throw error;
  }
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
  try {
    return await db
      .updateTable("files")
      .set(updates)
      .where("workspace_id", "=", workspaceId)
      .where("id", "=", fileId)
      .returning(["id", "workspace_id", "name", "language", "content"])
      .executeTakeFirst();
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "constraint" in error &&
      error.code === "23505" &&
      error.constraint === "files_workspace_id_name_unique"
    ) {
      throw new DuplicateFileNameError();
    }

    throw error;
  }
}

export async function deleteFileRepository(
  workspaceId: string,
  fileId: string
) {
  return db
    .deleteFrom("files")
    .where("workspace_id", "=", workspaceId)
    .where("id", "=", fileId)
    .returning("id")
    .executeTakeFirst();
}
