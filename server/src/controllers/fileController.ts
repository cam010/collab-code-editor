import { getFilesByWorkspaceIdService } from "../services/fileService.js";
import { Request, Response } from "express";

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function getFilesByWorkspaceIdController (req: Request, res: Response) {
    const { workspaceId } = req.params

    if (typeof workspaceId !== "string" || !UUID_REGEX.test(workspaceId)) {
        return res.status(400).json({
            error: "Invalid Workspace id"
        })
    }

    const files = await getFilesByWorkspaceIdService(workspaceId.trim())

    if (files === undefined) {
        return res.status(404).json({
            error: "Workspace Not Found"
        })
    }
    res.status(200).json(files)
}