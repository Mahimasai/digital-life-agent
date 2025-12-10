import os
import json
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# ------------------ LOAD .ENV ------------------

load_dotenv()
OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_KEY,
)

# ------------------ FASTAPI SETUP ------------------

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://digital-life-agent-frontend.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ MODELS ------------------

class Email(BaseModel):
    id: int
    sender: str
    subject: str
    body: str
    timestamp: str
    category: Optional[str] = None
    summary: Optional[str] = None


class Task(BaseModel):
    id: int
    title: str
    source: str
    priority: str


class ScheduleBlock(BaseModel):
    start: str
    end: str
    label: str
    type: str

# ------------------ FALLBACK DATA ------------------

now = datetime.now()

EMAILS_FALLBACK = [
    Email(
        id=1,
        sender="cfo@company.com",
        subject="Q4 budget review",
        body="Need your feedback on the Q4 budget by Friday.",
        timestamp=str(now - timedelta(hours=3)),
    ),
    Email(
        id=2,
        sender="teamlead@company.com",
        subject="Sprint planning",
        body="Prepare the task list for the upcoming sprint.",
        timestamp=str(now - timedelta(hours=6)),
    ),
]

TASKS_FALLBACK = [
    Task(id=1, title="Review Q4 budget proposal", source="email", priority="high"),
    Task(id=2, title="Prepare sprint backlog", source="email", priority="medium"),
]

SCHEDULE_FALLBACK = [
    ScheduleBlock(start="09:00", end="10:00", label="Email Review", type="deep-work"),
    ScheduleBlock(start="10:00", end="11:00", label="Standup Meeting", type="meeting"),
]

# ------------------ OPENROUTER HELPER ------------------

def openrouter_json(prompt: str) -> list | None:
    """Call OpenRouter and extract JSON array from output."""
    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-3.1-8b-instruct",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7,
        )

        content = response.choices[0].message["content"]

        # Extract JSON array
        start = content.find("[")
        end = content.rfind("]")
        if start == -1 or end == -1:
            print("JSON not found in response")
            return None

        data = json.loads(content[start : end + 1])
        return data

    except Exception as e:
        print("OpenRouter error:", e)
        return None

# ------------------ ROUTES ------------------

@app.get("/health")
def health():
    return {"status": "ok", "openrouter": OPENROUTER_KEY is not None}


@app.get("/emails/today", response_model=List[Email])
def get_emails_today():
    """Summarize and categorize emails using OpenRouter."""
    prompt = f"""
    You are an AI email agent.

    Categorize and summarize these emails.
    Return ONLY a JSON array where each item has:

    id, sender, subject, body, timestamp,
    category (Important/Later/Newsletter),
    summary (1 sentence)

    Emails:
    { [e.dict() for e in EMAILS_FALLBACK] }
    """

    ai_data = openrouter_json(prompt)

    if ai_data:
        try:
            return [Email(**item) for item in ai_data]
        except:
            pass

    return EMAILS_FALLBACK


@app.get("/tasks", response_model=List[Task])
def get_tasks():
    """Extract tasks from emails using OpenRouter."""
    prompt = """
    Extract 5 tasks from the following context.
    Each task must have:

    id (1–5)
    title
    source (email or calendar)
    priority (high, medium, low)

    Return ONLY JSON array.
    """

    ai_data = openrouter_json(prompt)

    if ai_data:
        try:
            return [Task(**item) for item in ai_data]
        except:
            pass

    return TASKS_FALLBACK


@app.get("/schedule/today", response_model=List[ScheduleBlock])
def get_schedule_today():
    """Generate a daily schedule."""
    prompt = """
    Create a productive day schedule.

    Format:
    - start (HH:MM)
    - end (HH:MM)
    - label
    - type (deep-work, meeting, break, admin)

    Return ONLY JSON array.
    """

    ai_data = openrouter_json(prompt)

    if ai_data:
        try:
            return [ScheduleBlock(**item) for item in ai_data]
        except:
            pass

    return SCHEDULE_FALLBACK
