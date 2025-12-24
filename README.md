# 🧠 AI Text Summarizer

## 📌 Overview
AI Text Summarizer is a full-stack web application that generates concise summaries from long-form content.  
It supports **plain text**, **PDF documents**, and **YouTube videos** (via transcripts).

---
## 🎥 Video Demo
📹 **Demo Video:**  
<video src="https://github.com/user-attachments/assets/8ba6767c-ad79-44fa-ad1a-c7e999687023"> </video>

---

## 🧩 Abstraction Model

The application is divided into clear layers:

### Frontend (Client)
- User input handling (Text / PDF / YouTube)
- UI state management (modes, loading, errors)
- Theme handling (Light / Dark mode)
- API communication with backend

### Backend (Server)
- REST API endpoints for summarization
- Input validation and preprocessing
- PDF text extraction
- YouTube transcript handling
- LLM-based summarization logic
- Structured error responses

This separation ensures scalability, maintainability, and clarity.

---

## 🛠️ Technologies Used (Tech Stack)

### Frontend
- HTML, CSS, JavaScript
- React
- Axios

### Backend
- Python
- Flask
- REST APIs

### AI / NLP
- LLM-based summarization backend

### Tooling & Environment
- Git & GitHub
- Node.js (npm)
- VS Code
- Python Virtual Environments

---

## ✨ Features

### 🔤 Text Summarization
- Paste long-form text and receive a concise summary

### 📄 PDF Summarization
- Upload PDF documents
- Automatic text extraction and summarization

### 📺 YouTube Summarization
- Accepts YouTube URLs
- Extracts transcripts (when available)
- Summarizes video content into readable text

### 🌗 Light / Dark Mode
- Fully styled dark mode
- Theme toggle with consistent UI behavior

### ⏳ Loading & Feedback
- Visible loading indicator
- Artificial delay for UX clarity
- Error toasts for failed requests

### 🎨 Modern UI
- Gradient-based design
- Clean card layout
- Responsive and readable typography

---

## 🏗️ How I Built It

1️⃣ **Frontend**
- Built a clean UI with multiple input modes
- Added loading states, error handling, and theme support

2️⃣ **Backend API Design**
- Created separate endpoints for:
  - Text summarization
  - PDF summarization
  - YouTube summarization
- Ensured consistent request/response formats

3️⃣ **Integration**
- Connected frontend to backend using Axios
- Handled edge cases (empty input, invalid files, missing transcripts)

4️⃣ **Iteration & Refinement**
- Improved UI readability
- Fixed state and async bugs
- Refined dark mode and loading behavior

---

## 📚 What I Learned

### 🧠 Full-Stack Thinking
- How frontend and backend communicate
- Why clean abstractions matter early

### 🔧 API Design
- Structuring REST endpoints properly
- Graceful error handling

### 🎨 UI/UX
- Importance of loading feedback
- Dark mode beyond color inversion
- Readability and spacing over visual noise

### 🧪 Debugging & Iteration
- Git conflict resolution
- Async state debugging
- Knowing when to reset and simplify

---

## 🚀 Upcoming Features
- Improved YouTube transcript reliability
- Streaming summaries (partial output while generating)
- Summary length control
- User authentication and summary history
- Dockerized deployment
- Better PDF parsing for scanned documents


