/**
 * Test Script: Customer Signup API - Testing different endpoints
 */

const API_BASE = "https://www.rephyl.com";

const testPayload = {
  name: "Ratan Sharma",
  email: "ratan@example.com",
  mobile: "9876543210",
  password: "Secret@123",
};

const endpoints = [
  "/api/customer-auth/signup",
  "/api/customer-auth/register",
  "/api/auth/register",
  "/api/auth/customer-signup",
  "/auth/signup",
  "/customer-auth/signup",
];

async function testEndpoint(endpoint) {
  const url = `${API_BASE}${endpoint}`;
  console.log(`\n📍 Testing: ${endpoint}`);
  console.log(`   Full URL: ${url}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    
    if (response.ok && data.success) {
      console.log(`   ✅ SUCCESS`);
      console.log(`   Response:`, JSON.stringify(data, null, 2));
      return { endpoint, success: true, data };
    } else if (response.status === 404) {
      console.log(`   ❌ NOT FOUND (404)`);
    } else if (response.status === 401) {
      console.log(`   ❌ UNAUTHORIZED (401): ${data.message || data.error}`);
    } else if (response.status === 403) {
      console.log(`   ❌ FORBIDDEN (403): ${data.message || data.error}`);
    } else {
      console.log(`   ❌ ERROR: ${data.message || data.error}`);
    }
    return { endpoint, success: false, status: response.status };
  } catch (error) {
    console.log(`   ❌ NETWORK ERROR: ${error.message}`);
    return { endpoint, success: false, error: error.message };
  }
}

async function runTests() {
  console.log("╔════════════════════════════════════════════════════════════════╗");
  console.log("║         TESTING SIGNUP ENDPOINTS VARIATIONS                    ║");
  console.log("╚════════════════════════════════════════════════════════════════╝");

  const results = [];
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push(result);
  }

  console.log("\n╔════════════════════════════════════════════════════════════════╗");
  console.log("║         SUMMARY                                               ║");
  console.log("╚════════════════════════════════════════════════════════════════╝");

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\n✓ Successful endpoints: ${successful.length}`);
  successful.forEach((r) => console.log(`  - ${r.endpoint}`));

  console.log(`\n✗ Failed endpoints: ${failed.length}`);
  failed.forEach((r) => console.log(`  - ${r.endpoint} (${r.status || "error"})`));
}

runTests();
