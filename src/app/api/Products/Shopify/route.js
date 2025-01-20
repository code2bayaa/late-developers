import shopify from './../lib/shopify';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const query = new URL(request.url).searchParams;
    const shop = query.get('shop');

    if (!shop) {
      return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 });
    }

    // Generate the Shopify app installation URL
    const authRoute = await shopify.Auth.beginAuth(
      request,
      {
        shop,
        callbackPath: '/api/Products/Callback',
        isOnline: false,
      },
      process.env.SHOPIFY_API_KEY,
      process.env.SHOPIFY_SCOPES,
    );

    return NextResponse.redirect(authRoute);
  } catch (error) {
    console.error('Shopify Auth Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}