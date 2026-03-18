import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthUser {
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; fullName: string; phone?: string }) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || "https://www.brandingidiots.tech/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem("rephyl_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("rephyl_token"));
  const [isLoading, setIsLoading] = useState(false);

  // Persist user data
  useEffect(() => {
    if (user) {
      localStorage.setItem("rephyl_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("rephyl_user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    // Spring Boot response: { token, username, role, tenantId, tenantType, permissions }
    const authToken = data.token;
    const authUser: AuthUser = {
      email,
      username: data.username,
      role: data.role,
    };

    localStorage.setItem("rephyl_token", authToken);
    setToken(authToken);
    setUser(authUser);
  };

  const register = async (regData: { email: string; password: string; fullName: string; phone?: string }) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");

    // If register also returns a token, log them in
    if (data.token) {
      localStorage.setItem("rephyl_token", data.token);
      setToken(data.token);
      setUser({
        email: regData.email,
        username: data.username || regData.fullName,
        role: data.role || "ROLE_CUSTOMER",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("rephyl_token");
    localStorage.removeItem("rephyl_user");
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === "ROLE_ADMIN";

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
