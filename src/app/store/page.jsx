"use client"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import PRODUCTS from "../../components/products"
import swal from 'sweetalert';
// import dynamic from "next/dynamic";
// const useRouter = dynamic(() => import("next/router"), { ssr: false });
import {useRouter} from "next/navigation"
const STORE = () => {

    
    const router = useRouter();
    const [form, setForm] = useState({input:""})
    const [products, setProducts] = useState([])
    

    useEffect(() => {
        try {
            async function runProducts(){
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/`);

                // console.log(await res.json())
                const { products } = await res.json()
                setProducts(products)
            } 

            runProducts()

          } catch (error) {
            console.log(error);
          }
    },[])

    const searchBar = async(e) => {
        e.preventDefault()
        if(!form.input){
            swal("Oops!", "input search data", "error");
            return 
        }
        
        router.push(`/store/search?query=${form.input}`);
        // window.location.assign(`${process.env.NEXT_PUBLIC_API_URL}/store/search?id=${form.input}`)
    }


    return (
        <>
            <div className="w-[100%] h-[10%]">
                <div className="w-[60%]">
                    <form 
                     className="w-[100%] h-[40px] flex flex-row"
                     onSubmit={searchBar}
                     >
                        <input
                         className="w-[80%]"
                         name="input"
                         required
                         placeholder="SEARCH HERE..."
                         onChange={ e => setForm({...form, [e.target.name] : e.target.value})}
                         />
                         <button
                          type="submit"
                          className="w-[40%]"
                          >
                            <FontAwesomeIcon icon={faSearch}/>
                          </button>
                     </form>
                </div>
            </div>
            <PRODUCTS products={products}/>
        </>
    )
}

export default STORE