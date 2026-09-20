export interface WorkspaceTable {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface FileTable {
  id: string;
  workspace_id: string;
  name: string;
  language: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  workspaces: WorkspaceTable;
  files: FileTable;
}