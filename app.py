from flask import Flask,request,jsonify
from flask_cors import CORS
from openai import OpenAI,RateLimitError
from youtube_transcript_api import YouTubeTranscriptApi 
import fitz
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app,origins="http://localhost:3000")

def get_summary(prompt):
    try:
        response = client.chat.completions.create(
            model="o3-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=350,
        )
        return response.choices[0].message.content
    except RateLimitError:
            return "⚠️ OpenAI API quota exceeded, but the app pipeline works correctly"

@app.route("/summarize/text", methods=["POST"])
def summarize_text(): 
    data = request.get_json()
    text = data['text']
    prompt = f"Summarize the following text:\n{text}"
    summary = get_summary(prompt)
    return jsonify({"summary": summary})

@app.route("/summarize/pdf", methods=["POST"])
def summarize_pdf():
    file = request.files['file'] 
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    prompt = f"Summarize the following PDF content:\n{text}"
    summary = get_summary(prompt)
    return jsonify({"summary": summary})

@app.route("/summarize/youtube", methods=["POST"])
def summarize_youtube():
    data = request.get_json()
    video_url = data['url']
    video_id = video_url.split("v=")[-1]
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = " ".join([t['text'] for t in transcript_list])
    prompt = f"Summarize the following YouTube transcript:\n{transcript}"
    summary = get_summary(prompt)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)from flask import Flask,request,jsonify
from flask_cors import CORS
from openai import OpenAI,RateLimitError
from youtube_transcript_api import YouTubeTranscriptApi 
import fitz
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app,origins="http://localhost:3000")

def get_summary(prompt):
    try:
        response = client.chat.completions.create(
            model="o3-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=350,
        )
        return response.choices[0].message.content
    except RateLimitError:
            return "⚠️ OpenAI API quota exceeded, but the app pipeline works correctly"

@app.route("/summarize/text", methods=["POST"])
def summarize_text(): 
    data = request.get_json()
    text = data['text']
    prompt = f"Summarize the following text:\n{text}"
    summary = get_summary(prompt)
    return jsonify({"summary": summary})

@app.route("/summarize/pdf", methods=["POST"])
def summarize_pdf():
    file = request.files['file'] 
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    prompt = f"Summarize the following PDF content:\n{text}"
    summary = get_summary(prompt)
    return jsonify({"summary": summary})

@app.route("/summarize/youtube", methods=["POST"])
def summarize_youtube():
    data = request.get_json()
    video_url = data['url']
    video_id = video_url.split("v=")[-1]
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = " ".join([t['text'] for t in transcript_list])
    prompt = f"Summarize the following YouTube transcript:\n{transcript}"
    summary = get_summary(prompt)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)