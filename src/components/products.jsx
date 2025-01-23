import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const PRODUCTS = ({products, setProducts}) => {
    
    const [form, setForm] = useState({input:""})
    const toMoney = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(num);

        
    }

    const searchBar = () => {
        e.preventDefault()
        if(!form.input){
            swal("Oops!", "input search data", "error");
            return 
        }
        
        router.push(`/store/search?query=${form.input}`);
    }

    const loadMore = async(e) => {
        try{
            e.preventDefault()
            // setLoading(true)
            setProducts({...products, loading : true})
    
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
    
            const more = await res.json()
            // setOffset(() => more.products.pageInfo.endCursor); // Update the cursor for the next fetch
            // setHasNextPage(() => more.products.pageInfo.hasNextPage); // Update the hasNextPage flag
            // setLoading(() => false)
            setProducts({ 
                products : [...products.products, ...more.products.edges],
                offset : more.products.pageInfo.endCursor,
                next:more.products.pageInfo.hasNextPage,
                loading:false 
            })
            // console.log(products)

        }catch(error){
            console.log(error, error.message)
        }
    }
    

    return (
        <>
            <div className="w-[100%] h-[10%]">
                <div className="w-[60%] bg-[#000] h-[90%] my-[1%]">
                    <form 
                     className="w-[100%] h-[100%] flex flex-row"
                     onSubmit={searchBar}
                     >
                        <input
                         className="w-[80%] bg-[#000] text-white"
                         name="input"
                         required
                         placeholder="SEARCH HERE..."
                         onChange={ e => setForm({...form, [e.target.name] : e.target.value})}
                         />
                         <button
                          type="submit"
                          className="w-[20%] text-white"
                          >
                            <FontAwesomeIcon icon={faSearch}/>
                          </button>
                     </form>
                </div>
            </div>
            <div className="w-[100%] h-auto flex flex-row flex-wrap">
                {
                    products.products.map(({node},index) => 
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
            <div className="w-[100%] grid items-center">
                <button
                    onClick={loadMore}
                    type="button"
                    style={{backgroundImage:"linear-gradient( #900c85bd , #900C3F, #900C3F)"}}
                    className="w-[40%] h-[60px] text-white cursor-pointer"
                    disabled={products.loading}
                >
                    LOAD MORE ({products.products.length})
                </button>
            </div>
        </>

    )
}

export default PRODUCTS