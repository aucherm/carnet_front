// src/services/userService.ts
import type { User } from "../types/User";
import apiFetch from "./apiFetch";

export async function fetchCurrentUser(): Promise<User> {
  const res = await apiFetch("/api/users");
  if (!res.ok) throw new Error("Impossible de récupérer les utilisateurs");
  const users: User[] = await res.json();
  return users[0];
}