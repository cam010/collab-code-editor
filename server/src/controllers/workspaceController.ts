import { Request, Response } from "express"
import { getWorkspaces } from "../services/workspaceService.js"

export async function getAllWorkspaces(req: Request, res: Response): Promise<void> {
    const workspaces = await getWorkspaces()

    res.status(200).json(workspaces)
}

