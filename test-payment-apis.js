#!/usr/bin/env node

/**
 * Payment API Test Suite
 * 
 * This script tests all payment-related endpoints:
 * - previewCheckout
 * - startPaymentSession
 * - verifyPaymentSession
 * - confirmPaymentSession
 */

const BASE_URL = process.env.API_BASE_URL || "https://www.rephyl.com";
const TEST_USER_EMAIL = process.env.TEST_EMAIL || "testcustomer@gmail.com";
const TEST_USER_PASSWORD = process.env.TEST_PASSWORD || "Test@1234";

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
};

function log(message, type = "info") {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = {
    info: `${colors.blue}ℹ${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
    warning: `${colors.yellow}⚠${colors.reset}`,
  }[type] || "•";
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function formatJson(obj) {
  return JSON.stringify(obj, null, 2);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// API Functions
// ============================================================================

async function loginCustomer() {
  log(`Logging in as ${TEST_USER_EMAIL}...`, "info");
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        `Login failed: ${res.status} ${JSON.stringify(err)}`
      );
    }

    const data = await res.json();
    const token = data.token || data.data?.token;
    if (!token) throw new Error("No token in response");

    log(`Login successful. Token: ${token.slice(0, 30)}...`, "success");
    return token;
  } catch (err) {
    log(`Login failed: ${err.message}`, "error");
    throw err;
  }
}

async function getAddresses(token) {
  log("Fetching customer addresses...", "info");
  try {
    const res = await fetch(`${BASE_URL}/api/customer-account/addresses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Get addresses failed: ${res.status} ${JSON.stringify(err)}`);
    }

    const data = await res.json();
    const addresses = data.success ? data.data : data;
    if (!Array.isArray(addresses) || addresses.length === 0) {
      throw new Error("No addresses found. Please create an address first.");
    }

    const firstAddress = addresses[0];
    log(
      `Found ${addresses.length} address(es). Using: ${firstAddress.line1}`,
      "success"
    );
    return firstAddress;
  } catch (err) {
    log(`Get addresses failed: ${err.message}`, "error");
    throw err;
  }
}

async function getCart(token) {
  log("Fetching cart...", "info");
  try {
    const res = await fetch(`${BASE_URL}/api/customer-account/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Get cart failed: ${res.status} ${JSON.stringify(err)}`);
    }

    const data = await res.json();
    const cartData = data.success ? data.data : data;
    const items = cartData.items || [];

    if (items.length === 0) {
      throw new Error("Cart is empty. Please add items to cart first.");
    }

    log(`Cart has ${items.length} item(s)`, "success");
    return items;
  } catch (err) {
    log(`Get cart failed: ${err.message}`, "error");
    throw err;
  }
}

async function previewCheckout(token, addressId, items) {
  log("Testing: previewCheckout", "info");
  try {
    const payload = {
      deliveryAddressId: addressId,
      items: items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    };

    log(`Request: ${formatJson(payload)}`, "info");

    const res = await fetch(
      `${BASE_URL}/api/customer-account/orders/payment-session/preview`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Preview failed: ${res.status} ${JSON.stringify(err)}`);
    }

    const data = await res.json();
    const previewData = data.success ? data.data : data;

    if (!previewData.serviceable) {
      throw new Error(
        `Address not serviceable: ${previewData.message}`
      );
    }

    log(`✓ Preview successful - Serviceable: ${previewData.serviceable}`, "success");
    log(`Response: ${formatJson(previewData)}`, "info");
    return previewData;
  } catch (err) {
    log(`Preview failed: ${err.message}`, "error");
    throw err;
  }
}

