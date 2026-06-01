import { handleAuthExpired } from "@/lib/authSession";

const ENV_BASE_URL =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") || "";
const FALLBACK_BASE_URL = "https://www.rephyl.com";

function buildUrl(path: string, useFallback = false) {
  const base = useFallback ? FALLBACK_BASE_URL : ENV_BASE_URL;
  return `${base}${path}`;
}

function buildRequestInit(url: string, init: RequestInit = {}): RequestInit {
  const isAbsolute = /^https?:\/\//i.test(url);
  const credentials: RequestCredentials = isAbsolute ? "omit" : "include";
  return {
    ...init,
    credentials,
  };
}

async function fetchWithFallback(path: string, init: RequestInit = {}) {
  const primaryUrl = buildUrl(path, false);

  try {
    return await fetch(primaryUrl, buildRequestInit(primaryUrl, init));
  } catch (primaryErr) {
    // In dev/proxy failures, retry once against stable absolute API host.
    if (ENV_BASE_URL) throw primaryErr;

    const fallbackUrl = buildUrl(path, true);
    return await fetch(fallbackUrl, buildRequestInit(fallbackUrl, init));
  }
}

function authHeaders() {
  const token = localStorage.getItem("rephyl_token");
  if (!token) {
    console.warn('⚠️ No auth token found. Address operations require authentication.');
  }
  return {
    Authorization: `Bearer ${token || ''}`,
    "Content-Type": "application/json",
  };
}

async function fetchJson(res: Response) {
  // Parse response
  let data;
  try {
    data = await res.json();
  } catch (e) {
    // If response is not JSON, throw generic error
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  // Check if response is ok
  if (!res.ok) {
    if (res.status === 401) {
      handleAuthExpired();
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(data?.message || `API error ${res.status}`);
  }

  return data;
}

export async function getAddresses() {
  try {
    const path = `/api/customer-account/addresses`;
    console.log('📍 Fetching addresses');
    const res = await fetchWithFallback(path, {
      headers: authHeaders(),
    });
    const data = await fetchJson(res);
    console.log('✅ Addresses fetched successfully:', data);
    return data;
  } catch (err) {
    console.error('❌ Failed to fetch addresses:', err);
    throw err;
  }
}

export async function createAddress(body: any) {
  try {
    const path = `/api/customer-account/addresses`;
    console.log('📍 Creating address');
    console.log('📋 Address payload:', body);
    
    const res = await fetchWithFallback(path, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    
    const data = await fetchJson(res);
    console.log('✅ Address created successfully:', data);
    return data;
  } catch (err) {
    console.error('❌ Failed to create address:', err);
    throw err;
  }
}

export async function deleteAddress(id: number) {
  try {
    const path = `/api/customer-account/addresses/${id}`;
    console.log('📍 Deleting address:', id);
    
    const res = await fetchWithFallback(path, {
      method: "DELETE",
      headers: authHeaders(),
    });
    
    const data = await fetchJson(res);
    console.log('✅ Address deleted successfully');
    return data;
  } catch (err) {
    console.error('❌ Failed to delete address:', err);
    throw err;
  }
}

export async function updateAddress(id: number, body: any) {
  try {
    const path = `/api/customer-account/addresses/${id}`;
    console.log('📍 Updating address:', id);
    
    const res = await fetchWithFallback(path, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    
    const data = await fetchJson(res);
    console.log('✅ Address updated successfully:', data);
    return data;
  } catch (err) {
    console.error('❌ Failed to update address:', err);
    throw err;
  }
}

export default { getAddresses, createAddress, deleteAddress, updateAddress };
