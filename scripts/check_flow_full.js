(async () => {
  const base = 'https://www.rephyl.com';
  const email = 'testcustomer@gmail.com';
  const pwd = 'Test@1234';

  function pretty(label, obj) {
    console.log('\n=== ' + label + ' ===');
    try { console.log(JSON.stringify(obj, null, 2)); } catch (e) { console.log(obj); }
  }

  try {
    // Login
    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password: pwd }),
    });
    const loginJson = await loginRes.json();
    pretty('LOGIN RESPONSE', loginJson);

    const token = loginJson.token ?? (loginJson.data && loginJson.data.token) ?? null;
    if (!token) {
      console.error('\nNo token returned. Cannot proceed with authenticated steps.');
      process.exit(1);
    }
    console.log('\nTOKEN (truncated):', token.slice(0, 30) + '...');

    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

    // Create an address
    const addrBody = { addressType: 'HOME', contactName: 'Test Customer', mobile: '9999999999', line1: '12 Test St', city: 'Testville', postalCode: '560001', countryId: 1 };
    const addrRes = await fetch(`${base}/api/customer-account/addresses`, { method: 'POST', headers, body: JSON.stringify(addrBody) });
    const addrJson = await addrRes.json().catch(()=>({ status: addrRes.status }));
    pretty('CREATE ADDRESS', addrJson);
    const addressId = addrJson.data?.id ?? addrJson.id ?? null;

    // Fetch product detail to get variantId for product id 11
    const prodRes = await fetch(`${base}/api/customer/products/11` , { headers });
    const prodJson = await prodRes.json().catch(()=>({ status: prodRes.status }));
    pretty('PRODUCT DETAIL', prodJson);
    const variantId = prodJson.data?.variants?.[0]?.id ?? prodJson.variants?.[0]?.id ?? null;

    // Add item to cart using resolved variantId
    const addBody = { variantId: variantId || 11, quantity: 1 };
    const addRes = await fetch(`${base}/api/customer-account/cart/items`, { method: 'POST', headers, body: JSON.stringify(addBody) });
    const addJson = await addRes.json().catch(()=>({ status: addRes.status }));
    pretty('ADD TO CART', addJson);

    // Get cart
    const cartRes = await fetch(`${base}/api/customer-account/cart`, { headers });
    const cartJson = await cartRes.json().catch(()=>({ status: cartRes.status }));
    pretty('CART', cartJson);

    // Preview checkout using created address id
    const previewBody = { deliveryAddressId: addressId || null, items: [{ variantId: variantId || 11, quantity: 1 }] };
    const previewRes = await fetch(`${base}/api/customer-account/orders/payment-session/preview`, { method: 'POST', headers, body: JSON.stringify(previewBody) });
    const previewJson = await previewRes.json().catch(()=>({ status: previewRes.status }));
    pretty('PREVIEW', previewJson);

  } catch (err) {
    console.error('ERROR:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
