'use client';

import type { FileItem } from "@/app/types/codeEditor";

interface FileItemComponentProps {
    file: FileItem
    setSelectedFileId: Function
    isSelected: boolean
}

export default function FileItemComponent({ file, setSelectedFileId, isSelected }: FileItemComponentProps) {
    return (
        <button
            style={{ width: '90%', margin: '0% 5%' }}
            onClick={() => setSelectedFileId(file.id)}
            key={file.id}
            className={`group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${isSelected ? "bg-gray-700" : "hover:bg-neutral-800/60"} text-sm text-neutral-300 hover:text-white transition-colors `}
        >
            {/* Maybe get rid of this later */}
            <span className="shrink-0 text-xs font-mono text-neutral-500 group-hover:text-neutral-300">
                {file.language === "typescript"
                    ? "TS"
                    : file.language === "javascript"
                        ? "JS"
                        : file.language === "cpp"
                            ? "C++"
                            : file.language === "java"
                                ? "Java"
                                : file.language === "python"
                                    ? "Py"
                                    : file.language === "text"
                                        ? "txt"
                                        : "•"}
            </span>
            <span className="truncate">{file.name}</span>
        </button>
    );
}