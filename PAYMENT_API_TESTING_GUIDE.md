# Payment API Testing Guide

## Overview

This guide explains how to test the payment APIs (previewCheckout, startPaymentSession, verifyPaymentSession, confirmPaymentSession) locally against your deployed backend.

---

## Prerequisites

1. ✅ Frontend running on `http://localhost:8080`
2. ✅ Backend deployed and accessible at `https://www.rephyl.com` (or configured API URL)
3. ✅ Test customer account created with:
   - Email: `testcustomer@gmail.com`
   - Password: `Test@1234`
4. ✅ Test customer has:
   - At least one saved address
   - Items in cart

---

## Testing Methods

### Method 1: Browser Console (Easiest for Quick Testing)

This is the **recommended method** for quick testing while developing.

#### Step 1: Load Test Script
1. Open your app in browser at `http://localhost:8080`
2. Log in with test account
3. Open Browser DevTools: Press `F12`
4. Go to **Console** tab
5. Copy the entire contents of [browser-console-payment-test.js](./browser-console-payment-test.js)
6. Paste into the console
7. Press Enter

#### Step 2: Run Full Flow Test
```javascript
// Run the complete payment flow test
PaymentAPITester.test()
```

This will:
- Load cart
- Load addresses
- Call previewCheckout
- Call startPaymentSession
- Call verifyPaymentSession
- Call confirmPaymentSession (if payment was "PAID")

#### Step 3: Individual API Tests
You can also test individual endpoints:

```javascript
// Get cart
const cart = await PaymentAPITester.API.getCart();
console.log(cart);

// Get addresses
const addresses = await PaymentAPITester.API.getAddresses();
const addressId = addresses[0].id;

// Preview checkout
const preview = await PaymentAPITester.API.previewCheckout(addressId, [
  { variantId: 123, quantity: 1 },
  { variantId: 456, quantity: 2 }
]);

// Start payment session
const session = await PaymentAPITester.API.startPaymentSession(addressId, [
  { variantId: 123, quantity: 1 }
]);

// Verify payment
const verify = await PaymentAPITester.API.verifyPaymentSession(
  session.merchantOrderId
);

// Confirm payment
const confirm = await PaymentAPITester.API.confirmPaymentSession(
  session.orders.map(o => o.id),
  "CASHFREE"
);
```

---

### Method 2: Node.js Test Script

For automated testing from the command line.

#### Step 1: Set Environment Variables
```bash
# On Windows PowerShell
$env:API_BASE_URL = "https://www.rephyl.com"
$env:TEST_EMAIL = "testcustomer@gmail.com"
$env:TEST_PASSWORD = "Test@1234"

# On macOS/Linux
export API_BASE_URL=https://www.rephyl.com
export TEST_EMAIL=testcustomer@gmail.com
export TEST_PASSWORD=Test@1234
```

#### Step 2: Run Test Script
```bash
node test-payment-apis.js
```

#### Step 3: Verify Output
The script will output:
- ✓ Login successful
- ✓ Addresses loaded
- ✓ Cart loaded
- ✓ Preview completed
- ✓ Payment session created
- ✓ Payment verified
- ✓ Payment confirmed

---

## Expected Behavior

### For New Orders (First Time)

**Before Payment Confirmation Flow Fix:**
```
Order Status Flow:
Customer places order
  ↓
Order created in PENDING_PAYMENT status
  ↓
❌ Backend never gets payment confirmation
  ↓
❌ Order stays PENDING_PAYMENT (stuck)
```

**After Payment Confirmation Flow Fix:**
```
Order Status Flow:
Customer places order
  ↓
Order created in PENDING_PAYMENT status
  ↓
✅ Frontend calls confirmPaymentSession
  ↓
✅ Backend receives confirmation
  ↓
✅ Order transitions to CONFIRMED status
  ↓
✅ Fulfillment team can process
```

### Testing Scenarios

#### Scenario 1: Full Flow with Actual Cashfree Payment

1. Go to checkout page
2. Select address → Click "Place Order"
3. Cashfree modal/page opens
4. **Actually complete the payment in Cashfree**
5. Return to site → Should see confirmation page
6. Check backend: Order status should be **CONFIRMED**

#### Scenario 2: Verify Payment Status (No Actual Payment)

1. Use browser console test
2. Call `PaymentAPITester.API.startPaymentSession(...)`
3. Call `PaymentAPITester.API.verifyPaymentSession(...)`
4. Status will show **PENDING** (no payment made)
5. Confirm will **skip** because status is not PAID

#### Scenario 3: Test Confirmation Endpoint Only

```javascript
// Get order IDs from a previous session
const orderIds = [12345, 12346]; // Replace with real order IDs

// Call confirm endpoint directly
const result = await PaymentAPITester.API.confirmPaymentSession(
  orderIds,
  "CASHFREE"
);

// Check result
console.log("Orders after confirmation:", result.orders);
// Should show orders with status: CONFIRMED
```

---

## What to Look For in Responses

### 1. previewCheckout Response
```json
{
  "success": true,
  "data": {
    "serviceable": true,        // ✓ Must be true
    "message": "OK",
    "grandTotal": 1500,
    "items": [...]
  }
}
```

