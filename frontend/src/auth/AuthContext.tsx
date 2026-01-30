import React, { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(username: string, password: string) {
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    localStorage.setItem("token", data.access_token);

    const me = await apiFetch("/auth/me");
    setUser(me);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    async function load() {
      try {
        const me = await apiFetch("/auth/me");
        setUser(me);
      } catch {
        logout();
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
