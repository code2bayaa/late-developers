"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation';
import PRODUCTS from "../../components/products"

const SEARCH = () => {

    
    const [products, setProducts] = useState({products : [], offset:null, next:true, loading : false})
    const searchParams = useSearchParams();
    const query = searchParams.get('query'); 

    
    useEffect(() => {
        try {
            setProducts({...products, loading : true})
            // console.log("query :", query)
            async function runProducts(){
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/${query}`,{
                    cache: "no-store",
                  });

                // console.log(await res.json())
                const data = await res.json()
                setProducts(() => ({...products, products:[...data.products.edges], loading : false}))
            } 

            runProducts()

          } catch (error) {
            console.log(error);
          }
    },[query])

    return (
        <>
            <PRODUCTS products={products} setProducts={setProducts}/>
        </>
    )
}

export default SEARCH
