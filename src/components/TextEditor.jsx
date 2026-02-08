import React, { useState } from 'react';
import { Copy, Download, Check, Terminal, FileCode, SplitSquareHorizontal } from 'lucide-react';

export default function TextEditor({ content, rawData, onExport }) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('text'); // 'text' | 'json'

    const handleCopy = () => {
        const textToCopy = activeTab === 'text' ? content : JSON.stringify(rawData, null, 2);
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Determine content to show based on tab
    const displayContent = activeTab === 'text' ? content : (rawData ? JSON.stringify(rawData, null, 2) : '');

    // Generate line numbers
    const lines = displayContent ? displayContent.split('\n') : [''];
    const lineCount = Math.max(lines.length, 15);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] transition-colors duration-300">
            {/* Toolbar */}
            <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-between px-4 transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <Tab
                        active={activeTab === 'text'}
                        label="result.txt"
                        icon={<FileCode size={14} className="text-blue-400" />}
                        onClick={() => setActiveTab('text')}
                    />
                    <Tab
                        active={activeTab === 'json'}
                        label="raw_output.json"
                        icon={<Terminal size={14} className="text-yellow-400" />}
                        onClick={() => setActiveTab('json')}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        disabled={!displayContent}
                        className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                        onClick={onExport}
                        disabled={!content}
                        className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={14} />
                        <span>Export PDF</span>
                    </button>
                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-800 mx-1" />
                    <button className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                        <SplitSquareHorizontal size={14} />
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-grow overflow-hidden relative flex font-mono text-sm leading-6">
                {/* Line Numbers */}
                <div className="w-12 flex-shrink-0 bg-zinc-50 dark:bg-[#1e1e1e] border-r border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 text-right pr-3 pt-4 select-none transition-colors duration-300">
                    {Array.from({ length: lineCount }).map((_, i) => (
                        <div key={i} className="h-6">{i + 1}</div>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-grow overflow-auto pt-4 pl-4 text-zinc-800 dark:text-zinc-300 transition-colors duration-300">
                    {displayContent ? (
                        <pre className="outline-none min-h-full whitespace-pre-wrap">{displayContent}</pre>
                    ) : (
                        <div className="text-zinc-600 italic h-full flex items-center justify-center pb-20 select-none">
                            {'// Waiting for input...'}
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-blue-600 flex items-center justify-between px-3 text-[10px] text-white font-medium select-none">
                <div className="flex items-center gap-4">
                    <span>REMOTE</span>
                    <span>master*</span>
                    <span className="flex items-center gap-1"><Check size={10} /> Ready</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Ln {lines.length}, Col 1</span>
                    <span>UTF-8</span>
                    <span>PlainText</span>
                    <span>Prettier</span>
                </div>
            </div>
        </div>
    );
}

function Tab({ icon, label, active, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
            flex items-center gap-2 h-10 px-4 border-r border-zinc-200 dark:border-zinc-800 cursor-pointer select-none transition-colors
            ${active ? 'bg-white dark:bg-[#1e1e1e] text-zinc-900 dark:text-zinc-200 border-t-2 border-t-blue-500' : 'bg-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-700 dark:hover:text-zinc-300'}
        `}>
            {icon}
            <span className="text-xs font-medium">{label}</span>
            {active && <span className="ml-2 w-2 h-2 rounded-full bg-zinc-400/50 dark:bg-zinc-600/50 hover:bg-zinc-400 dark:hover:bg-zinc-500"></span>}
        </div>
    );
}
