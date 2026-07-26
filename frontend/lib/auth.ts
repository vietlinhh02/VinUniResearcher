import { cookies } from "next/headers";

import { API_URL, type User } from "./api";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("mentee_session");
  if (!session) return null;

  try {
    const res = await fetch(`${API_URL}/api/v1/auth/me`, {
      headers: { cookie: `mentee_session=${session.value}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as User;
  } catch {
    return null;
  }
}
