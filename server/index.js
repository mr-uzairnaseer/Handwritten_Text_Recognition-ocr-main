const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const tesseract = require("tesseract.js");
const PDFDocument = require('pdfkit');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Tesseract.js configuration is handled in the recognize call

// Health check / Root route
app.get('/', (req, res) => {
  res.json({
    status: "ok",
    message: "HTR Server is running",
    timestamp: new Date().toISOString()
  });
});

app.post('/api/ocr', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  console.log(`Processing file: ${req.file.path}`);

  try {
    const { data: { text } } = await tesseract.recognize(req.file.path, 'eng', { logger: m => console.log(m) });
    console.log("Recognition successful");
    res.json({ text: text.trim() });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({
      error: "Error processing image.",
      details: error.message,
      suggestion: "Please try again."
    });
  } finally {
    // Optionally delete the file after processing
    // fs.unlinkSync(req.file.path);
  }
});

app.post('/api/export-pdf', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('No text provided.');
  }

  const doc = new PDFDocument();
  let filename = 'converted-' + Date.now() + '.pdf';

  // Setting response to download the file
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);
  doc.fontSize(12).text(text, 100, 100);
  doc.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("Tesseract.js ready for OCR.");
});
