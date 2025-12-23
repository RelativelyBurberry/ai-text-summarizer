# AI Summarizer App

An AI-powered web application that generates concise summaries from **plain text**, **YouTube videos**, and **PDF documents** using modern NLP models.

## 🚀 Features

- 📝 **Text Summarization** – Paste any text and get an instant AI-generated summary  
- 🎥 **YouTube Video Summarization** – Extracts transcript and produces structured summaries  
- 📄 **PDF Summarization** – Upload PDFs and summarize long documents efficiently  
- ⚡ Fast, responsive UI built with React  
- 🔌 Modular REST API backend using Flask  
- 🤖 Powered by OpenAI API for high-quality summaries  

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios

### Backend
- Flask
- RESTful APIs
- OpenAI API
- YouTube Transcript API
- PDF parsing utilities

## 🏗️ Architecture Overview <br>
Frontend (React) <br> 
↓ REST API <br>
Backend (Flask) <br>
↓ <br>
OpenAI API / YouTube Transcript / PDF Parser <br>


The frontend communicates with a Flask backend via REST APIs. The backend handles content extraction, preprocessing, prompt construction, and AI inference.

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-summarizer-app.git
cd ai-summarizer-app
```
### 2. Backend Setup
cd backend <br> 
pip install -r requirements.txt <br> 
python app.py <br> 

### 3. Frontend Setup
cd frontend <br> 
npm install <br> 
npm start <br> 

### 4.🔑 Environment Variables
Create a .env file in the backend directory: <br> 
OPENAI_API_KEY=your_api_key_here <br> 

---

## 🧠 How It Works

User inputs text / YouTube URL / PDF <br> 
Backend extracts and preprocesses content <br> 
Prompt is dynamically generated <br> 
OpenAI API returns a summarized response <br> 
Summary is rendered in the UI <br> 

## 📌 Future Improvements

Multi-language support <br> 
Summary length & style controls <br> 
User authentication and history <br> 
Streaming responses for large documents <br> 
