Subject: Serviceability false on checkout preview — pincode 560001

Hi team,

While testing the storefront checkout flow I hit a preview response that marks delivery as not serviceable for postal code `560001`.

Steps to reproduce:
1. Login as a test customer (POST /api/auth/login).
2. Create an address with `postalCode: 560001` (POST /api/customer-account/addresses).
3. Add a product variant to cart (POST /api/customer-account/cart/items with `variantId`).
4. Call preview: POST /api/customer-account/orders/payment-session/preview with `deliveryAddressId` and `items`.

Observed result:
- API returns success but `data.serviceable = false` and message: "No serviceable warehouse is configured for pincode 560001." Example preview response shows per-item `serviceable:false` and `stockLabel: "Out of Stock"`.

Request:
- Please verify the warehouse-to-pincode mapping or serviceability rules for `560001`.
- If this pincode should be serviceable for test/demo, please add a default warehouse or mapping so the preview can mark the address as serviceable.
- Alternatively, let me know which pincodes are currently serviceable so I can test with those.

Helpful diagnostics:
- Preview request payload (deliveryAddressId + items) and preview response are available from frontend logs/automation.
- Example message returned by preview: "No serviceable warehouse is configured for pincode 560001.".

Thanks — I can provide request/response logs or run additional tests if helpful.

Regards,
Frontend QA/Developer
