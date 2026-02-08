import React, { useRef } from 'react';
import { Upload, ImageIcon, Loader2, AlertCircle, ScanLine, ImagePlus } from 'lucide-react';

export default function UploadZone({ file, preview, loading, error, onFileChange, onUpload }) {
    const inputRef = useRef(null);

    const triggerFileSelect = () => inputRef.current?.click();

    return (
        <section className="space-y-6 h-full flex flex-col">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <Upload size={120} />
                </div>

                <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800 relative z-10">
                    <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                        <ImagePlus size={22} />
                    </div>
                    Upload Source Image
                </h2>

                <div className="flex-grow flex flex-col">
                    <div
                        onClick={triggerFileSelect}
                        className={`
                            relative flex-grow min-h-[300px] border-3 border-dashed rounded-2xl transition-all duration-300 ease-out cursor-pointer flex flex-col items-center justify-center p-8 group/drop
                            ${preview
                                ? 'border-blue-200 bg-blue-50/30'
                                : 'border-slate-300/80 hover:border-blue-400 hover:bg-slate-50/50 hover:shadow-lg hover:shadow-blue-500/5'}
                        `}
                    >
                        {preview ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-[400px] w-auto max-w-full rounded-lg shadow-sm object-contain relative z-10"
                                />
                                {loading && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-lg">
                                        <div className="flex flex-col items-center gap-3 animate-pulse">
                                            <ScanLine size={48} className="text-blue-600 animate-bounce" />
                                            <span className="font-bold text-blue-700 tracking-wide text-sm uppercase">Scanning Document...</span>
                                        </div>
                                    </div>
                                )}
                                <div className={`absolute inset-0 bg-black/50 opacity-0 group-hover/drop:opacity-100 transition-opacity rounded-lg flex items-center justify-center z-10 ${loading ? 'hidden' : ''}`}>
                                    <span className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-semibold text-sm shadow-xl transform scale-95 group-hover/drop:scale-100 transition-transform">
                                        Change Image
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-4 pointer-events-none">
                                <div className="bg-white p-6 rounded-full shadow-lg shadow-blue-100 inline-flex mb-2 group-hover/drop:scale-110 transition-transform duration-300 ring-4 ring-blue-50">
                                    <ImageIcon size={48} className="text-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-semibold text-slate-700">
                                        Click to upload or drag & drop
                                    </p>
                                    <p className="text-sm text-slate-400 font-medium">
                                        Supports PNG, JPG, JPEG (Max 10MB)
                                    </p>
                                </div>
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            onChange={onFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <button
                        onClick={onUpload}
                        disabled={loading || !file}
                        className={`
                            relative w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden
                            ${loading || !file
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0.5'}
                        `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <ScanLine size={20} />
                                <span>Extract Text</span>
                            </>
                        )}
                    </button>

                    {error && (
                        <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
