"use client"
import { useState, useEffect, useLayoutEffect } from "react"
import PRODUCTS from "../../components/products"
import swal from 'sweetalert';
// import dynamic from "next/dynamic";
// const useRouter = dynamic(() => import("next/router"), { ssr: false });
import {useRouter} from "next/navigation"
const STORE = () => {

    
    const router = useRouter();
    const [form, setForm] = useState({input:""})
    const [products, setProducts] = useState({products : [], offset:null, next:true, loading : false})
    // const [offset, setOffset] = useState(null)
    // const [hasNextPage, setHasNextPage] = useState(true);
    // const [loading, setLoading] = useState(false)


    useLayoutEffect(() => {
        try {

            setProducts({...products, loading : true})

            async function runProducts(){
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/`,{
                    "method" : "POST",
                    "body" : JSON.stringify({
                        limit : 10,
                        offset : products.offset
                    }),
                    headers: {
                        'Content-Type': 'application/json', // Indicates the body is JSON
                      },
                    
                });
        
                const data = await res.json()
                // console.log(data.products)
                setProducts(() => ({...products, products:[...data.products.edges], loading : false}))
                // setOffset(data.products.pageInfo.endCursor); // Update the cursor for the next fetch
                // setHasNextPage(data.products.pageInfo.hasNextPage); // Update the hasNextPage flag
                // setLoading(false)
            } 
            runProducts()
            

          } catch (error) {
            console.log(error);
          }
    },[])


    return (
        <>
            <PRODUCTS products={products} setProducts={setProducts}/>
        </>
    )
}

export default STORE