import { getAllWorkspacesRepository, createWorkspaceRepository } from "../repositories/workspaceRepository.js";
import { randomUUID } from "node:crypto";

export async function getAllWorkspacesService() {
    return getAllWorkspacesRepository();
}

export async function createWorkspaceService(name: string) {
    const id = randomUUID();
    return createWorkspaceRepository(id, name)
}