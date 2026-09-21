import { findAllWorkspaces, createWorkspaceRepository } from "../repositories/workspaceRepository.js";
import { randomUUID } from "node:crypto";

export async function getWorkspaces() {
    return findAllWorkspaces();
}

export async function createWorkspaceService(name: string) {
    const id = randomUUID();
    return createWorkspaceRepository(id, name)
}