### 2. startPaymentSession Response
```json
{
  "success": true,
  "data": {
    "merchantOrderId": "MO_abc123...",    // ✓ Must exist
    "paymentSessionId": "PS_def456...",   // ✓ Must exist
    "paymentMethod": "CASHFREE",
    "totalAmount": 1500,
    "orders": [
      {
        "id": 12345,                      // ✓ Use for confirmation
        "status": "PENDING_PAYMENT",
        "orderNumber": "SO-123456"
      }
    ]
  }
}
```

### 3. verifyPaymentSession Response
```json
{
  "success": true,
  "data": {
    "paymentStatus": "PENDING",  // or "PAID" if payment was made
    "merchantOrderId": "MO_abc123...",
    "orders": [...]
  }
}
```

### 4. confirmPaymentSession Response
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 12345,
        "status": "CONFIRMED",           // ✓ Changed from PENDING_PAYMENT
        "paymentConfirmedAt": "2026-05-05T12:30:00Z"  // ✓ Timestamp set
      }
    ]
  }
}
```

---

## Common Issues & Solutions

### Issue 1: "No auth token found"
**Cause:** Not logged in
**Solution:** Log in first, then run test

### Issue 2: "Cart is empty"
**Cause:** No items in cart
**Solution:** Add items to cart first

### Issue 3: "No addresses found"
**Cause:** No saved addresses
**Solution:** Create an address in account settings

### Issue 4: "Address not serviceable"
**Cause:** Postal code not in service area
**Solution:** Use a valid postal code in service area

### Issue 5: "CORS error"
**Cause:** API proxy not configured
**Solution:** Check vite.config.ts proxy settings

### Issue 6: "401 Unauthorized"
**Cause:** Token expired or invalid
**Solution:** Log out and log in again

### Issue 7: 404 on confirmPaymentSession
**Cause:** Endpoint doesn't exist on backend
**Solution:** Backend needs to implement the endpoint

---

## Testing Checklist

Use this checklist to verify everything works:

### API Endpoints
- [ ] `POST /api/auth/login` - Can log in
- [ ] `GET /api/customer-account/cart` - Can fetch cart
- [ ] `GET /api/customer-account/addresses` - Can fetch addresses
- [ ] `POST /api/customer-account/orders/payment-session/preview` - Can preview
- [ ] `POST /api/customer-account/orders/payment-session` - Can start session
- [ ] `POST /api/customer-account/orders/payment-session/{id}/verify` - Can verify
- [ ] `POST /api/customer-account/orders/payment-session/confirm` - Can confirm

### Response Formats
- [ ] previewCheckout returns `data` with `serviceable`, `grandTotal`
- [ ] startPaymentSession returns `data` with `merchantOrderId`, `paymentSessionId`, `orders`
- [ ] verifyPaymentSession returns `data` with `paymentStatus`
- [ ] confirmPaymentSession returns `data` with updated `orders`

### Frontend Behavior
- [ ] Checkout page shows address selection
- [ ] Click "Place Order" validates address serviceability
- [ ] Cashfree opens as modal on desktop/iPad
- [ ] Cashfree opens as full page on mobile
- [ ] After payment, confirms with backend
- [ ] Orders transition to CONFIRMED status

### Backend Behavior
- [ ] Orders start in PENDING_PAYMENT status
- [ ] After confirm, orders transition to CONFIRMED
- [ ] paymentConfirmedAt timestamp is set
- [ ] Fulfillment team can see confirmed orders

---

## Performance Expectations

- previewCheckout: < 2 seconds
- startPaymentSession: < 3 seconds
- verifyPaymentSession: < 2 seconds
- confirmPaymentSession: < 2 seconds

If any endpoint takes longer, check backend performance.

---

## Debugging Tips

### Enable Console Logging
In `src/pages/OrderReviewPage.tsx`, you'll see console logs:
```
[FORM] ✓ Validation passed
[CHECKOUT] Starting payment session
[CHECKOUT] Payment verified - Status: PAID
[CHECKOUT] Confirming payment with backend
```

### Check Network Tab
1. Open DevTools → Network tab
2. Filter by "fetch"
3. Click each request to see:
   - Request headers (check Authorization header)
   - Request body (check payload)
   - Response status (should be 200)
   - Response body (check success flag)

### Check Browser Storage
1. DevTools → Application tab
2. Local Storage → `http://localhost:8080`
3. Look for `rephyl_token` (JWT token)

### Check Backend Logs
Monitor your backend logs for:
- Login success
- Payment session creation
- Payment confirmation receipt
- Order status updates

---

## Next Steps After Testing

1. ✅ Verify all endpoints are working
2. ✅ Verify Cashfree modal/page behavior
3. ✅ Verify payment confirmation is sent to backend
4. ✅ Verify orders transition to CONFIRMED status
5. Deploy frontend changes to production
6. Test in production environment
7. Notify fulfillment team about confirmed orders

---

## File References

- Test Script: [test-payment-apis.js](./test-payment-apis.js)
- Browser Console Test: [browser-console-payment-test.js](./browser-console-payment-test.js)
- Implementation: [src/pages/OrderReviewPage.tsx](./src/pages/OrderReviewPage.tsx)
- API Wrapper: [src/services/checkoutApi.ts](./src/services/checkoutApi.ts)

---

## Questions?

Refer to [customer-api.md](./customer-api.md) section 6.4.6 for API documentation.
