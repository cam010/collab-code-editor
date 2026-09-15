'useclient';

import FileItemComponent from "./fileItem";
import type { FileItem } from "@/app/types/codeEditor";

interface FileExplorerProps {
    fileList: FileItem[]
    setSelectedFileId: Function
}

export default function FileExplorer({ fileList, setSelectedFileId }: FileExplorerProps) {
    return <div style={{ width: '15vw', height: '90vh' }}>
        {fileList.map((file) => (
            <FileItemComponent key={file.id} file={file} setSelectedFileId={setSelectedFileId} />
        ))}
    </div>
}