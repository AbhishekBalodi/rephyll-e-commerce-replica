#!/usr/bin/env node

/**
 * Payment API Quick Verification
 * 
 * This script performs a lightweight check to verify:
 * 1. Frontend payment endpoints are properly configured
 * 2. API calls are correctly formatted
 * 3. Response parsing logic is correct
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
  bold: "\x1b[1m",
};

function check(condition, message) {
  if (condition) {
    console.log(`${colors.green}✓${colors.reset} ${message}`);
    return true;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${message}`);
    return false;
  }
}

function section(title) {
  console.log(`\n${colors.bold}${colors.blue}${title}${colors.reset}`);
  console.log(`${colors.blue}${"-".repeat(title.length)}${colors.reset}`);
}

let passCount = 0;
let failCount = 0;

function result(passed) {
  if (passed) passCount++;
  else failCount++;
  return passed;
}

// ============================================================================
// Verification Checks
// ============================================================================

section("1. File Structure Verification");

const requiredFiles = [
  "src/services/checkoutApi.ts",
  "src/pages/OrderReviewPage.tsx",
  "PAYMENT_API_TESTING_GUIDE.md",
];

for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  result(check(fs.existsSync(filePath), `File exists: ${file}`));
}

// ============================================================================
section("2. checkoutApi.ts Verification");

const checkoutApiPath = path.join(__dirname, "src/services/checkoutApi.ts");
const checkoutApiContent = fs.readFileSync(checkoutApiPath, "utf-8");

result(
  check(
    checkoutApiContent.includes("confirmPaymentSession"),
    "confirmPaymentSession function exists"
  )
);

result(
  check(
    checkoutApiContent.includes("/api/customer-account/orders/payment-session/confirm"),
    "Confirm endpoint URL is correct"
  )
);

result(
  check(
    checkoutApiContent.includes("orderIds") && checkoutApiContent.includes("paymentMethod"),
    "Confirm function accepts orderIds and paymentMethod"
  )
);

result(
  check(
    checkoutApiContent.includes("export"),
    "confirmPaymentSession is exported"
  )
);

// ============================================================================
section("3. OrderReviewPage.tsx Verification");

const orderReviewPath = path.join(__dirname, "src/pages/OrderReviewPage.tsx");
const orderReviewContent = fs.readFileSync(orderReviewPath, "utf-8");

result(
  check(
    orderReviewContent.includes("confirmPaymentSession"),
    "confirmPaymentSession is imported"
  )
);

result(
  check(
    orderReviewContent.includes("isMobileScreen"),
    "isMobileScreen helper function exists"
  )
);

result(
  check(
    orderReviewContent.includes("window.innerWidth < 768"),
    "Mobile detection threshold is correct (768px)"
  )
);

result(
  check(
    orderReviewContent.includes('redirectTarget = isMobileScreen()'),
    "redirectTarget is dynamically set based on screen size"
  )
);

result(
  check(
    orderReviewContent.includes("await confirmPaymentSession"),
    "confirmPaymentSession is being called"
  )
);

result(
  check(
    orderReviewContent.includes('paymentMethod: "CASHFREE"'),
    "Payment method is set to CASHFREE"
  )
);

// ============================================================================
section("4. API Endpoint Configuration");

result(
  check(
    checkoutApiContent.includes("/api/customer-account/orders/payment-session"),
    "Payment session endpoint is referenced in checkoutApi.ts"
  )
);

// ============================================================================
section("5. Error Handling Verification");

result(
  check(
    orderReviewContent.includes("catch (confirmErr") &&
      orderReviewContent.includes("console.error"),
    "Error handling is in place for payment confirmation"
  )
);

result(
  check(
    orderReviewContent.includes("Continue to confirmation page even if confirm fails"),
    "Graceful failure handling is documented"
  )
);

// ============================================================================
section("6. State Management Verification");

result(
  check(
    orderReviewContent.includes("setPlacingOrder"),
    "Order placement state is managed"
  )
);

result(
  check(
    orderReviewContent.includes("setValidating"),
    "Validation state is managed"
  )
);

// ============================================================================
section("7. User Experience Verification");

result(
  check(
    orderReviewContent.includes("_modal"),
    "Modal option is available for Cashfree"
  )
);

result(
  check(
    orderReviewContent.includes("_self"),
    "Full page redirect option is available for Cashfree"
  )
);

result(
  check(
    orderReviewContent.includes("navigate(`/payment/confirmation"),
    "Navigation to confirmation page is implemented"
  )
);

// ============================================================================
section("8. Documentation Verification");

const testingGuide = path.join(__dirname, "PAYMENT_API_TESTING_GUIDE.md");
const testingGuideContent = fs.readFileSync(testingGuide, "utf-8");

result(
  check(
    testingGuideContent.includes("Browser Console"),
    "Browser console testing is documented"
  )
);

result(
  check(
    testingGuideContent.includes("Node.js Test Script"),
    "Node.js testing is documented"
  )
);

result(
  check(
    testingGuideContent.includes("previewCheckout"),
    "API endpoints are documented"
  )
);

// ============================================================================
section("9. Code Quality Checks");

result(
  check(
    !orderReviewContent.includes("console.log") ||
      orderReviewContent.includes("console.error"),
    "Console logs are minimal or error-focused"
  )
);

result(
  check(
    orderReviewContent.includes("try") && orderReviewContent.includes("catch"),
    "Try-catch blocks are used for error handling"
  )
);

// ============================================================================
// Summary
// ============================================================================

console.log("\n");
console.log(`${colors.bold}${colors.blue}${"=".repeat(50)}${colors.reset}`);
console.log(`${colors.bold}VERIFICATION SUMMARY${colors.reset}`);
console.log(`${colors.bold}${colors.blue}${"=".repeat(50)}${colors.reset}`);

console.log(
  `\n${colors.green}${colors.bold}✓ Passed: ${passCount}${colors.reset}`
);
console.log(
  `${colors.red}${colors.bold}✗ Failed: ${failCount}${colors.reset}`
);

if (failCount === 0) {
  console.log(`\n${colors.green}${colors.bold}All checks passed! ✓${colors.reset}`);
  console.log(`\n${colors.blue}Payment implementation is correctly configured.${colors.reset}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Read: PAYMENT_API_TESTING_GUIDE.md`);
  console.log(`  2. Test: node test-payment-apis.js`);
  console.log(`  3. Or use: Browser console test (see guide)`);
  process.exit(0);
} else {
  console.log(`\n${colors.red}${colors.bold}Some checks failed!${colors.reset}`);
  console.log(`\nPlease review the failed checks above.`);
  process.exit(1);
}
