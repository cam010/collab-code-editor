'useclient';

import FileItemComponent from "./fileItem";
import type { FileItem, Language } from "@/app/types/codeEditor";

import { AskFilename } from "./addFileFilenameAsker";
import { useState } from "react";


interface FileExplorerProps {
    fileList: FileItem[]
    setSelectedFileId: (id: string) => void
    selectedFileId: string | null
    addFile: (name: string) => Promise<void>
}

export default function FileExplorer({ fileList, setSelectedFileId, selectedFileId, addFile }: FileExplorerProps) {

    const [isAddFileOpen, setIsAddFileOpen] = useState(false);

    const handleAddFileConfirm = (fileName: string) => {
        addFile(fileName);
        setIsAddFileOpen(false);
    };


    return <div style={{ width: '15vw', height: '90vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3% 0 5% 0' }}>
            <h2 style={{ margin: '0 0 0 5%', fontSize: '16px', fontWeight: 600 }}>Files</h2>
            <button onClick={() => setIsAddFileOpen(true)} style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#e5e7eb',
                color: '#374151',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease, transform 0.1s ease',
                margin: '0 5% 0 0'
            }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d1d5db')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                title="Add File"
            >
                +
            </button>
        </div>
        {fileList.map((file) => (
            <FileItemComponent key={file.id} file={file} setSelectedFileId={setSelectedFileId} isSelected={file.id === selectedFileId} />
        ))}
        <AskFilename
            isOpen={isAddFileOpen}
            onConfirm={handleAddFileConfirm}
            onCancel={() => setIsAddFileOpen(false)}
        />
    </div>
}


