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

async function parseApiResponse(res: Response): Promise<any> {
  const raw = await res.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return { message: raw };
  }
}

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
    console.log('=== [LOGIN] Starting login attempt ===');
    console.log('[LOGIN] API_BASE:', API_BASE);
    console.log('[LOGIN] Email:', email);
    console.log('[LOGIN] Password length:', password.length);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      console.log('[LOGIN] Response Status:', res.status, res.statusText);

      const data = await parseApiResponse(res);
      console.log('[LOGIN] Response Body:', data);

      if (!res.ok) {
        console.error('[LOGIN] ❌ Login failed - Status:', res.status);
        console.error('[LOGIN] Error:', data.message || data.error);
        throw new Error(data.message || data.error || `Login failed (${res.status})`);
      }

      // Support both direct AuthResponse and wrapped { success, data }
      const payload = data.token ? data : data.data ? data.data : data;
      const authToken = payload.token;
      console.log('[LOGIN] ✓ Token received');

      const authUser: AuthUser = {
        email,
        username: payload.username || data.username,
        role: payload.role,
        personId: payload.personId,
        tenantId: payload.tenantId,
      };

      console.log('[LOGIN] ✓ Login successful:', { email, username: authUser.username });

      localStorage.setItem("rephyl_token", authToken);
      if (authUser.personId) localStorage.setItem("rephyl_personId", String(authUser.personId));
      if (authUser.tenantId) localStorage.setItem("rephyl_tenantId", String(authUser.tenantId));
      
      setToken(authToken);
      setUser(authUser);
      console.log('=== [LOGIN] Completed Successfully ===');
    } catch (error: any) {
      console.error('=== [LOGIN] Error Occurred ===');
      console.error('[LOGIN] Error:', error.message);
      throw error;
    }
  };

  const register = async (regData: { email: string; password: string; fullName: string; phone?: string }) => {
    // API Spec: POST /api/customer-auth/signup
    // Request body: { name, email, mobile, password }
    const signupPayload = {
      name: regData.fullName,
      email: regData.email,
      mobile: regData.phone || "",
      password: regData.password,
    };

    console.log('=== [SIGNUP] Starting customer signup ===');
    console.log('[SIGNUP] API_BASE:', API_BASE);
    console.log('[SIGNUP] Full URL:', `${API_BASE}/customer-account/signup`);
    console.log('[SIGNUP] Request Payload:', { 
      name: signupPayload.name, 
      email: signupPayload.email, 
      mobile: signupPayload.mobile,
      password: '***MASKED***'
    });

    try {
      const res = await fetch(`${API_BASE}/customer-account/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupPayload),
      });

      console.log('[SIGNUP] Response Status:', res.status, res.statusText);
      console.log('[SIGNUP] Response Headers:', {
        contentType: res.headers.get('content-type'),
        contentLength: res.headers.get('content-length'),
      });

      const data = await parseApiResponse(res);
      console.log('[SIGNUP] Response Body:', data);

      if (!res.ok) {
        console.error('[SIGNUP] ❌ Signup failed');
        console.error('[SIGNUP] Status:', res.status);
        console.error('[SIGNUP] Error Data:', data);
        throw new Error(data.message || data.error || `HTTP ${res.status}: Registration failed`);
      }

      // Expected response format:
      // { success: true, message: "...", data: { loginId, personId, customerProfileId, childRoleId, username, name, email, mobile } }
      const signupData = data.data;
      console.log('[SIGNUP] ✓ Signup successful');
      console.log('[SIGNUP] User Data:', { 
        loginId: signupData.loginId,
        personId: signupData.personId,
        customerProfileId: signupData.customerProfileId,
        username: signupData.username,
        name: signupData.name,
        email: signupData.email,
        mobile: signupData.mobile,
      });

      // Store signup user info
      const userData: AuthUser = {
        email: signupData.email,
        username: signupData.username || signupData.name,
        role: "ROLE_CUSTOMER",
        personId: signupData.personId,
      };
      
      console.log('[SIGNUP] Storing user data:', userData);
      setUser(userData);

      // After signup, attempt to log in automatically to get token
      try {
        console.log('[SIGNUP] Attempting auto-login after signup...');
        await login(regData.email, regData.password);
        console.log('[SIGNUP] ✓ Auto-login successful');
      } catch (loginErr: any) {
        console.warn('[SIGNUP] ⚠️ Auto-login after signup failed:', loginErr.message);
        // Don't throw - user can log in manually
      }
      
      console.log('=== [SIGNUP] Completed Successfully ===');
    } catch (error: any) {
      console.error('=== [SIGNUP] Error Occurred ===');
      console.error('[SIGNUP] Error Type:', error.name);
      console.error('[SIGNUP] Error Message:', error.message);
      console.error('[SIGNUP] Error Stack:', error.stack);
      throw error;
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
