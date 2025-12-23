import React,{ useState }  from 'react';
import axios from 'axios';

function App() {
  const [text,setText] = useState('');
  const [summary,setSummary] = useState('');
  const [file,setFile] = useState(null);
  const [youtubeUrl,setYoutubeUrl] = useState('');

  const [mode,setMode] = useState('text'); 
  const [loading,setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary(''); 
    try{
      let response;
      if (mode=='text'){
        if (!text.trim()) return alert ("Please enter text to summarize.");
        response = await axios.post('http://localhost:5000/summarize/text',{text});
      }
      else if (mode=='pdf'){
        if (!file) return alert ("Please upload a PDF file to summarize.");
        const formData = new FormData();
        formData.append('file',file);
        response = await axios.post('http://localhost:5000/summarize/pdf',formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      else if (mode=='youtube'){
        if (!youtubeUrl.trim()) return alert ("Please enter a YouTube video URL to summarize.");
        response = await axios.post('http://localhost:5000/summarize/youtube',{url: youtubeUrl});
      }
      setSummary(response.data.summary);
    }catch (error){
      console.error("Error during summarization:",error);
      alert ("An error occurred during summarization. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className="App">
      <h1>AI Summarization App</h1>
      <div className = "mode-buttons">
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
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {summary && (
        <div className="summary-result">
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}

    </div>
  );
}

export default App;
