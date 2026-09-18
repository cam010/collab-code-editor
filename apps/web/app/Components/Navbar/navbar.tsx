'use client';

import type { Language } from "@/app/types/codeEditor";

interface NavbarProps {
    language: Language;
    setLanguage: (language: Language) => void;
};

function LanguageSelector({ language, setLanguage }: NavbarProps) {
    return (
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <select
                style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    color: '#f9fafb',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '4px 20px 4px 0',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    cursor: 'pointer',
                    outline: 'none',
                }}
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
            >
                <option value="python" style={{ color: '#1f2937' }}>Python</option>
                <option value="javascript" style={{ color: '#1f2937' }}>JavaScript</option>
                <option value="typescript" style={{ color: '#1f2937' }}>TypeScript</option>
                <option value="java" style={{ color: '#1f2937' }}>Java</option>
                <option value="cpp" style={{ color: '#1f2937' }}>C++</option>
                <option value="text" style={{ color: '#1f2937' }}>Text</option>
            </select>
            <span
                style={{
                    position: 'absolute',
                    right: 0,
                    pointerEvents: 'none',
                    color: '#9ca3af',
                    fontSize: '10px',
                }}
            >
                ▾
            </span>
        </div>
    );
}
    
export default function Navbar({ language, setLanguage }: NavbarProps) {
    return (
        <div
            style={{
                width: '100vw',
                height: '3vh',
                backgroundColor: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '0 20px',
                boxSizing: 'border-box',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}
        >
            <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
    );
}