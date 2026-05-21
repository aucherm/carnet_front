import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { AuthContext } from "../context/AuthContext";

const mockLogin = vi.fn();

const renderWithAuth = (ui: React.ReactElement) => {
  return render(
    <AuthContext.Provider value={{ authenticated: false, login: mockLogin, logout: vi.fn() }}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe("LoginPage", () => {
  it("affiche le formulaire de connexion", () => {
    renderWithAuth(<LoginPage />);
    expect(screen.getByPlaceholderText("vous@exemple.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("affiche une erreur si le login échoue", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Identifiants incorrects"));
    renderWithAuth(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("vous@exemple.com"), {
      target: { value: "mauvais@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "mauvaismdp" },
    });
    fireEvent.click(screen.getByText("Se connecter →"));

    const error = await screen.findByText("Email ou mot de passe incorrect");
    expect(error).toBeInTheDocument();
  });
});