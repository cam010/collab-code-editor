import {
  createFileRepository,
  deleteFileRepository,
  DuplicateFileNameError,
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
    return { status: "workspace_not_found" } as const;
  }

  const id = randomUUID();

  try {
    const file = await createFileRepository(
      id,
      workspaceId,
      name,
      language,
      content
    );

    return {
      status: "created",
      file,
    } as const;
  } catch (error) {
    if (error instanceof DuplicateFileNameError) {
      return { status: "duplicate_name" } as const;
    }

    throw error;
  }
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
  const workspace = await getWorkspaceByIdRepository(workspaceId);

  if (!workspace) {
    return { status: "workspace_not_found" } as const;
  }

  try {
    const file = await updateFileRepository(workspaceId, fileId, updates);
    if (file === undefined) {
      return {
        status: "file_not_found",
      } as const;
    }

    return {
      status: "updated",
      file,
    } as const;
  } catch (error) {
    if (error instanceof DuplicateFileNameError) {
      return { status: "duplicate_name" } as const;
    }

    throw error;
  }
}

export async function deleteFileService(workspaceId: string, fileId: string) {
  return deleteFileRepository(workspaceId, fileId);
}
