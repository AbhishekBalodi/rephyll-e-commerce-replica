/**
 * Test Script: Customer Signup API
 * Tests the /api/customer-auth/signup endpoint
 */

const API_BASE = "https://www.rephyl.com";

async function testSignup() {
  console.log("╔════════════════════════════════════════════════════════════════╗");
  console.log("║         TESTING CUSTOMER SIGNUP API                            ║");
  console.log("╚════════════════════════════════════════════════════════════════╝\n");

  // Test payload from the specification
  const testPayload = {
    name: "Ratan Sharma",
    email: "ratan@example.com",
    mobile: "9876543210",
    password: "Secret@123",
  };

  console.log("📋 API Specification:");
  console.log("   Method: POST");
  console.log("   URL: /api/customer-auth/signup");
  console.log("   Auth: Not required");
  console.log("   Content-Type: application/json\n");

  console.log("📦 Request Payload:");
  console.log(JSON.stringify(testPayload, null, 2));
  console.log("\n");

  const url = `${API_BASE}/api/customer-auth/signup`;
  console.log(`🌐 Full URL: ${url}\n`);

  try {
    console.log("⏳ Sending request...\n");
    const startTime = Date.now();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    const duration = Date.now() - startTime;
    console.log(`✓ Response received in ${duration}ms\n`);

    console.log("📊 Response Details:");
    console.log(`   Status Code: ${response.status} ${response.statusText}`);
    console.log(`   Content-Type: ${response.headers.get("content-type")}`);
    console.log("\n");

    const data = await response.json();
    console.log("📨 Response Body:");
    console.log(JSON.stringify(data, null, 2));
    console.log("\n");

    if (!response.ok) {
      console.error("❌ FAILED: API returned error status");
      console.error(`   Status: ${response.status}`);
      console.error(`   Message: ${data.message || data.error}`);
      return { success: false, error: data };
    }

    if (!data.success) {
      console.error("❌ FAILED: Response indicates failure");
      console.error(`   Message: ${data.message}`);
      return { success: false, error: data };
    }

    console.log("✅ SUCCESS: Signup API working correctly\n");

    // Validate response structure
    console.log("✓ Validating Response Structure:\n");
    const requiredFields = [
      "loginId",
      "personId",
      "customerProfileId",
      "childRoleId",
      "username",
      "name",
      "email",
      "mobile",
    ];

    let allFieldsPresent = true;
    requiredFields.forEach((field) => {
      const value = data.data[field];
      const status = value !== undefined && value !== null ? "✓" : "✗";
      console.log(`   ${status} ${field}: ${value}`);
      if (value === undefined || value === null) {
        allFieldsPresent = false;
      }
    });

    console.log("\n");
    if (allFieldsPresent) {
      console.log("✅ ALL REQUIRED FIELDS PRESENT\n");
    } else {
      console.log("⚠️  SOME FIELDS MISSING\n");
    }

    console.log("╔════════════════════════════════════════════════════════════════╗");
    console.log("║         TEST COMPLETED SUCCESSFULLY                            ║");
    console.log("╚════════════════════════════════════════════════════════════════╝");

    return { success: true, data };

  } catch (error) {
    console.error("❌ ERROR: Request failed\n");
    console.error(`   Error Type: ${error.name}`);
    console.error(`   Error Message: ${error.message}`);
    console.error(`   Error: ${error.stack}`);

    console.log("\n");
    console.log("Possible causes:");
    console.log("   - Backend service is not running or not accessible");
    console.log("   - Network connectivity issues");
    console.log("   - CORS policy blocking the request");
    console.log("   - Wrong API URL or endpoint\n");

    console.log("╔════════════════════════════════════════════════════════════════╗");
    console.log("║         TEST FAILED WITH ERROR                                 ║");
    console.log("╚════════════════════════════════════════════════════════════════╝");

    return { success: false, error };
  }
}

// Run test
testSignup().then((result) => {
  if (!result.success) {
    process.exit(1);
  }
});
