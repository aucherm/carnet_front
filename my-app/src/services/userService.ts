import type { User } from "../types/User";
import apiFetch from "./apiFetch";

export async function fetchMe(): Promise<User> {
  const res = await apiFetch("/api/users/me");
  if (!res.ok) throw new Error("Impossible de récupérer l'utilisateur connecté");
  return res.json();
}