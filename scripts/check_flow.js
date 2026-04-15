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

    // Add item to cart (variantId 11)
    const addRes = await fetch(`${base}/api/customer-account/cart/items`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ variantId: 11, quantity: 1 }),
    });
    const addJson = await addRes.json().catch(() => ({ status: addRes.status }));
    pretty('ADD TO CART RESPONSE', addJson);

    // Get cart
    const cartRes = await fetch(`${base}/api/customer-account/cart`, { headers });
    const cartJson = await cartRes.json().catch(() => ({ status: cartRes.status }));
    pretty('CART', cartJson);

    // Preview checkout
    const previewRes = await fetch(`${base}/api/customer-account/orders/payment-session/preview`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ deliveryAddressId: null, items: [{ variantId: 11, quantity: 1 }] }),
    });
    const previewJson = await previewRes.json().catch(() => ({ status: previewRes.status }));
    pretty('PREVIEW', previewJson);

  } catch (err) {
    console.error('ERROR:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
