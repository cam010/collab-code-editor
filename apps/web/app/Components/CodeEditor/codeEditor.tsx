'use client';

import type { FileItem, Language } from '@/app/types/codeEditor';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

interface CodeEditorProps {
  file: FileItem;
  onCodeChange: Function
}

export default function Editor({ file, onCodeChange }: CodeEditorProps) {
  // const [code, setCode] = useState<string>(file.content);

  return (
    <div style={{ height: '90vh', width: '85vw' }}>
      <MonacoEditor
        height="100%"
        language={file.language}
        value={file.content}
        onChange={(value) => onCodeChange(value ?? '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
        }}
      />
    </div>
  );
}