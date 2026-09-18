import { useState } from 'react';

interface AskFilenameProps {
    isOpen: boolean;
    onConfirm: (fileName: string) => void;
    onCancel: () => void;
}

export function AskFilename({ isOpen, onConfirm, onCancel }: AskFilenameProps) {
    const [fileName, setFileName] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!fileName.trim()) return;
        onConfirm(fileName.trim());
        setFileName('');
    };

    const handleCancel = () => {
        setFileName('');
        onCancel();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={handleCancel}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#1f2937',
                    borderRadius: '12px',
                    padding: '24px',
                    width: '320px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    border: '1px solid #374151',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#f9fafb' }}>
                        New File
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                        Enter a name for your new file.
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="e.g. utils.js"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                    style={{
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #4b5563',
                        borderRadius: '8px',
                        outline: 'none',
                        backgroundColor: '#111827',
                        color: '#f9fafb',
                    }}
                    onFocus={(e) => (e.currentTarget.style.border = '1px solid #6366f1')}
                    onBlur={(e) => (e.currentTarget.style.border = '1px solid #4b5563')}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                        onClick={handleCancel}
                        style={{
                            padding: '8px 14px',
                            fontSize: '13px',
                            fontWeight: 500,
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: '#374151',
                            color: '#e5e7eb',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!fileName.trim()}
                        style={{
                            padding: '8px 14px',
                            fontSize: '13px',
                            fontWeight: 500,
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: fileName.trim() ? '#6366f1' : '#374151',
                            color: fileName.trim() ? '#fff' : '#6b7280',
                            cursor: fileName.trim() ? 'pointer' : 'not-allowed',
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}