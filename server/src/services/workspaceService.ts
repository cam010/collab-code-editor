import { findAllWorkspaces } from "../repositories/workspaceRepository.js";

export async function getWorkspaces() {
    return findAllWorkspaces();
}