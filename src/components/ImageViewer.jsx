import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, Image as ImageIcon } from 'lucide-react';

export default function ImageViewer({ preview, onUploadClick }) {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
    const handleReset = () => setZoom(1);

    return (
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950/50 transition-colors duration-300">
            {/* Toolbar */}
            <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-between px-4 transition-colors duration-300">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={14} /> Source Image
                </span>
                <div className="flex items-center gap-1">
                    <ToolbarButton icon={<ZoomOut size={14} />} onClick={handleZoomOut} title="Zoom Out" />
                    <span className="text-xs w-12 text-center text-zinc-500 font-mono">{(zoom * 100).toFixed(0)}%</span>
                    <ToolbarButton icon={<ZoomIn size={14} />} onClick={handleZoomIn} title="Zoom In" />
                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-800 mx-2" />
                    <ToolbarButton icon={<Maximize size={14} />} onClick={handleReset} title="Reset View" />
                </div>
            </div>

            {/* Viewport */}
            <div className="flex-grow overflow-hidden relative flex items-center justify-center bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] transition-all duration-300">
                {preview ? (
                    <div
                        className="transition-transform duration-200 ease-out origin-center p-8"
                        style={{ transform: `scale(${zoom})` }}
                    >
                        <img
                            src={preview}
                            alt="Source"
                            className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm ring-1 ring-zinc-200 dark:ring-white/10"
                        />
                    </div>
                ) : (
                    <div
                        onClick={onUploadClick}
                        className="group flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 rounded-xl bg-zinc-100 dark:bg-zinc-900/20 hover:bg-zinc-200 dark:hover:bg-zinc-900/50 transition-all cursor-pointer select-none"
                    >
                        <div className="w-20 h-20 rounded-full bg-white dark:bg-zinc-900 group-hover:bg-blue-600/10 flex items-center justify-center ring-1 ring-zinc-200 dark:ring-zinc-800 group-hover:ring-blue-500/50 mb-6 transition-all shadow-lg group-hover:shadow-blue-900/20">
                            <ImageIcon size={40} className="text-zinc-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors mb-2">
                            Upload Image
                        </h3>
                        <p className="text-sm text-zinc-500 text-center max-w-[200px] leading-relaxed group-hover:text-zinc-400">
                            Drag & drop or <span className="text-blue-400 group-hover:underline">click to browse</span>
                        </p>
                        <div className="mt-8 flex gap-3 text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
                            <span>PNG</span>
                            <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-800" />
                            <span>JPG</span>
                            <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-800" />
                            <span>WEBP</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ToolbarButton({ icon, onClick, title }) {
    return (
        <button
            onClick={onClick}
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            title={title}
        >
            {icon}
        </button>
    );
}
