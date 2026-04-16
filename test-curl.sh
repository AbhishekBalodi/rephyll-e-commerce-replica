#!/bin/bash
# Test script for signup API using curl
# This script tests the signup endpoint and shows the exact request/response

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         SIGNUP API TEST - CURL DIRECT TEST                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

API_URL="https://www.rephyl.com/api/customer-auth/signup"

echo "Testing endpoint with curl:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "URL: $API_URL"
echo "Method: POST"
echo "Headers: Content-Type: application/json"
echo ""
echo "Request Body:"
echo "{"
echo '  "name": "Ratan Sharma",'
echo '  "email": "ratan@example.com",'
echo '  "mobile": "9876543210",'
echo '  "password": "Secret@123"'
echo "}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Response:"
echo ""

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ratan Sharma",
    "email": "ratan@example.com",
    "mobile": "9876543210",
    "password": "Secret@123"
  }' \
  -w "\n\nHTTP Status Code: %{http_code}\n" \
  -v 2>&1 | grep -E "^(< HTTP|^{|^"error"|^"success"|"message"|"data"|"loginId"|"personId")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Note: If you see 401 'Session expired' error, this indicates:"
echo "  • Backend has authentication requirement on this endpoint"
echo "  • This contradicts the API spec (Auth: No)"
echo "  • Need to disable auth filter for /api/customer-auth/signup"
echo ""
