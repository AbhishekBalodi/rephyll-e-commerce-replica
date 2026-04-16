/**
 * Test Script: Testing signup endpoint with different header configurations
 */

const API_BASE = "https://www.rephyl.com";

const testPayload = {
  name: "Ratan Sharma",
  email: "ratan@example.com",
  mobile: "9876543210",
  password: "Secret@123",
};

const headerConfigs = [
  {
    name: "Default (Content-Type only)",
    headers: {
      "Content-Type": "application/json",
    },
  },
  {
    name: "With Authorization: Bearer null",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer null",
    },
  },
  {
    name: "With empty Authorization header",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "",
    },
  },
  {
    name: "With application/x-www-form-urlencoded",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: Object.keys(testPayload)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(testPayload[k])}`)
      .join("&"),
  },
  {
    name: "With Accept: application/json",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  },
];

async function testWithHeaders(config) {
  const url = `${API_BASE}/api/customer-auth/signup`;
  console.log(`\n📋 Configuration: ${config.name}`);
  console.log(`   Headers:`, JSON.stringify(config.headers, null, 2));

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: config.headers,
      body: config.body || JSON.stringify(testPayload),
    });

    const contentType = response.headers.get("content-type");
    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      console.log(`   ✅ SUCCESS`);
      if (typeof data === "object") {
        console.log(`   Response:`, JSON.stringify(data, null, 2));
      }
      return { success: true, config: config.name, data };
    } else {
      console.log(`   ❌ FAILED`);
      if (typeof data === "object") {
        console.log(`   Error: ${data.message || data.error}`);
      } else {
        console.log(`   Response: ${data.substring(0, 200)}`);
      }
    }
    return { success: false, config: config.name, status: response.status };
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return { success: false, config: config.name, error: error.message };
  }
}

async function runTests() {
  console.log("╔════════════════════════════════════════════════════════════════╗");
  console.log("║    TESTING SIGNUP WITH DIFFERENT HEADER CONFIGURATIONS         ║");
  console.log("╚════════════════════════════════════════════════════════════════╝");

  console.log(`\nTarget URL: ${API_BASE}/api/customer-auth/signup`);
  console.log(`Request Method: POST`);

  const results = [];
  for (const config of headerConfigs) {
    const result = await testWithHeaders(config);
    results.push(result);
  }

  console.log("\n╔════════════════════════════════════════════════════════════════╗");
  console.log("║         SUMMARY                                               ║");
  console.log("╚════════════════════════════════════════════════════════════════╝");

  const successful = results.filter((r) => r.success);
  console.log(`\n✓ Successful: ${successful.length}/${results.length}`);
  successful.forEach((r) => console.log(`  - ${r.config}`));

  const failed = results.filter((r) => !r.success);
  console.log(`\n✗ Failed: ${failed.length}/${results.length}`);
  failed.forEach((r) => console.log(`  - ${r.config}`));
}

runTests();
