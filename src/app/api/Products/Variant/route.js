import {NextResponse} from "next/server"
import axios from "axios"
import shopify from '../lib/shopify';


export async function GET(request, { params }){


    
}

export async function POST(request){
    
    try{

        const body = await request.json();
        const { variant } = body

        const query = `
            query ($id: ID!) {
            node(id: $id) {
                ... on ProductVariant {
                id
                title
                price
                compareAtPrice
                sku
                product {
                    id
                    title
                    description
                    variants(first: 10) {
                    edges {
                        node {
                        id
                        title
                        price
                        compareAtPrice
                        sku
                        metafield(namespace: "custom", key: "wholesale_price") {
                            value
                        }
                        }
                    }
                    }
                    images(first: 5) {
                    edges {
                        node {
                        src
                        altText
                        height
                        width
                        }
                    }
                    }
                }
                }
            }
            }
        `;
    
        const variables = {
            id : variant, // Pass the product ID as a variable
        };

        const response = await axios.post(`https://${process.env.SHOPIFY_URL}/admin/api/2023-01/graphql.json`,
        { query, variables },
         {
          headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN, // Using the session access token
            'Content-Type': 'application/json',
          },
        });
    
        return NextResponse.json({ products: response.data.data.node, status:true }, { status: 200 });

    }catch(error){
        console.log(error)
        return NextResponse.json({ error : error.message, status:false}, { status: 500 })
    }
}