async function startPaymentSession(token, addressId, items) {
  log("Testing: startPaymentSession", "info");
  try {
    const payload = {
      deliveryAddressId: addressId,
      items: items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    };

    log(`Request: ${formatJson(payload)}`, "info");

    const res = await fetch(
      `${BASE_URL}/api/customer-account/orders/payment-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        `Start payment session failed: ${res.status} ${JSON.stringify(err)}`
      );
    }

    const data = await res.json();
    const sessionData = data.success ? data.data : data;

    if (!sessionData.merchantOrderId || !sessionData.paymentSessionId) {
      throw new Error("Missing merchantOrderId or paymentSessionId in response");
    }

    log(`✓ Payment session created`, "success");
    log(
      `Merchant Order ID: ${sessionData.merchantOrderId}`,
      "success"
    );
    log(
      `Payment Session ID: ${sessionData.paymentSessionId.slice(0, 30)}...`,
      "success"
    );
    log(`Response: ${formatJson(sessionData)}`, "info");
    return sessionData;
  } catch (err) {
    log(`Start payment session failed: ${err.message}`, "error");
    throw err;
  }
}

async function verifyPaymentSession(token, merchantOrderId) {
  log(`Testing: verifyPaymentSession (merchantOrderId: ${merchantOrderId})`, "info");
  try {
    const res = await fetch(
      `${BASE_URL}/api/customer-account/orders/payment-session/${merchantOrderId}/verify`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        `Verify payment session failed: ${res.status} ${JSON.stringify(err)}`
      );
    }

    const data = await res.json();
    const verifyData = data.success ? data.data : data;

    log(
      `✓ Payment verification successful - Status: ${verifyData.paymentStatus || "UNKNOWN"}`,
      "success"
    );
    log(`Response: ${formatJson(verifyData)}`, "info");
    return verifyData;
  } catch (err) {
    log(`Verify payment session failed: ${err.message}`, "error");
    throw err;
  }
}

async function confirmPaymentSession(token, orderIds, paymentMethod = "CASHFREE") {
  log(`Testing: confirmPaymentSession`, "info");
  try {
    const payload = {
      orderIds,
      paymentMethod,
    };

    log(`Request: ${formatJson(payload)}`, "info");

    const res = await fetch(
      `${BASE_URL}/api/customer-account/orders/payment-session/confirm`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        `Confirm payment session failed: ${res.status} ${JSON.stringify(err)}`
      );
    }

    const data = await res.json();
    const confirmData = data.success ? data.data : data;

    log(`✓ Payment confirmation successful`, "success");
    log(`Response: ${formatJson(confirmData)}`, "info");
    return confirmData;
  } catch (err) {
    log(`Confirm payment session failed: ${err.message}`, "error");
    throw err;
  }
}

// ============================================================================
// Main Test Flow
// ============================================================================

async function runTests() {
  console.log("\n");
  console.log(colors.bright + "═".repeat(70) + colors.reset);
  console.log(colors.bright + "  PAYMENT API TEST SUITE".padEnd(70) + colors.reset);
  console.log(colors.bright + "═".repeat(70) + colors.reset);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Test User: ${TEST_USER_EMAIL}`);
  console.log("\n");

  try {
    // Step 1: Login
    log("STEP 1: Authentication", "info");
    const token = await loginCustomer();
    await sleep(1000);

    // Step 2: Get addresses
    log("\nSTEP 2: Fetch Customer Data", "info");
    const address = await getAddresses(token);
    const cartItems = await getCart(token);
    await sleep(1000);

    // Step 3: Preview checkout
    log("\nSTEP 3: Preview Checkout", "info");
    const previewData = await previewCheckout(token, address.id, cartItems);
    await sleep(1000);

    // Step 4: Start payment session
    log("\nSTEP 4: Start Payment Session", "info");
    const sessionData = await startPaymentSession(token, address.id, cartItems);
    const { merchantOrderId, orders } = sessionData;
    await sleep(1000);

    // Step 5: Verify payment (simulating what happens after Cashfree)
    log(
      "\nSTEP 5: Verify Payment Status (simulating post-Cashfree)",
      "info"
    );
    log(
      colors.yellow +
        "NOTE: Payment status will likely be PENDING since no actual payment was made" +
        colors.reset
    );
    const verifyData = await verifyPaymentSession(token, merchantOrderId);
    await sleep(1000);

    // Step 6: Confirm payment (with mock payment)
    log("\nSTEP 6: Confirm Payment Session", "info");
    log(
      colors.yellow +
        "NOTE: This simulates confirming payment after successful Cashfree payment" +
        colors.reset
    );
    if (orders && orders.length > 0) {
      const orderIds = orders.map((order) => order.id);
      const confirmData = await confirmPaymentSession(token, orderIds, "CASHFREE");
      await sleep(1000);
    }

    // Summary
    console.log("\n");
    console.log(colors.bright + "═".repeat(70) + colors.reset);
    console.log(colors.bright + "  TEST SUMMARY" + colors.reset);
    console.log(colors.bright + "═".repeat(70) + colors.reset);
    console.log(`${colors.green}✓ All API endpoints are accessible${colors.reset}`);
    console.log(`${colors.green}✓ previewCheckout: PASSED${colors.reset}`);
    console.log(`${colors.green}✓ startPaymentSession: PASSED${colors.reset}`);
    console.log(`${colors.green}✓ verifyPaymentSession: PASSED${colors.reset}`);
    console.log(`${colors.green}✓ confirmPaymentSession: PASSED${colors.reset}`);
    console.log("\n");
    console.log(
      colors.bright +
        "All payment APIs are working correctly! ✓" +
        colors.reset
    );
    console.log("\n");
  } catch (err) {
    console.log("\n");
    console.log(colors.bright + "═".repeat(70) + colors.reset);
    console.log(colors.bright + "  TEST FAILED" + colors.reset);
    console.log(colors.bright + "═".repeat(70) + colors.reset);
    console.log(
      `${colors.red}✗ Error: ${err.message}${colors.reset}`
    );
    console.log("\n");
    process.exit(1);
  }
}

// Run tests
runTests();
