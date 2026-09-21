import { getFilesByWorkspaceIdRepository } from "../repositories/fileRepository.js";
import { getWorkspaceByIdRepository } from "../repositories/workspaceRepository.js";

export async function getFilesByWorkspaceIdService (workspaceId: string) {
    const workspace = await getWorkspaceByIdRepository(workspaceId)

    if (!workspace) {
        // workspace doesn't exist
        return undefined
    }

    return getFilesByWorkspaceIdRepository(workspaceId);
}