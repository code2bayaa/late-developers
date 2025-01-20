// import { Shopify, ApiVersion } from '@shopify/shopify-api';
// // import { ShopifyNode } from '@shopify/shopify-api/adapters/node';
// // import { adapter as nodeAdapter } from '@shopify/shopify-api/adapters/node'; // Import the adapter directly
import '@shopify/shopify-api/adapters/node';
import {shopifyApi, ApiVersion, LATEST_API_VERSION} from '@shopify/shopify-api';
// const shopify = Shopify.Context.initialize({
// //   apiKey: "79119553e64e4a00c39f97fcbf2d9396",
//   API_KEY:"79119553e64e4a00c39f97fcbf2d9396",
//   API_SECRET_KEY:"ff1922d48e616cd9a24972bd09b15bef",
// //   apiSecretKey: "ff1922d48e616cd9a24972bd09b15bef",
// SCOPES:"read_products,write_products"?.split(','), // Permissions for your app
// //   scopes: "read_products,write_products"?.split(','), // Permissions for your app
// //   hostName: "e61uw0-pp.myshopify.com".replace(/https?:\/\//, ''), // Host name without protocol
//   HOST_NAME:"e61uw0-pp.myshopify.com".replace(/https?:\/\//, ''), // Host name without protocol
//   API_VERSION:ApiVersion.April24,
// //   apiVersion: ApiVersion.April24, // Use the API version you need
// //   adapter: nodeAdapter, // Add the Node.js adapter
// });



const shopify = shopifyApi({
  // The next 4 values are typically read from environment variables for added security
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_products'],
  hostName: process.env.HOST_NAME,
  hostScheme: process.env.SCHEME,
  apiVersion: ApiVersion.July22,
  features: {
    lineItemBilling: true, // Enable line item billing flag
    customerAddressDefaultFix: true, // Enable customer address fix flag
    unstable_managedPricingSupport: true, // Enable unstable pricing support
  }
});

export default shopify;