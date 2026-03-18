import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  is_admin?: boolean;
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

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("rephyl_token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            setUser({ id: res.data.userId, email: res.data.email, full_name: res.data.fullName || res.data.email });
          } else {
            logout();
          }
        })
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    localStorage.setItem("rephyl_token", data.data.token);
    setToken(data.data.token);
    setUser(data.data.user);
  };

  const register = async (regData: { email: string; password: string; fullName: string; phone?: string }) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    localStorage.setItem("rephyl_token", data.data.token);
    setToken(data.data.token);
    setUser(data.data.user);
  };

  const logout = () => {
    localStorage.removeItem("rephyl_token");
    setToken(null);
    setUser(null);
  };

  // For now, admin is determined by email (can be extended with roles table later)
  const isAdmin = user?.email === "admin@rephyl.com" || (user as any)?.is_admin === true;

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
