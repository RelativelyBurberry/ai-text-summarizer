from flask import Flask,request,jsonify
from flask_cors import CORS
from groq import Groq, RateLimitError
from youtube_transcript_api import YouTubeTranscriptApi 
import fitz
from dotenv import load_dotenv
import os

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = Flask(__name__)
CORS(app)

def get_summary(prompt):
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "Summarize the following text."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
        )
        return completion.choices[0].message.content
    except RateLimitError:
        return "Rate limit exceeded. Please try again later."

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

import re
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    InvalidVideoId,
    TranscriptsDisabled,
    NoTranscriptFound,
)
import xml.etree.ElementTree as ET

@app.route("/summarize/youtube", methods=["POST"])
def summarize_youtube():
    data = request.get_json()
    video_url = data.get("url", "")

    match = re.search(r"(?:v=|youtu\.be/)([A-Za-z0-9_-]{11})", video_url)
    if not match:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    video_id = match.group(1)

    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(
            video_id,
            languages=["en"]
        )
        transcript = " ".join([t["text"] for t in transcript_list])

    except TranscriptsDisabled:
        return jsonify({"error": "Transcripts are disabled for this video"}), 400

    except NoTranscriptFound:
        return jsonify({"error": "No transcript available for this video"}), 400

    except InvalidVideoId:
        return jsonify({"error": "Invalid YouTube video ID"}), 400

    except ET.ParseError:
        return jsonify({
            "error": (
                "YouTube transcript exists but could not be parsed. "
                "This is a known YouTube issue for some videos."
            )
        }), 400

    summary = get_summary(
        f"Summarize the following YouTube transcript:\n{transcript}"
    )

    return jsonify({"summary": summary})


if __name__ == "__main__":
    app.run(debug=True)
