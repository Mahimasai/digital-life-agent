import os
import json
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# try to load .env if present
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# --------- OpenRouter client (optional) ---------

OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY")

try:
    from openai import OpenAI  # OpenRouter uses OpenAI-compatible client
    if OPENROUTER_KEY:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=OPENROUTER_KEY,
        )
    else:
        client = None
        print("⚠️ OPENROUTER_API_KEY not set. AI calls will use fallback data.")
except Exception as e:
    client = None
    print("⚠️ OpenAI client not available, using fallback only. Error:", e)

# --------- FastAPI setup ---------

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

# --------- Models ---------

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


class AgentRunResponse(BaseModel):
    emails: List[Email]
    tasks: List[Task]
    schedule: List[ScheduleBlock]

# --------- Fallback data ---------

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
    ScheduleBlock(start="13:00", end="15:00", label="Deep Work", type="deep-work"),
]

# --------- OpenRouter helper (safe) ---------

def openrouter_json(prompt: str) -> list | None:
    """Call OpenRouter if configured, else return None (use fallback)."""
    if client is None:
        # No AI client or no key → use fallback
        return None

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
            print("⚠️ JSON not found in response, content was:", content)
            return None

        data = json.loads(content[start : end + 1])
        if isinstance(data, list):
            return data
        return None

    except Exception as e:
        print("OpenRouter error:", e)
        return None

# --------- Routes ---------

@app.get("/health")
def health():
    return {
        "status": "ok",
        "openrouter_key_loaded": bool(OPENROUTER_KEY),
        "ai_enabled": client is not None,
    }

@app.get("/emails/today", response_model=List[Email])
def get_emails_today():
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
        except Exception as e:
            print("Email parsing error, using fallback:", e)

    return EMAILS_FALLBACK


@app.get("/tasks", response_model=List[Task])
def get_tasks():
    prompt = """
    Extract 5 tasks from the following context.
    Each task must have:

    id (1–5)
    title
    source (email or calendar or manual)
    priority (high, medium, low)

    Return ONLY JSON array.
    """

    ai_data = openrouter_json(prompt)

    if ai_data:
        try:
            return [Task(**item) for item in ai_data]
        except Exception as e:
            print("Task parsing error, using fallback:", e)

    return TASKS_FALLBACK


@app.get("/schedule/today", response_model=List[ScheduleBlock])
def get_schedule_today():
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
        except Exception as e:
            print("Schedule parsing error, using fallback:", e)

    return SCHEDULE_FALLBACK


@app.post("/agent/run", response_model=AgentRunResponse)
def run_agent_pipeline():
    emails = get_emails_today()
    tasks = get_tasks()
    schedule = get_schedule_today()

    return AgentRunResponse(
        emails=emails,
        tasks=tasks,
        schedule=schedule,
    )
