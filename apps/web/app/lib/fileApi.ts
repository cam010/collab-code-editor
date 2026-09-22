import { FileItem } from "../types/codeEditor";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getWorkspaceFiles(workspaceId: string) {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${apiUrl}/api/workspaces/${workspaceId}/files`);

  if (!response.ok) {
    throw new Error(`Failed to load files: ${response.status}`);
  }

  return response.json();
}

export async function createFile(
  workspaceId: string,
  filename: string
): Promise<FileItem> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(
    `${apiUrl}/api/workspaces/${workspaceId}/files`,
    {
      method: "POST",
      body: JSON.stringify({
        name: filename,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to create file: ${response.status}`);
  }

  return response.json();
}

export async function updateFile(
  workspaceId: string,
  fileId: string,
  language?: string,
  content?: string,
  newName?: string
) {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(
    `${apiUrl}/api/workspaces/${workspaceId}/files/${fileId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        ...(language !== undefined && { language }),
        ...(content !== undefined && { content }),
        ...(newName !== undefined && { name: newName }),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update file: ${response.status}`);
  }

  return response.json();
}
