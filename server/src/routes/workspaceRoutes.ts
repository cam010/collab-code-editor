import { Router } from "express"
import { createWorkspaceController, getAllWorkspacesController } from "../controllers/workspaceController.js"

const router = Router()

router.get("/", getAllWorkspacesController)
router.post("/", createWorkspaceController)

export default router
