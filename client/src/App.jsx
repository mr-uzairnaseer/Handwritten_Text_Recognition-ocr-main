
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ImageViewer from './components/ImageViewer';
import TextEditor from './components/TextEditor';
import { Upload, Play, Loader2, PanelLeftClose } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [rawData, setRawData] = useState(null); // Store full JSON response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sidebar & History State
  const [activeSidebar, setActiveSidebar] = useState('files'); // 'files' | 'search' | 'settings'
  const [history, setHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const fileInputRef = useRef(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('htr_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { console.error("History parse error", e); }
    }
  }, []);

  // Save history on update
  useEffect(() => {
    localStorage.setItem('htr_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (text, raw) => {
    const newItem = {
      id: Date.now(),
      text,
      raw,
      timestamp: new Date().toISOString(),
      preview: preview // Note: Storing base64 strings in localStorage can be heavy. Ideally use IndexedDB.
    };
    setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep last 10
  };

  const loadHistoryItem = (item) => {
    setResult(item.text);
    setRawData(item.raw);
    if (item.preview) setPreview(item.preview);
    // If preview is a blob URL from previous session it won't work, so we rely on base64 or re-upload if needed.
    // For this demo, assuming user just scanned or we accept preview might be broken on reload if not base64.
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('htr_history');
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      setResult('');
      setRawData(null);
      setError('');

      // Convert to base64 for history persistence (small files only recommended)
      const reader = new FileReader();
      reader.onloadend = () => {
        // This updates the preview to base64 so it persists
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      fileInputRef.current?.click();
      return;
    }

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5001/api/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const text = response.data.text;
      setResult(text);
      setRawData(response.data); // Assuming server returns more data, or we just store the whole object
      addToHistory(text, response.data);
    } catch (err) {
      console.error(err);
      setError('Processing failed. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!result) return;
    try {
      const response = await axios.post('http://localhost:5001/api/export-pdf',
        { text: result },
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ocr - result - ${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-200 overflow-hidden font-sans">
      <Sidebar
        activeTab={activeSidebar}
        onTabChange={setActiveSidebar}
        history={history}
        onLoadHistory={loadHistoryItem}
        onClearHistory={clearHistory}
        isOpen={showSidebar}
      />

      <div className="flex flex-col flex-grow h-full overflow-hidden transition-all duration-300">
        {/* Command Bar */}
        <header className="h-14 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSidebar(!showSidebar)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <PanelLeftClose size={20} className={`transform transition - transform ${!showSidebar ? 'rotate-180' : ''} `} />
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <h1 className="text-sm font-medium tracking-wide text-zinc-100">HTR WORKSPACE <span className="text-zinc-500 ml-2">v2.1.0</span></h1>
          </div>

          <div className="flex items-center gap-3">
            {loading && <span className="text-xs text-blue-400 animate-pulse flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Processing...</span>}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition-colors border border-zinc-700"
            >
              <Upload size={14} />
              <span>Import Image</span>
            </button>

            <button
              onClick={handleUpload}
              disabled={loading || (!file && !result)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide transition-all shadow-[0_0_10px_rgba(37,99,235,0.2)] disabled:opacity-50 disabled:shadow-none"
            >
              <Play size={14} fill="currentColor" />
              <span>RUN OCR</span>
            </button>
          </div>
        </header>

        {/* Workspace Split View */}
        <main className="flex-grow flex overflow-hidden relative">
          {/* Left: Image Viewer */}
          <div className="flex-1 border-r border-zinc-800 relative min-w-[300px] flex flex-col bg-zinc-900/30">
            <ImageViewer
              preview={preview}
              onUploadClick={() => fileInputRef.current?.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {/* Right: Text Editor */}
          <div className="flex-1 min-w-[300px] flex flex-col bg-[#1e1e1e]">
            <TextEditor content={result} rawData={rawData} onExport={exportPDF} />
          </div>
        </main>

        {/* Footer Status Bar */}
        <footer className="h-6 bg-blue-600/10 border-t border-blue-900/30 flex items-center justify-between px-4 text-[10px] text-zinc-400 select-none shrink-0">
          <div className="flex items-center gap-4">
            <span>MEM: {history.length} items</span>
            <span>ENG: Tesseract.js (WASM)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={error ? "text-red-400 font-bold" : "text-zinc-500"}>{error || "System Standard"}</span>
            <span>UTF-8</span>
            <span>{activeSidebar.toUpperCase()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
