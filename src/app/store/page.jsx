"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const STORE = () => {

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

    const searchBar = () => {}

    const toMoney = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(num);

        
    }

    return (
        <>
            <div className="w-[100%] h-[40%] flex flex-row">
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
            { console.log(products)}
                {
                    products.map(({body_html, status, image, title, variants, id},index) => 
                    (
                        
                        <div className="w-[18%] m-[1%] cursor-pointer" key={index} id={id}>
                            <Image src = {image.src} alt="late-developers" style={{height:"50%"}} width={image.width} height={image.height} className="w-[100%] object-cover"/>
                           
                            <p>{ title.length > 40 ? `${title.substr(40)}...` : title}</p>
                            <p style={{height:"40px",background:status === "active" ? "#83D475" : "#ba3030",color:"#fff",textAlign:"center"}}>{status === "active" ? "in store" : "sold out"}</p>
                            {/* {console.log(variants.map(({compare_at_price}) => parseFloat(compare_at_price)))} */}
                            <p><b>KSH {variants.length > 1 ? toMoney(Math.max(...variants.map(({compare_at_price}) => parseFloat(compare_at_price)))) : toMoney(variants.map(({compare_at_price}) => parseFloat(compare_at_price))[0])} - KSH {variants.length > 1 ? toMoney(Math.min(...variants.map(({compare_at_price}) => parseFloat(compare_at_price)))) : toMoney(variants.map(({compare_at_price}) => parseFloat(compare_at_price))[0])}</b></p>
                        </div>
                    )
                    )
                }
            </div>
        </>
    )
}

export default STORE