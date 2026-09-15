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

  const [selectedFileId, setSelectedFileId] = useState('1');

  const [language, setLanguage] = useState<Language>("python");

  return (
    <>
      <Menubar />
      <Navbar
        language={language}
        setLanguage={setLanguage} />
      <div style={{ display: 'flex' }}>
        <FileExplorer fileList={files} setSelectedFileId={setSelectedFileId} />
        <Editor
          file={files.find(f => f.id === selectedFileId)!} 
          onCodeChange={updateFileContent}/>
      </div>
    </>
  );
}