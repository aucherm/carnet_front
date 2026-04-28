// src/services/userService.ts
import type { User } from "../types/User";

export async function fetchCurrentUser(): Promise<User> {
  const res = await fetch("/api/users");
  console.log("Status:", res.status);
  console.log("URL:", res.url);
  if (!res.ok) throw new Error("Impossible de récupérer les utilisateurs");
  const users: User[] = await res.json();
  return users[0];
}