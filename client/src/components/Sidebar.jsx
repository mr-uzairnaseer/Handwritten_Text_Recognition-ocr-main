import React from 'react';
import { Clock, Trash2, ChevronRight, Settings, Search } from 'lucide-react';

export default function Sidebar({ activeTab, history, onLoadHistory, onClearHistory, isOpen }) {
    if (!isOpen) return null;

    return (
        <div className="flex h-screen z-20 shrink-0">
            {/* Side Drawer (Content) */}
            <div className="w-64 bg-[#111113] border-r border-zinc-800 h-full flex flex-col transition-all">
                <div className="p-4 border-b border-zinc-800">
                    <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        {activeTab === 'files' && <><Clock size={14} /> Recent Files</>}
                        {activeTab === 'search' && <><Search size={14} /> Search</>}
                        {activeTab === 'settings' && <><Settings size={14} /> Settings</>}
                    </h2>
                </div>

                <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {activeTab === 'files' && (
                        <div className="flex flex-col">
                            {history.length === 0 ? (
                                <div className="p-8 text-center text-zinc-600 text-xs italic">
                                    No recent scans.
                                </div>
                            ) : (
                                history.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => onLoadHistory(item)}
                                        className="p-3 border-b border-zinc-800/50 hover:bg-zinc-800/50 cursor-pointer group transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.preview ? (
                                                <img src={item.preview} className="w-8 h-8 rounded object-cover" alt="thumb" />
                                            ) : (
                                                <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-600 text-[10px]">TXT</div>
                                            )}
                                            <div className="overflow-hidden">
                                                <h3 className="text-sm font-medium text-zinc-300 truncate w-32 group-hover:text-white transition-colors">
                                                    {item.text.substring(0, 15) || "Untitled"}...
                                                </h3>
                                                <p className="text-[10px] text-zinc-600">
                                                    {new Date(item.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <ChevronRight size={14} className="ml-auto text-zinc-700 group-hover:text-zinc-500 opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'search' && (
                        <div className="p-4 text-xs text-zinc-600">Search functionality planned for future update.</div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="p-4 space-y-4">
                            <div className="text-xs text-zinc-400">Appearance</div>
                            <div className="flex items-center gap-2 text-sm text-zinc-300">
                                <input type="checkbox" checked readOnly className="accent-blue-500" /> Dark Mode
                            </div>
                        </div>
                    )}
                </div>

                {activeTab === 'files' && history.length > 0 && (
                    <div className="p-3 border-t border-zinc-800 mt-auto">
                        <button
                            onClick={onClearHistory}
                            className="flex items-center justify-center gap-2 w-full py-2 rounded bg-red-900/10 hover:bg-red-900/20 text-red-500 text-xs font-medium transition-colors"
                        >
                            <Trash2 size={12} /> Clear History
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
