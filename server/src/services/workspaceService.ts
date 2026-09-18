type Workspace =  {
    id: string
    name: string
}

const workspaces: Workspace[] = [
    // Temp Data for now
    {
        id: "1",
        name: "My Workspace"
    }
]

export function getWorkspaces(): Workspace[] {
    return workspaces
}