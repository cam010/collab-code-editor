import { Request, Response } from "express"
import { createWorkspaceService, getWorkspaces } from "../services/workspaceService.js"

export async function getAllWorkspaces(req: Request, res: Response): Promise<void> {
    const workspaces = await getWorkspaces()

    res.status(200).json(workspaces)
}

export async function createWorkspaceController(req: Request, res: Response) {
    const { name } = req.body;

    if (typeof name !== "string" || name.trim() == "") {
        return res.status(400).json({
            error: "Workspace name is required"
        })
    }

    const response = await createWorkspaceService(name.trim());

    res.status(201).json(response)
}