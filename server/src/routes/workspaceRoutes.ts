import { Router } from "express"
import { createWorkspaceController, getAllWorkspaces } from "../controllers/workspaceController.js"

const router = Router()

router.get("/", getAllWorkspaces)
router.post("/", createWorkspaceController)

export default router
