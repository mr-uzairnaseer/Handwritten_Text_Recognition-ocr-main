import React from 'react';
import { FileText, Cpu } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-slate-200/60 supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 group cursor-default">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 ease-out">
                        <FileText size={24} className="stroke-[2.5px]" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            HTR Master
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider uppercase border border-blue-100">Pro</span>
                        </h1>
                        <p className="text-xs text-slate-500 font-medium tracking-wide">AI-POWERED RECOGNITION</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                        <Cpu size={14} className="text-blue-500" />
                        <span>Tesseract.js Engine</span>
                    </div>
                    <a href="#" className="hidden sm:block text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors">Documentation</a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors">GitHub</a>
                </div>
            </div>
        </header>
    );
}
