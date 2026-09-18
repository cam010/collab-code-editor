import { Request, Response } from "express"
import { getWorkspaces } from "../services/workspaceService.js"

export function getAllWorkspaces(req: Request, res: Response): void {
    const workspaces = getWorkspaces()

    res.status(200).json(workspaces)
}

