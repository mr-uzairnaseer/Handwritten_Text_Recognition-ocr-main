# HTR Workspace (v2.2.0)

> **Client-Side Handwritten Text Recognition** powered by WebAssembly.

A modern, privacy-focused workspace for recognizing handwritten text directly in your browser. No server required.

![Project Preview](./Screenshot%20.png)

## ✨ Features

-   **Client-Side OCR**: Uses [Tesseract.js](https://tesseract.projectnaptha.com/) (WASM) to process images locally. Your data never leaves your device.
-   **Interactive Workspace**:
    -   **Image Viewer**: Zoom, Pan, and Drag & Drop support.
    -   **Text Editor**: Syntax-highlighted editor with line numbers.
-   **History**: Automatically saves recent scans to your browser's local storage.
-   **Export**: Convert recognized text to PDF instantly using [jsPDF](https://github.com/parallax/jsPDF).
-   **Dark Mode**: "Midnight Professional" theme designed for long coding sessions.

## 🛠️ Tech Stack

-   **Frontend**: React 18, Vite
-   **Styling**: Tailwind CSS
-   **OCR Engine**: Tesseract.js (v5)
-   **PDF Generation**: jsPDF
-   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+ installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/htr-workspace.git
    cd htr-workspace
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Deployment (Vercel)

This project is a **Static Single Page Application (SPA)**. It requires no backend server.

1.  Push your code to GitHub/GitLab/Bitbucket.
2.  Import the project into **Vercel**.
3.  **Framework Preset**: Vite (should be detected automatically).
4.  **Root Directory**: `./` (default).
5.  Click **Deploy**.

## 🔒 Privacy Note

This application processes all images **locally** using WebAssembly. No images are uploaded to any external server during OCR processing.

## 📄 License

MIT License.
