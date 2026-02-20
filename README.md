📚 StudyAI – AI-Powered PDF Study Assistant (RAG-Based)

StudyAI is a full-stack AI-powered study assistant that transforms uploaded PDFs into an intelligent, searchable knowledge base using Retrieval-Augmented Generation (RAG).

It enables users to:
- Upload academic PDFs
- Ask contextual questions
- Generate structured study notes
- Retrieve answers with source citations
- Perform metadata-aware document filtering
- Built to demonstrate strong backend architecture, AI integration, and production-ready system design.

-Folder Structure (backend)
Server/
│
├── controller/
│   ├── Upload.controller.js
│   ├── Chat.controller.js
│   ├── users.controller.js
│   ├── Notes.controller.js
│   
├── middleware
│   ├── auth.middeware.js
│   
├── Services/
│   ├── pdfProcessor.js
│   ├── chunkService.js
│   ├── embeddingService.js
│   ├── ragService.js
│   ├── notesService.js
│
├── utils
│   ├── db.js
│   ├── multer.js
│   
├── model/
│   ├── user.model.js
│   ├── document.model.js
│
├── Routes/
│   ├── chat.Routes.js
│   ├── notes.Routes.js
│   ├── uploads.Routes.js
│   ├── users.Routes.js
│
└── index.js
