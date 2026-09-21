import { db } from "../db/database.js"


export async function getFilesByWorkspaceIdRepository(workspaceId: string) {
    return db
        .selectFrom("files")
        .select([
            "id",
            "workspace_id",
            "name",
            "language",
            "content",
        ])
        .where("workspace_id", "=", workspaceId)
        .execute();
}