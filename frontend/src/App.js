import React,{ useState }  from 'react';
import { useEffect } from "react";

import axios from 'axios';
import './App.css';


function App() {
  const [text,setText] = useState('');
  const [summary,setSummary] = useState('');
  const [file,setFile] = useState(null);
  const [youtubeUrl,setYoutubeUrl] = useState('');
  const [toast, setToast] = useState(null);
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const [mode,setMode] = useState('text'); 
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const API_BASE = "https://ai-text-summarizer-l666.onrender.com";
  const handleSummarize = async () => {
    setLoading(true);
    setSummary(''); 
    try{
      const start = Date.now();
      let response;
      if (mode=='text'){
        if (!text.trim()) return alert ("Please enter text to summarize.");
        response = await axios.post(`${API_BASE}/summarize/text`, { text });
      }
      else if (mode=='pdf'){
        if (!file) return alert ("Please upload a PDF file to summarize.");
        const formData = new FormData();
        formData.append('file',file);
        response = await axios.post(`${API_BASE}/summarize/pdf`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      else if (mode=='youtube'){
        if (!youtubeUrl.trim()) return alert ("Please enter a YouTube video URL to summarize.");
        response = await axios.post(`${API_BASE}/summarize/youtube`,{url: youtubeUrl});
      }
      const elapsed = Date.now() - start;
      if (elapsed < 800) {
        await sleep(800 - elapsed);
      }
      setSummary(response.data.summary);
    }catch (error) {
      console.error("Error during summarization:", error);
      let message = "Something went wrong. Please try again.";

      if (error.response?.status === 429) {
        message = "You’ve hit the usage limit. Try again in a bit.";
      } else if (error.message.includes("Network")) {
        message = "Cannot connect to the server. Is the backend running?";
      }

      setToast(message);
    } finally {
    setLoading(false);
    }
  };
  return (
    <div className={`App ${dark ? 'dark' : ''}`}>
      <h1>AI Summarization App</h1>
      <p className="subtitle">
        Paste text, upload PDFs, or summarize YouTube videos in seconds.
      </p>
      <div className = "mode-buttons">
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>

        <button className={mode === "text" ? "active" : ""} onClick={() => setMode("text")}>
          Text
        </button>

        <button className={mode === "pdf" ? "active" : ""} onClick={() => setMode("pdf")}>
          PDF
        </button>

        <button className={mode === "youtube" ? "active" : ""} onClick={() => setMode("youtube")}>
          YouTube
        </button>
      </div>

      {mode === 'text' && (
        <textarea placeholder = "Enter text to summarize" 
        rows = "10"
        value = {text}
        onChange={(e) => setText(e.target.value)}>
        </textarea>
      )}
      {mode === 'pdf' && (
        <input type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}>
        </input>
      )}
      {mode === 'youtube' && (
        <input type = "text"
        placeholder = "Enter YouTube video URL"
        value = {youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}>
        </input>
      )}

      <button onClick={handleSummarize} disabled ={loading}>
        {loading ? <span className="loader"></span> : 'Summarize'}

      </button>

      {summary && (
        <div className="summary-result">
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}

export default App;
