import { db } from "../db/database.js";

export async function findAllWorkspaces() {
    return db
        .selectFrom("workspaces")
        .select(["id", "name"])
        .execute();
}