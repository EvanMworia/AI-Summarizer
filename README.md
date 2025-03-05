# Document Summarization Service - CitizenConnect360

## Overview
This project enables AI-powered document summarization within **CitizenConnect360**. Users can upload **DOCX** or **PDF** files, and the system extracts text before generating a summary using **OpenAI's GPT-3.5-Turbo** model.

## Tech Stack & Dependencies
- **Node.js & Express** - Backend framework
- **Multer** - Handles file uploads
- **Mammoth** - Extracts text from DOCX files
- **pdf-parse** - Extracts text from PDFs
- **OpenAI API (GPT-3.5-Turbo)** - Generates summaries
- **dotenv** - Manages environment variables
- **cors & helmet** - Security enhancements

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/document-summarization.git
   cd document-summarization
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file to store environment variables:
   ```sh
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

4. Run the application:
   ```sh
   npm start
   ```

## Workflow - From Upload to Summary
1. **User uploads a document (DOCX or PDF).**
2. **Multer** stores the file temporarily.
3. **Mammoth** (for DOCX) or **pdf-parse** (for PDFs) extracts text.
4. The extracted text is sent to **OpenAI's GPT-3.5-Turbo**.
5. OpenAI processes the text and returns a concise summary.
6. The summary is sent back as a response.

## API Endpoints
### Upload Document & Get Summary
**Endpoint:**
```http
POST /summarize
```
**Request (Multipart Form-Data):**
- `file` (DOCX or PDF)

**Response (JSON):**
```json
{
  "summary": "This document covers the key aspects of ..."
}
```

## Security Best Practices
- **Store API keys securely** using `.env`
- **Validate file types** before processing
- **Limit file size** in Multer to prevent abuse
- **Implement CORS & Helmet** for security

## Error Handling
- Invalid file formats return a `400 Bad Request` error.
- Missing files return a `400 Bad Request` error.
- OpenAI API failures return a `500 Internal Server Error`.

## Future Enhancements
- Support for additional document formats (TXT, RTF)
- Multi-language support
- Caching summaries for efficiency

## License
MIT License.

---

This README provides a detailed reference for hosting on GitHub and future improvements. 🚀

