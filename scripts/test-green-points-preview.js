#!/usr/bin/env node

const BASE_URL = process.env.API_BASE_URL || "https://www.rephyl.com";
const TEST_USER_EMAIL = process.env.TEST_EMAIL || "abcd@gmail.com";
const TEST_USER_PASSWORD = process.env.TEST_PASSWORD || "vbnm12345";
const OVERRIDE_ITEMS_JSON = process.env.PREVIEW_ITEMS_JSON || "";
const OVERRIDE_COUPON_CODES = process.env.PREVIEW_COUPON_CODES || "";
const MANUAL_ITEM_JSON = process.env.MANUAL_PREVIEW_ITEM || "";

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function logResponse(label, response, body) {
  const data = body && typeof body === "object" && "success" in body ? body.data ?? body : body;
  const summary = {
    status: response.status,
    success: body?.success ?? null,
    message: body?.message ?? null,
    subtotal: data?.subtotal ?? null,
    discountAmount: data?.discountAmount ?? null,
    taxTotal: data?.taxTotal ?? null,
    shippingAmount: data?.shippingAmount ?? null,
    grandTotal: data?.grandTotal ?? null,
    greenPointsRedemptionValue: data?.greenPointsRedemptionValue ?? null,
    payableAfterGreenPoints: data?.payableAfterGreenPoints ?? null,
  };

  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(summary, null, 2));

  if (data && response.ok) {
    const missing = ["subtotal", "taxTotal", "shippingAmount", "grandTotal"].filter((key) => data[key] === undefined);
    if (missing.length > 0) {
      console.log(`Missing fields in successful preview response: ${missing.join(", ")}`);
    }
  }
}

async function main() {
  const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: TEST_USER_EMAIL, password: TEST_USER_PASSWORD }),
  });

  const loginBody = await readJson(loginResponse);
  const token = loginBody?.token || loginBody?.data?.token;

  if (!token) {
    console.error("Login failed:", loginResponse.status, JSON.stringify(loginBody, null, 2));
    process.exit(1);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const addressResponse = await fetch(`${BASE_URL}/api/customer-account/addresses`, { headers });
  const addressBody = await readJson(addressResponse);
  const addressList = Array.isArray(addressBody?.data) ? addressBody.data : Array.isArray(addressBody) ? addressBody : [];
  const addressId = addressList[0]?.id || addressList[0]?.addressId;

  if (!addressId) {
    console.error("No delivery address found for the test account.");
    process.exit(1);
  }

  const cartResponse = await fetch(`${BASE_URL}/api/customer-account/cart`, { headers });
  const cartBody = await readJson(cartResponse);
  const cartItems = cartBody?.data?.items || cartBody?.items || [];
  const items = MANUAL_ITEM_JSON
    ? [JSON.parse(MANUAL_ITEM_JSON)]
    : OVERRIDE_ITEMS_JSON
    ? JSON.parse(OVERRIDE_ITEMS_JSON)
    : cartItems
        .map((item) => ({ variantId: item.variantId || item.productVariantId, quantity: item.quantity || 1 }))
        .filter((item) => item.variantId);

  const couponCodes = OVERRIDE_COUPON_CODES
    ? OVERRIDE_COUPON_CODES.split(",").map((code) => code.trim()).filter(Boolean)
    : [];

  if (items.length === 0) {
    console.error("Cart is empty or does not contain valid variant items.");
    process.exit(1);
  }

  const payload = {
    deliveryAddressId: addressId,
    paymentMethod: "CASHFREE",
    items,
    couponCodes: couponCodes.length > 0 ? couponCodes : undefined,
  };

  const previewNoPointsResponse = await fetch(`${BASE_URL}/api/customer-account/orders/payment-session/preview`, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...payload, useGreenPoints: false }),
  });
  const previewNoPointsBody = await readJson(previewNoPointsResponse);

  const previewWithPointsResponse = await fetch(`${BASE_URL}/api/customer-account/orders/payment-session/preview`, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...payload, useGreenPoints: true }),
  });
  const previewWithPointsBody = await readJson(previewWithPointsResponse);

  console.log("Test account:", TEST_USER_EMAIL);
  console.log("Address ID:", addressId);
  console.log("Items:", JSON.stringify(items, null, 2));

  logResponse("Preview without Green Points", previewNoPointsResponse, previewNoPointsBody);
  logResponse("Preview with Green Points", previewWithPointsResponse, previewWithPointsBody);

  if (!previewWithPointsResponse.ok) {
    console.log("Green Points apply was rejected by the backend. The message above is the source of truth for the frontend.");
  }
}

main().catch((error) => {
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});