import { Request, Response } from "express"
import { createWorkspaceService, getAllWorkspacesService } from "../services/workspaceService.js"

export async function getAllWorkspacesController(req: Request, res: Response): Promise<void> {
    const workspaces = await getAllWorkspacesService()

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