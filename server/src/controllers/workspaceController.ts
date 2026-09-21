import { Request, Response } from "express"
import { createWorkspaceService, getAllWorkspacesService, getWorkspaceByIdService } from "../services/workspaceService.js"

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

export async function getWorkspaceByIdController(req: Request, res: Response) {
    const { workspaceId } = req.params;
    if (typeof workspaceId !== "string" || workspaceId.trim() == "") {
        return res.status(400).json({
            error: "Workspace id is required"
        })
    }

    const workspace = await getWorkspaceByIdService(workspaceId.trim());

    if (!workspace) {
        return res.status(404).json({
            error: "Workspace not found",
        });
    }

    res.status(200).json(workspace);
}
