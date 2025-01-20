import {NextResponse} from "next/server"
import axios from "axios"
// import { Shopify } from '@shopify/shopify-api';
import shopify from './lib/shopify';
// import * as ShopifyApi from '@shopify/shopify-api';
// console.log();
// const SHOPIFY_API_URL = `https://e61uw0-pp.myshopify.com/admin/api/2023-01/products.json`
// const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN

export async function GET(request){

    try{

        // return NextResponse.json({products : await shopify}, { status: 200 });

        // const session = await shopify.auth.getSession("https://e61uw0-pp.myshopify.com");

        //WORKS --- MAUTAMU
        // // Make the API request to Shopify's Products API
        const response = await axios.get(`https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_API_SECRET}@${process.env.SHOPIFY_URL}/admin/api/2023-01/products.json`, {
          headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN, // Using the session access token
          },
        });
    
        return NextResponse.json({ products: response.data.products }, { status: 200 });

        // return NextResponse.json({
        //     data : Object.keys(ShopifyApi)
        // })

            // Ensure the Shopify API client is properly initialized
    // const session = await shopify.auth.validateAuthenticatedSession(request);
    
    // if (!session) {
    //   return res.status(401).json({ error: 'Not authenticated' });
    // }
    //     const products = await shopify.rest.Product.all({ limit: 10 }); // You can modify the limit as needed

            // const client = new shopify.Clients.Rest("e61uw0-pp",process.env.SHOPIFY_ADMIN_TOKEN);
            // const products = await client.get({ path: 'products' });
        
            // return NextResponse.json(products, { status: 200 });

        // const queryString = `{
        //     products (first: 3) {
        //       edges {
        //         node {
        //           id
        //           title
        //         }
        //       }
        //     }
        //   }`

        // const client = new shopify.clients.Graphql({session});
        // const response = await client.query({data: queryString});
    
        // return NextResponse.json({ data : response.data}, { status: 200 })

    //   const response = await axios.get(SHOPIFY_API_URL, {
    //     headers: {
    //       "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
    //       "Content-Type": "application/json",
    //     },
    //   });
    
    //   return NextResponse.json({ data : response.data}, { status: 200 })

    // const response = await axios.post("http://localhost:3000/api/Products",{"test":1},{headers:{"Content-Type": "application/json"}})

    // return NextResponse.json({"response" : response.data})
    }catch(error){
        console.log(error)
        return NextResponse.json({ error : error.message}, { status: 500 })
    }

    
}

export async function POST(req){
    return NextResponse.json({
        "Hey" : "You"
    })
}