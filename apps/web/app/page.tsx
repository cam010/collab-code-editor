'use client';

import Editor from './Components/CodeEditor/codeEditor';
import Navbar from './Components/Navbar/navbar';
import Menubar from './Components/Menubar/menubar';
import { useEffect, useState } from 'react';
import type { FileItem, Language } from './types/codeEditor';
import FileExplorer from './Components/FileExplorer/fileExplorer';
import { getWorkspaceFiles, createFile, updateFile } from './lib/fileApi';

// DEV TESTING ONLY
const workspaceId = process.env.NEXT_PUBLIC_DEV_WORKSPACE_ID


export default function Page() {

  const [files, setFiles] = useState<FileItem[]>([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const selectedFile = files.find(
    (file) => file.id === selectedFileId
  )

  // Load workspace files from server on refresh
  useEffect(() => {
    const loadFiles = async () => {
      if (!workspaceId) {
        console.error('Missing workspace ID');
        return;
      }
      try {
        const persistedFiles = await getWorkspaceFiles(workspaceId);

        setFiles(persistedFiles);

        if (persistedFiles.length > 0) {
          setSelectedFileId(persistedFiles[0].id);
        }
      } catch (error) {
        console.error('Failed to load files:', error);
      }
    };

    loadFiles();

  }, [])


  // Send content update to server 750ms after selected file change / file content change
  useEffect(() => {
    if (!workspaceId || !selectedFileId || !selectedFile) {
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        await updateFile(
          workspaceId,
          selectedFileId,
          undefined,
          selectedFile.content
        );
      } catch (error) {
        console.error('Failed to save file content:', error);
      }
    }, 750);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedFile?.content, selectedFileId]);

  const updateFileContent = (content: string) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === selectedFileId
          ? { ...file, content }
          : file
      )
    );
  };

  const addFile = async (name: string) => {
    if (!workspaceId) {
      console.error('Missing workspace ID');
      return;
    }
    try {
      const newFile = await createFile(workspaceId, name);

      setFiles((prevFiles) => [...prevFiles, newFile]);
      setSelectedFileId(newFile.id);
    } catch (error) {
      console.error('Failed to create file:', error);
    }
  };

  const setLanguage = async (language: Language) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === selectedFileId
          ? { ...file, language }
          : file
      )
    );
    if (!workspaceId) {
      console.error('Missing workspace ID');
      return;
    }
    if (!selectedFileId) {
      console.error('Missing file ID');
      return;
    }
    try {
      await updateFile(workspaceId, selectedFileId, language = language)
    } catch (error) {
      console.error('Failed to update language:', error);
    }

  }


  return (
    <>
      <Menubar />

      {selectedFile && (
        <Navbar
          language={selectedFile.language}
          setLanguage={setLanguage}
        />
      )}

      <div style={{ display: 'flex' }}>
        <FileExplorer
          fileList={files}
          setSelectedFileId={setSelectedFileId}
          selectedFileId={selectedFileId}
          addFile={addFile}
        />

        {selectedFile && (
          <Editor
            file={selectedFile}
            onCodeChange={updateFileContent}
          />
        )}
      </div>
    </>
  );
}