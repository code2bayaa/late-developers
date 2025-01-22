"use client"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useSearchParams } from 'next/navigation';
import Image from "next/image"

const SEARCH = () => {

    const [form, setForm] = useState({input:""})
    const [products, setProducts] = useState([])
    const searchParams = useSearchParams();
    const query = searchParams.get('query'); 

    
    useEffect(() => {
        try {
            
            console.log("query :", query)
            async function runProducts(){
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/${query}`,{
                    cache: "no-store",
                  });

                // console.log(await res.json())
                const { products } = await res.json()
                setProducts(products)
            } 

            runProducts()

          } catch (error) {
            console.log(error);
          }
    },[query])

    const searchBar = () => {
        e.preventDefault()
        if(!form.input){
            swal("Oops!", "input search data", "error");
            return 
        }
        
        router.push(`/store/search?query=${form.input}`);
    }

    const toMoney = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(num);

        
    }

    return (
        <>
            <div className="w-[100%] h-[10%] flex flex-row">
                <div className="w-[60%]">
                    <form 
                     className="w-[100%] h-[40px]"
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
            <div className="w-[100%] h-auto flex flex-row flex-wrap">
                {console.log(products)}
                {
                    products.map(({node},index) => 
                    (
                        
                        <div className="w-[18%] m-[1%] cursor-pointer" key={index} id={node.id}>
                            <Image src = {node.images.edges[0].node.src} alt={node.title} style={{height:"50%"}} width={node.images.edges[0].node.width} height={node.images.edges[0].node.height} className="w-[100%] object-cover"/>
                        
                            <p>{ node.title.length > 40 ? `${node.title.substr(40)}...` : node.title}</p>
                            <p style={{height:"40px",background:node.status === "ACTIVE" ? "#83D475" : "#ba3030",color:"#fff",textAlign:"center"}}>{node.status === "ACTIVE" ? "in store" : "sold out"}</p>
                            {/* {console.log(node.variants.edges.map(({price}) => parseFloat(price)))} */}
                            <p><b>KSH {node.variants.edges.length > 1 ? toMoney(Math.max(...node.variants.edges.map(({node}) => parseFloat(node.price)))) : toMoney(node.variants.edges.map(({node}) => parseFloat(node.price))[0])} - KSH {node.variants.edges.length > 1 ? toMoney(Math.min(...node.variants.edges.map(({node}) => parseFloat(node.price)))) : toMoney(node.variants.edges.map(({node}) => parseFloat(node.price))[0])}</b></p>
                        </div>
                    )
                    )
                }
            </div>
        </>
    )
}

export default SEARCH
