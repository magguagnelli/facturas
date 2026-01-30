import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, meRequest } from "../lib/api";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function login(username: string, password: string) {
    const { access_token } = await loginRequest(username, password);
    localStorage.setItem("access_token", access_token);

    const me = await meRequest(access_token);
    setUser(me);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
  }

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await meRequest(token);
        setUser(me);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }
    init();
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