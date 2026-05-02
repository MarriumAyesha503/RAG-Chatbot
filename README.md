## 🚀 Overview

This project implements a Retrieval-Augmented Generation (RAG) pipeline, enabling an AI model to generate accurate, context-aware responses using your own data rather than relying solely on pre-trained knowledge.

The system works by:

Loading and processing documents (e.g., PDFs)  
Splitting content into manageable chunks  
Generating vector embeddings  
Storing embeddings in a vector database  
Retrieving relevant context at query time  
Passing retrieved data to a language model for precise answers  

## ▶️ Running the Project

npm run dev

## 🛠️ Tech Stack

- Node.js – Backend runtime
- TypeScript – Strongly typed development
- Express.js – API framework
- LangChain – RAG orchestration
- OpenAI API – LLM and embeddings
- Qdrant – Vector database

## 💬 API Usage

### Upload Documents

POST /upload

Request Body:
Content-Type: multipart/form-data  
Fields:  
file (File) – Document to upload  
collectionName (Text, optional) – Target collection  

Response:  
{  
  "message": "PDFs uploaded successfully",  
  "count": 1  
}  

### Ask Questions

POST /ask

Request Body:  
{  
  "question": "What is RAG?"  
}  

Response:  
{  
  "answer": "..."  
}  