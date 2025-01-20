
import shopify from './../lib/shopify';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const query = new URL(request.url).searchParams;
    const shop = query.get('shop');
    const code = query.get('code');

    if (!shop || !code) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const session = await shopify.Auth.validateAuthCallback(
      request,
      {
        shop,
        callbackPath: '/api/shopify-auth/callback',
      },
      code,
    );

    console.log('Authenticated Session:', session);
    return NextResponse.json({ message: 'App successfully installed' }, { status: 200 });
  } catch (error) {
    console.error('Shopify Callback Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}