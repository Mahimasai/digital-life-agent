# backend/main.py
import os
import json
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# ------------------ LOAD .ENV ------------------
# list file with details
# near the top of main.py
from pathlib import Path
from dotenv import load_dotenv

# load .env located in backend/ folder (same folder as main.py)
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)
OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY")

if not OPENROUTER_KEY:
    # keep running with fallbacks but log that key is missing
    print("WARNING: OPENROUTER_API_KEY not set. Using fallback data only.")

client = OpenAI(base_url="https://api.openrouter.ai/v1", api_key=OPENROUTER_KEY)

# ------------------ FASTAPI SETUP ------------------
app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://digital-life-agent-frontend.vercel.app",
    # add your deployed frontend URLs here
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

class AgentRunResponse(BaseModel):
    emails: List[Email]
    tasks: List[Task]
    schedule: List[ScheduleBlock]
    note: Optional[str] = None

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
# def openrouter_json(prompt: str) -> Optional[list]:
#     """
#     Send a chat completion request to OpenRouter and attempt to extract
#     a JSON array from the model output. Returns list or None on failure.
#     """
#     if not OPENROUTER_KEY:
#         print("openrouter_json: no API key, skipping external call.")
#         return None

#     try:
#         response = client.chat.completions.create(
#             model="meta-llama/llama-3.1-8b-instruct",
#             messages=[{"role": "user", "content": prompt}],
#             max_tokens=700,
#             temperature=0.7,
#         )

#         # Try several ways to get text content depending on response shape
#         content = None
#         try:
#             content = response.choices[0].message["content"]
#         except Exception:
#             try:
#                 content = getattr(response.choices[0].message, "content", None)
#             except Exception:
#                 content = getattr(response.choices[0], "text", None)

#         if not content:
#             print("openrouter_json: no content found in response.")
#             return None

#         # find first '[' and last ']' and parse that slice
#         start = content.find("[")
#         end = content.rfind("]")
#         if start == -1 or end == -1:
#             print("openrouter_json: JSON array not found in model output.")
#             return None

#         arr_text = content[start : end + 1]
#         data = json.loads(arr_text)
#         if not isinstance(data, list):
#             print("openrouter_json: parsed content is not a list.")
#             return None
#         return data

#     except Exception as e:
#         # print full exception for debugging; fallbacks will be used
#         print("OpenRouter error:", repr(e))
#         return None


# ------------------ OPENROUTER HELPER ------------------
from openai import OpenAI  # make sure openai package is installed

OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY")  # loaded from backend/.env by load_dotenv()

# create client pointing to OpenRouter base_url
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_KEY,
)

def openrouter_json(prompt: str) -> list | None:
    """Call OpenRouter (chat) and return parsed JSON array, or None if something fails."""
    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-3.1-8b-instruct",  # change model if needed
            messages=[{"role": "user", "content": prompt}],
            max_tokens=800,
            temperature=0.7,
        )

        # OpenRouter returns content at choices[0].message.content
        content = response.choices[0].message["content"]

        # find JSON array inside response text and parse
        start = content.find("[")
        end = content.rfind("]")
        if start == -1 or end == -1:
            print("OpenRouter: JSON not found in response")
            return None

        data = json.loads(content[start : end + 1])
        return data
    except Exception as e:
        # print full exception for local debugging
        print("OpenRouter error:", repr(e))
        return None
# ------------------ ROUTES ------------------
@app.get("/health")
def health():
    return {"status": "ok", "openrouter": OPENROUTER_KEY is not None}

@app.get("/emails/today", response_model=List[Email])
def get_emails_today():
    prompt = f"""
    You are an AI email agent.
    Categorize and summarize these emails.
    Return ONLY a JSON array where each item has:
    id, sender, subject, body, timestamp, category (Important/Later/Newsletter), summary (1 sentence)

    Emails:
    { [e.dict() for e in EMAILS_FALLBACK] }
    """
    ai_data = openrouter_json(prompt)
    if ai_data:
        try:
            return [Email(**item) for item in ai_data]
        except Exception as e:
            print("get_emails_today: parsing AI response failed:", e)
    return EMAILS_FALLBACK

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    prompt = """
    Extract up to 5 tasks from the following context.
    Each task must have: id (1–5), title, source (email or calendar), priority (high, medium, low).
    Return ONLY JSON array.
    """
    ai_data = openrouter_json(prompt)
    if ai_data:
        try:
            return [Task(**item) for item in ai_data]
        except Exception as e:
            print("get_tasks: parsing AI response failed:", e)
    return TASKS_FALLBACK

@app.get("/schedule/today", response_model=List[ScheduleBlock])
def get_schedule_today():
    prompt = """
    Create a productive day schedule.
    Format: start (HH:MM), end (HH:MM), label, type (deep-work, meeting, break, admin).
    Return ONLY JSON array.
    """
    ai_data = openrouter_json(prompt)
    if ai_data:
        try:
            return [ScheduleBlock(**item) for item in ai_data]
        except Exception as e:
            print("get_schedule_today: parsing AI response failed:", e)
    return SCHEDULE_FALLBACK

@app.post("/agent/run", response_model=AgentRunResponse)
def run_agent_pipeline():
    """
    Single endpoint that runs the pipeline and returns emails, tasks, schedule.
    If OpenRouter unavailable it will return fallback data and a note.
    """
    note = None

    # Emails
    ai_emails = openrouter_json(
        f"""
        You are an AI email agent.
        Return ONLY a JSON array with id, sender, subject, body, timestamp, category, summary.
        Emails: { [e.dict() for e in EMAILS_FALLBACK] }
        """
    )
    if ai_emails:
        try:
            emails = [Email(**item) for item in ai_emails]
        except Exception as e:
            print("run_agent_pipeline: parsing emails failed:", e)
            emails = EMAILS_FALLBACK
            note = (note or "") + " emails fallback."
    else:
        emails = EMAILS_FALLBACK
        note = (note or "") + " OpenRouter unavailable — emails fallback."

    # Tasks
    ai_tasks = openrouter_json(
        """
        Extract up to 5 tasks. Return ONLY JSON array with id, title, source, priority.
        """
    )
    if ai_tasks:
        try:
            tasks = [Task(**item) for item in ai_tasks]
        except Exception as e:
            print("run_agent_pipeline: parsing tasks failed:", e)
            tasks = TASKS_FALLBACK
            note = (note or "") + " tasks fallback."
    else:
        tasks = TASKS_FALLBACK
        note = (note or "") + " OpenRouter unavailable — tasks fallback."

    # Schedule
    ai_schedule = openrouter_json(
        """
        Create a day schedule. Return ONLY JSON array with start, end, label, type.
        """
    )
    if ai_schedule:
        try:
            schedule = [ScheduleBlock(**item) for item in ai_schedule]
        except Exception as e:
            print("run_agent_pipeline: parsing schedule failed:", e)
            schedule = SCHEDULE_FALLBACK
            note = (note or "") + " schedule fallback."
    else:
        schedule = SCHEDULE_FALLBACK
        note = (note or "") + " OpenRouter unavailable — schedule fallback."

    return AgentRunResponse(emails=emails, tasks=tasks, schedule=schedule, note=note.strip())
