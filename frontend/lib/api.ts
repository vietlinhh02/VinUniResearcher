
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ErrorResponse {
  error: string;
}

export async function postJSON<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) {
    let message = `Yêu cầu thất bại (${res.status})`;
    try {
      const data = (await res.json()) as ErrorResponse;
      if (data.error) message = data.error;
    } catch {
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
