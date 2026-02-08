import React from 'react';
import { FileText, Download, Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function ResultDisplay({ result, onExport }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="space-y-6 h-full flex flex-col">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 h-full flex flex-col relative overflow-hidden">
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
                        <div className="p-2 bg-indigo-100/50 rounded-lg text-indigo-600">
                            <Terminal size={22} />
                        </div>
                        Extracted Content
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            disabled={!result}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                                ${!result
                                    ? 'text-slate-300 cursor-not-allowed'
                                    : copied
                                        ? 'bg-green-50 text-green-600 border border-green-200'
                                        : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100'}
                            `}
                            title="Copy to clipboard"
                        >
                            {copied ? (
                                <>
                                    <Check size={16} />
                                    <span>Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={16} />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={onExport}
                            disabled={!result}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                                ${!result
                                    ? 'text-slate-300 cursor-not-allowed'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 active:translate-y-0.5'}
                            `}
                        >
                            <Download size={16} />
                            Save PDF
                        </button>
                    </div>
                </div>

                <div className="flex-grow relative group/editor">
                    <div className={`
                        absolute inset-0 bg-slate-50 rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-300
                        ${result ? 'shadow-inner' : 'flex items-center justify-center'}
                    `}>
                        {result ? (
                            <div className="h-full overflow-auto p-6 custom-scrollbar">
                                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700 selection:bg-indigo-100 selection:text-indigo-900 outline-none">
                                    {result}
                                </pre>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <div className="bg-slate-100 p-4 rounded-full mb-4">
                                    <FileText size={32} className="text-slate-300" />
                                </div>
                                <p className="font-medium text-slate-500">No content available</p>
                                <p className="text-sm mt-1 opacity-60 max-w-[200px]">
                                    Upload an image to see the extracted text appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-xs text-slate-400 font-medium px-1">
                    <span>{result ? `${result.length} characters` : 'Ready to process'}</span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        System Online
                    </span>
                </div>
            </div>
        </section>
    );
}
