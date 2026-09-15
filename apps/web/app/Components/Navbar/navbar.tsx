'use client';

import type { Language } from "@/app/types/codeEditor";

interface NavbarProps {
    language: Language;
    setLanguage: (language: Language) => void;
};

function LanguageSelector({ language, setLanguage }: NavbarProps) {
    return (<select
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
    >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
    </select>);
}

export default function Navbar({ language, setLanguage }: NavbarProps) {

    return (
        <div style={{ width: '100vw', backgroundColor: 'green', height: '5vh' }}>
            <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>);

}