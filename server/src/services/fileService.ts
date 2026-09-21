import {
  createFileRepository,
  deleteFileRepository,
  getFileByFileIdRepository,
  getFilesByWorkspaceIdRepository,
  updateFileRepository,
} from "../repositories/fileRepository.js";
import { getWorkspaceByIdRepository } from "../repositories/workspaceRepository.js";
import { randomUUID } from "node:crypto";

export async function getFilesByWorkspaceIdService(workspaceId: string) {
  const workspace = await getWorkspaceByIdRepository(workspaceId);

  if (!workspace) {
    // workspace doesn't exist
    return undefined;
  }

  return getFilesByWorkspaceIdRepository(workspaceId);
}

export async function createFileService(
  workspaceId: string,
  name: string,
  language?: string,
  content?: string
) {
  const workspace = await getWorkspaceByIdRepository(workspaceId);

  if (!workspace) {
    return undefined;
  }

  const id = randomUUID();

  return createFileRepository(id, workspaceId, name, language, content);
}

export async function getFileByFileIdService(
  fileId: string,
  workspaceId: string
) {
  return getFileByFileIdRepository(fileId, workspaceId);
}

export async function updateFileService(
  workspaceId: string,
  fileId: string,
  updates: {
    name?: string;
    language?: string;
    content?: string;
  }
) {
  return updateFileRepository(workspaceId, fileId, updates);
}

export async function deleteFileService(workspaceId: string, fileId: string) {
    return deleteFileRepository(workspaceId, fileId)
}