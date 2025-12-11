// frontend/lib/api.ts
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function fetchJson<T>(path: string, opts?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store", ...opts });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status} for ${path} - ${text}`);
    }
    const data = (await res.json()) as T;
    return data;
}

export type Email = {
    id?: number;
    sender?: string;
    subject: string;
    body?: string;
    timestamp?: string;
    category?: string;
    summary?: string;
};

export type Task = {
    id?: number;
    title: string;
    priority?: string;
    source?: string;
};

export type ScheduleBlock = {
    start?: string;
    end?: string;
    label?: string;
    type?: string;
};

export type AgentRunResponse = {
    emails: Email[];
    tasks: Task[];
    schedule: ScheduleBlock[];
    note?: string | null;
};

export const api = {
    getEmailsToday: <T = Email[]>() => fetchJson<T>("/emails/today"),
    getTasks: <T = Task[]>() => fetchJson<T>("/tasks"),
    getScheduleToday: <T = ScheduleBlock[]>() => fetchJson<T>("/schedule/today"),

    runAgent: <T = AgentRunResponse>() =>
        fetch(`${API_BASE_URL}/agent/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Agent run failed ${res.status} - ${txt}`);
            }
            return (await res.json()) as T;
        }),
};
