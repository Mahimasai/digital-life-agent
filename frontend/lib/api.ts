// frontend/lib/api.ts
export const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

async function getJSON<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        // prevent Next from trying to cache
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

// ---- Types that match backend models ----

export type BackendEmail = {
    id: number;
    subject: string;
    summary: string;
    category: string;
};

export type BackendTask = {
    id: number;
    title: string;
    priority: string;
    source: string;
};

export type BackendScheduleBlock = {
    start: string;
    end: string;
    label: string;
    type: string;
};

export const api = {
    getEmails: () => getJSON<BackendEmail[]>("/emails/today"),
    getTasks: () => getJSON<BackendTask[]>("/tasks"),
    getSchedule: () => getJSON<BackendScheduleBlock[]>("/schedule/today"),
    runAgent: () =>
        fetch(`${BASE_URL}/agent/run`, { method: "POST" }).then((r) => r.json()),
};
