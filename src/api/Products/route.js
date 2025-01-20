import {NextResponse} from "next/server"
import axios from "axios"


const SHOPIFY_API_URL = `https://${process.env.SHOP}.myshopify.com/admin/api/2023-01/products.json`
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN

export async function GET(){

    try{
        const query = `
        {
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                description
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      price
                    }
                  }
                }
              }
            }
          }
        }
      `;
    
      const response = await axios.post(SHOPIFY_API_URL, { query }, {
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      });
    
      return NextResponse.json({ data : response.data.data.products.edges.map(edge => edge.node)}, { status: 200 })
    }catch(error){
        console.log(error)
        return NextResponse.json({ error : error.message}, { status: 500 })
    }

    
}