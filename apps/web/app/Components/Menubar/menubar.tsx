'use client';

export default function Menubar() {

    return (
        <div
            style={{
                width: '100vw',
                height: '7vh',
                backgroundColor: '#111827',
                borderBottom: '1px solid #1f2937',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
            }}
        >
            <span
                style={{
                    color: '#f9fafb',
                    fontWeight: 600,
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                }}
            >
                Code Editor
            </span>
        </div>
    );
}