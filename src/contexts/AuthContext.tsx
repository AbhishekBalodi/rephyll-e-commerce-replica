import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import profileApi from "@/services/profileApi";

interface AuthUser {
  email: string;
  username: string;
  role: string;
  personId?: number;
  tenantId?: number;
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

const API_BASE = (import.meta.env.VITE_BASE_URL || "https://www.rephyl.com") + "/api";

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

  // When token changes, try to fetch the full profile
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const tokenVal = localStorage.getItem('rephyl_token');
        if (!tokenVal) return;
        const res = await profileApi.getProfile();
        const payload = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
        if (!mounted) return;
        if (payload) {
          setUser((prev) => ({
            email: payload.email || prev?.email || '',
            username: payload.displayName || prev?.username || payload.username || '',
            role: prev?.role || 'ROLE_CUSTOMER',
            personId: payload.personId || prev?.personId,
            tenantId: payload.tenantId || prev?.tenantId,
          }));
        }
      } catch (_) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    // Support both direct AuthResponse and wrapped { success, data }
    const payload = data.token ? data : data.data ? data.data : data;
    const authToken = payload.token;
    const authUser: AuthUser = {
      email,
      username: payload.username || data.username,
      role: payload.role,
      personId: payload.personId,
      tenantId: payload.tenantId,
    };

    localStorage.setItem("rephyl_token", authToken);
    if (authUser.personId) localStorage.setItem("rephyl_personId", String(authUser.personId));
    if (authUser.tenantId) localStorage.setItem("rephyl_tenantId", String(authUser.tenantId));
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
    const payload = data.token ? data : data.data ? data.data : data;
    if (payload.token) {
      localStorage.setItem("rephyl_token", payload.token);
      setToken(payload.token);
      setUser({
        email: regData.email,
        username: payload.username || regData.fullName,
        role: payload.role || "ROLE_CUSTOMER",
      });
      return;
    }

    // If registration did not return a token, attempt to log in automatically
    try {
      await login(regData.email, regData.password);
    } catch (_) {
      // ignore - user can log in manually
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
