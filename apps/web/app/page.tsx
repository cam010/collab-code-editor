'use client';

import Editor from './Components/CodeEditor/codeEditor';
import Navbar from './Components/Navbar/navbar';
import Menubar from './Components/Menubar/menubar';
import { useState } from 'react';
import type { FileItem, Language } from './types/codeEditor';
import FileExplorer from './Components/FileExplorer/fileExplorer';


export default function Page() {

  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'main.py',
      language: 'python',
      content: '# Start coding...',
    },
    {
      id: '2',
      name: 'main.js',
      language: 'javascript',
      content: '// Start coding...',
    },
  ]);

  const updateFileContent = (content: string) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === selectedFileId
          ? { ...file, content }
          : file
      )
    );
  };

  const addFile = (name: string) => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name,
      language: "text",
      content: ``,
    };
    setFiles((prevFiles) => [...prevFiles, newFile]);
    setSelectedFileId(newFile.id);
  };

  const [selectedFileId, setSelectedFileId] = useState('1');
  const selectedFile = files.find(
    (file) => file.id === selectedFileId
  )

  const setLanguage = (language: Language) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === selectedFileId
          ? { ...file, language }
          : file
      )
    );
  }


  return (
    <>
      <Menubar />
      <Navbar
        language={selectedFile!.language}
        setLanguage={setLanguage} />
      <div style={{ display: 'flex' }}>
        <FileExplorer fileList={files} setSelectedFileId={setSelectedFileId} selectedFileId={selectedFileId} addFile={addFile} />
        <Editor
          file={selectedFile!}
          onCodeChange={updateFileContent} />
      </div>
    </>
  );
}