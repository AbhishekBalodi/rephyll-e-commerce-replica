#!/usr/bin/env node

/**
 * Browser Console Payment API Tester
 * 
 * Copy and paste this entire script into your browser console (F12)
 * while logged in to test the payment APIs
 */

const PaymentAPITester = (() => {
  const colors = {
    reset: "%c",
    green: "%c color: #22c55e; font-weight: bold;",
    red: "%c color: #ef4444; font-weight: bold;",
    yellow: "%c color: #eab308; font-weight: bold;",
    blue: "%c color: #06b6d4; font-weight: bold;",
  };

  function log(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: `[ℹ ${timestamp}]`,
      success: `[✓ ${timestamp}]`,
      error: `[✗ ${timestamp}]`,
      warning: `[⚠ ${timestamp}]`,
    }[type] || `[• ${timestamp}]`;

    const colorKey =
      {
        success: "green",
        error: "red",
        warning: "yellow",
        info: "blue",
      }[type] || "reset";

    console.log(`${colors[colorKey]}${prefix} ${message}${colors.reset}`);
  }

  function formatJson(obj, indent = 2) {
    return JSON.stringify(obj, null, indent);
  }

  // Get auth token from localStorage
  function getToken() {
    const token = localStorage.getItem("rephyl_token");
    if (!token) {
      throw new Error("No auth token found. Please login first.");
    }
    return token;
  }

  // Build headers with auth
  function getHeaders() {
    const token = getToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  const API = {
    // Get current cart
    async getCart() {
      log("Fetching cart...", "info");
      try {
        const res = await fetch("/api/customer-account/cart", {
          headers: getHeaders(),
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const cartData = data.success ? data.data : data;
        log(`✓ Cart loaded: ${cartData.items?.length || 0} items`, "success");
        console.log("Cart data:", cartData);
        return cartData;
      } catch (err) {
        log(`Error: ${err.message}`, "error");
        throw err;
      }
    },

    // Get addresses
    async getAddresses() {
      log("Fetching addresses...", "info");
      try {
        const res = await fetch("/api/customer-account/addresses", {
          headers: getHeaders(),
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const addresses = data.success ? data.data : data;
        log(`✓ Found ${addresses.length} address(es)`, "success");
        console.log("Addresses:", addresses);
        return addresses;
      } catch (err) {
        log(`Error: ${err.message}`, "error");
        throw err;
      }
    },

    // Preview checkout
    async previewCheckout(deliveryAddressId, items) {
      log("Previewing checkout...", "info");
      const payload = { deliveryAddressId, items };
      console.log("Request body:", payload);
      try {
        const res = await fetch(
          "/api/customer-account/orders/payment-session/preview",
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const previewData = data.success ? data.data : data;
        log(
          `✓ Preview complete - Serviceable: ${previewData.serviceable}`,
          "success"
        );
        console.log("Preview data:", previewData);
        return previewData;
      } catch (err) {
        log(`Error: ${err.message}`, "error");
        throw err;
      }
    },

    // Start payment session
    async startPaymentSession(deliveryAddressId, items) {
      log("Starting payment session...", "info");
      const payload = { deliveryAddressId, items };
      console.log("Request body:", payload);
      try {
        const res = await fetch(
          "/api/customer-account/orders/payment-session",
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const sessionData = data.success ? data.data : data;
        log(`✓ Payment session created`, "success");
        log(
          `Merchant Order ID: ${sessionData.merchantOrderId}`,
          "success"
        );
        log(
          `Payment Session ID: ${sessionData.paymentSessionId?.slice(0, 30)}...`,
          "success"
        );
        console.log("Session data:", sessionData);
        return sessionData;
      } catch (err) {
        log(`Error: ${err.message}`, "error");
        throw err;
      }
    },

    // Verify payment
    async verifyPaymentSession(merchantOrderId) {
      log(
        `Verifying payment session (${merchantOrderId})...`,
        "info"
      );
      try {
        const res = await fetch(
          `/api/customer-account/orders/payment-session/${merchantOrderId}/verify`,
          {
            method: "POST",
            headers: getHeaders(),
          }
        );
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const verifyData = data.success ? data.data : data;
        log(
          `✓ Verification complete - Status: ${verifyData.paymentStatus}`,
          "success"
        );
        console.log("Verification data:", verifyData);
        return verifyData;
      } catch (err) {
        log(`Error: ${err.message}`, "error");
        throw err;
      }
    },

    // Confirm payment
    async confirmPaymentSession(orderIds, paymentMethod = "CASHFREE") {
      log("Confirming payment session...", "info");
      const payload = { orderIds, paymentMethod };
      console.log("Request body:", payload);
      try {
        const res = await fetch(
          "/api/customer-account/orders/payment-session/confirm",
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const confirmData = data.success ? data.data : data;
        log(`✓ Payment confirmed successfully`, "success");
        console.log("Confirmation data:", confirmData);
        return confirmData;
      } catch (err) {
        log(`Error: ${err.message}`, "error");
        throw err;
      }
    },
  };

  // Helper to run full flow
  async function runFullPaymentFlow() {
    console.log(
      "%c═══════════════════════════════════════════════════════════\n       PAYMENT API FULL FLOW TEST\n═══════════════════════════════════════════════════════════",
      "font-weight: bold; color: #06b6d4;"
    );

    try {
      // Step 1
      console.log("\n%cSTEP 1: Load Cart", "font-weight: bold; color: #22c55e;");
      const cartData = await API.getCart();
      if (!cartData.items || cartData.items.length === 0) {
        throw new Error("Cart is empty! Please add items first.");
      }
      const items = cartData.items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      // Step 2
      console.log("\n%cSTEP 2: Load Addresses", "font-weight: bold; color: #22c55e;");
      const addresses = await API.getAddresses();
      if (addresses.length === 0) {
        throw new Error("No addresses found! Please add an address first.");
      }
      const addressId = addresses[0].id;
      log(`Using address: ${addresses[0].line1}`, "info");

      // Step 3
      console.log(
        "\n%cSTEP 3: Preview Checkout",
        "font-weight: bold; color: #22c55e;"
      );
      const previewData = await API.previewCheckout(addressId, items);
      if (!previewData.serviceable) {
        throw new Error(
          `Address not serviceable: ${previewData.message}`
        );
      }

      // Step 4
      console.log(
        "\n%cSTEP 4: Start Payment Session",
        "font-weight: bold; color: #22c55e;"
      );
      const sessionData = await API.startPaymentSession(addressId, items);

      // Step 5
      console.log(
        "\n%cSTEP 5: Verify Payment Status",
        "font-weight: bold; color: #22c55e;"
      );
      const verifyData = await API.verifyPaymentSession(
        sessionData.merchantOrderId
      );
      log(
        `Current payment status: ${verifyData.paymentStatus}`,
        "warning"
      );
      log(
        "Note: Status will be PENDING because no actual payment was made",
        "warning"
      );

      // Step 6 (optional)
      console.log(
        "\n%cSTEP 6: Confirm Payment (if PAID)",
        "font-weight: bold; color: #22c55e;"
      );
      if (verifyData.paymentStatus === "PAID" && sessionData.orders) {
        const orderIds = sessionData.orders.map((order) => order.id);
        await API.confirmPaymentSession(orderIds, "CASHFREE");
      } else {
        log(
          "Payment status is not PAID - skipping confirmation",
          "warning"
        );
        log(
          "To test the full flow with actual payment: complete payment in Cashfree modal/page",
          "info"
        );
      }

      // Summary
      console.log(
        "\n%c═══════════════════════════════════════════════════════════",
        "font-weight: bold; color: #22c55e;"
      );
      console.log(
        "%c✓ FULL PAYMENT FLOW TEST COMPLETED",
        "font-weight: bold; color: #22c55e;"
      );
      console.log(
        "%c═══════════════════════════════════════════════════════════",
        "font-weight: bold; color: #22c55e;"
      );
    } catch (err) {
      console.log(
        "\n%c✗ TEST FAILED",
        "font-weight: bold; color: #ef4444;"
      );
      log(err.message, "error");
    }
  }

  // Return public API
  return {
    API,
    test: runFullPaymentFlow,
    log,
  };
})();

// Usage instructions
console.log(
  "%c\n╔════════════════════════════════════════════════════════════╗",
  "font-weight: bold; color: #06b6d4;"
);
console.log(
  "%c║          PAYMENT API TEST SUITE LOADED                     ║",
  "font-weight: bold; color: #06b6d4;"
);
console.log(
  "%c╚════════════════════════════════════════════════════════════╝",
  "font-weight: bold; color: #06b6d4;"
);

console.log(
  "%c\nQUICK START:",
  "font-weight: bold; color: #22c55e;"
);
console.log(
  "%c  Run full payment flow test:",
  "color: #999;"
);
console.log(
  "%c    PaymentAPITester.test()",
  "font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 4px;"
);

console.log(
  "%c\nINDIVIDUAL API TESTS:",
  "font-weight: bold; color: #22c55e;"
);
console.log(
  "%c  Get cart:              PaymentAPITester.API.getCart()",
  "color: #999; font-family: monospace;"
);
console.log(
  "%c  Get addresses:         PaymentAPITester.API.getAddresses()",
  "color: #999; font-family: monospace;"
);
console.log(
  "%c  Preview checkout:      PaymentAPITester.API.previewCheckout(addressId, items)",
  "color: #999; font-family: monospace;"
);
console.log(
  "%c  Start session:         PaymentAPITester.API.startPaymentSession(addressId, items)",
  "color: #999; font-family: monospace;"
);
console.log(
  "%c  Verify payment:        PaymentAPITester.API.verifyPaymentSession(merchantOrderId)",
  "color: #999; font-family: monospace;"
);
console.log(
  "%c  Confirm payment:       PaymentAPITester.API.confirmPaymentSession(orderIds, 'CASHFREE')",
  "color: #999; font-family: monospace;"
);
console.log("\n");
