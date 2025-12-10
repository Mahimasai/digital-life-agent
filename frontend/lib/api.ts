// frontend/lib/api.ts
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function fetchJson<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`API error ${res.status} for ${path}`);
    }
    // 👇 tell TS that the JSON is of type T
    const data = (await res.json()) as T;
    return data;
}

// generic helpers: you choose T when you call them
export const api = {
    getEmailsToday: <T = unknown>() => fetchJson<T>("/emails/today"),
    getTasks: <T = unknown>() => fetchJson<T>("/tasks"),
    getScheduleToday: <T = unknown>() => fetchJson<T>("/schedule/today"),
};
