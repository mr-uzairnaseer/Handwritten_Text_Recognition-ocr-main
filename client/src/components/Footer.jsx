import React from 'react';

export default function Footer() {
    return (
        <footer className="max-w-6xl mx-auto px-8 py-10 text-center text-slate-400 text-sm border-t border-slate-100 mt-10">
            <p>Built with React, Node.js and Tesseract OCR &copy; {new Date().getFullYear()}</p>
        </footer>
    );
}
