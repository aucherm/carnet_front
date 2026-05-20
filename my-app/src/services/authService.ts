// src/services/authService.ts

const API_URL = "/api/auth";

export const login = async (mail: string, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mail, password }),
  });

  if (!response.ok) throw new Error("Identifiants incorrects");

  const data = await response.json();
  localStorage.setItem("token", data.token);
};

export const signup = async (
  firstName: string,
  lastName: string,
  mail: string,
  password: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, mail, password }),
  });

  if (!response.ok) throw new Error("Erreur lors de l'inscription");
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => !!localStorage.getItem("token");