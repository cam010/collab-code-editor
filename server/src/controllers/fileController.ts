import {
  createFileService,
  deleteFileService,
  getFileByFileIdService,
  getFilesByWorkspaceIdService,
  updateFileService,
} from "../services/fileService.js";
import { Request, Response } from "express";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function getFilesByWorkspaceIdController(
  req: Request,
  res: Response
) {
  const { workspaceId } = req.params;

  if (typeof workspaceId !== "string" || !UUID_REGEX.test(workspaceId)) {
    return res.status(400).json({
      error: "Invalid Workspace id",
    });
  }

  const files = await getFilesByWorkspaceIdService(workspaceId.trim());

  if (files === undefined) {
    return res.status(404).json({
      error: "Workspace Not Found",
    });
  }
  return res.status(200).json(files);
}

export async function createFileController(req: Request, res: Response) {
  const { workspaceId } = req.params;
  const name = req.body?.name;
  const language = req.body?.language;
  const content = req.body?.content;

  if (typeof workspaceId !== "string" || !UUID_REGEX.test(workspaceId)) {
    return res.status(400).json({
      error: "Invalid Workspace id",
    });
  }

  if (typeof name !== "string" || name.trim() == "") {
    return res.status(400).json({
      error: "File name is required",
    });
  }

  if (language !== undefined && typeof language !== "string") {
    return res.status(400).json({
      error: "File language must be a string",
    });
  }

  if (content !== undefined && typeof content !== "string") {
    return res.status(400).json({
      error: "File content must be a string",
    });
  }

  const response = await createFileService(
    workspaceId,
    name.trim(),
    language,
    content
  );

  if (response === undefined) {
    return res.status(404).json({
      error: "Workspace Not Found",
    });
  }

  return res.status(201).json(response);
}

export async function getFileByIdController(req: Request, res: Response) {
  const { workspaceId, fileId } = req.params;

  if (typeof workspaceId !== "string" || !UUID_REGEX.test(workspaceId)) {
    return res.status(400).json({
      error: "Invalid workspace id",
    });
  }

  if (typeof fileId !== "string" || !UUID_REGEX.test(fileId)) {
    return res.status(400).json({
      error: "Invalid file id",
    });
  }

  const file = await getFileByFileIdService(fileId, workspaceId);

  if (file === undefined) {
    return res.status(404).json({
      error: "File not found",
    });
  }

  return res.status(200).json(file);
}

export async function updateFileController(req: Request, res: Response) {
  const { workspaceId, fileId } = req.params;

  if (typeof workspaceId !== "string" || !UUID_REGEX.test(workspaceId)) {
    return res.status(400).json({
      error: "Invalid workspace id",
    });
  }

  if (typeof fileId !== "string" || !UUID_REGEX.test(fileId)) {
    return res.status(400).json({
      error: "Invalid file id",
    });
  }

  const name = req.body?.name;
  const language = req.body?.language;
  const content = req.body?.content;

  if (name === undefined && language === undefined && content === undefined) {
    return res.status(400).json({
      error: "One of name, language, content must be supplied",
    });
  }

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "File name must be a non-empty string",
      });
    }
  }

  if (language !== undefined && typeof language !== "string") {
    return res.status(400).json({
      error: "File language must be a string",
    });
  }

  if (content !== undefined && typeof content !== "string") {
    return res.status(400).json({
      error: "File content must be a string",
    });
  }

  const updates = {
    ...(name !== undefined && { name }),
    ...(language !== undefined && { language }),
    ...(content !== undefined && { content }),
  };

  const updatedFile = await updateFileService(workspaceId, fileId, updates);

  if (updatedFile === undefined) {
    return res.status(404).json({
      error: "File not found",
    });
  }

  return res.status(200).json(updatedFile);
}

export async function deleteFileController(req: Request, res: Response) {
  const { workspaceId, fileId } = req.params;

  if (typeof workspaceId !== "string" || !UUID_REGEX.test(workspaceId)) {
    return res.status(400).json({
      error: "Invalid workspace id",
    });
  }

  if (typeof fileId !== "string" || !UUID_REGEX.test(fileId)) {
    return res.status(400).json({
      error: "Invalid file id",
    });
  }

  const deletedFile = await deleteFileService(workspaceId, fileId);

  if (deletedFile === undefined) {
    return res.status(404).json({
      error: "File not found",
    });
  }

  return res.status(204).send();
}
