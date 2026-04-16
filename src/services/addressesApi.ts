const BASE_URL = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";

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
    throw new Error(data?.message || `API error ${res.status}`);
  }

  return data;
}

export async function getAddresses() {
  try {
    const url = `${BASE_URL}/api/customer-account/addresses`;
    console.log('📍 Fetching addresses from:', url);
    const res = await fetch(url, { 
      headers: authHeaders(),
      credentials: 'include' 
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
    const url = `${BASE_URL}/api/customer-account/addresses`;
    console.log('📍 Creating address at:', url);
    console.log('📋 Address payload:', body);
    
    const res = await fetch(url, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
      credentials: 'include'
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
    const url = `${BASE_URL}/api/customer-account/addresses/${id}`;
    console.log('📍 Deleting address:', url);
    
    const res = await fetch(url, {
      method: "DELETE",
      headers: authHeaders(),
      credentials: 'include'
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
    const url = `${BASE_URL}/api/customer-account/addresses/${id}`;
    console.log('📍 Updating address at:', url);
    
    const res = await fetch(url, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(body),
      credentials: 'include'
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
