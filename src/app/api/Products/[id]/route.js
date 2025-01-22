import {NextResponse} from "next/server"
import axios from "axios"
import shopify from './../lib/shopify';


export async function GET(request, { params }){

    try{

        const { id } = await params;

        const query = `
            query ($query: String) {
                products(first: 10, query: $query) {
                    edges {
                    node {
                        id
                        title
                        description
                        status
                        images(first: 1) {
                            edges {
                                node {
                                src
                                width
                                height
                                }
                            }
                        }
                        variants(first: 1) {
                        edges {
                            node {
                            id
                            price
                            compareAtPrice
                            }
                        }
                        }
                    }
                    }
                }
            }
        `;

        const variables = {
            query: `${id}, status:active`
          };

        const response = await axios.post(`https://${process.env.SHOPIFY_URL}/admin/api/2023-01/graphql.json`,
        { query, variables },
         {
          headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN, // Using the session access token
            'Content-Type': 'application/json',
          },
        });
    
        return NextResponse.json({ products: response.data.data.products.edges }, { status: 200 });
        // return NextResponse.json({products : response.data }, {status : 200})

    }catch(error){
        console.log(error)
        return NextResponse.json({ error : error.message}, { status: 500 })
    }

    
}
