import { db } from "../db/database.js";

export async function getAllWorkspacesRepository() {
    return db
        .selectFrom("workspaces")
        .select(["id", "name"])
        .execute();
}

export async function createWorkspaceRepository(id: string, name: string) {
    return db
        .insertInto("workspaces")
        .values({
            id,
            name,
        })
        .returning(["id", "name"])
        .executeTakeFirstOrThrow()
}

export async function getWorkspaceByIdRepository(id: string) {
    return db
    .selectFrom("workspaces")
    .select(["id", "name"])
    .where("id", "=", id)
    .executeTakeFirst();
}