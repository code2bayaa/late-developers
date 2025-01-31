"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation';
import Image from "next/image"
import { useSession, signOut } from "next-auth/react";
import swal from 'sweetalert';
import {useRouter} from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlus, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";

const ITEM = () => {

    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [item, setItem] = useState({})
    const [variant, setVariant] = useState(null)
    let [quantity, setQuantity] = useState(1)
    const [windowWidth, setWindowWidth] = useState(0);
    const { data:session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        try {
            async function runItem(){
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/Item`,{
                    // cache: "no-store",
                    method:"POST",
                    body : JSON.stringify({
                        item:query
                    }),
                    headers: {
                        'Content-Type': 'application/json', // Indicates the body is JSON
                    },
                });

                const {products} = await res.json()
                console.log(products)
                setItem(() => ({...products}))
            } 

            runItem()
            const handleResize = () => setWindowWidth(window.screen.width);
            handleResize()

        } catch (error) {
            console.log(error);
        }
    },[query])

    const toMoney = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(num);

        
    }

    const buyItem = async(id, price) => {
        console.log("session",session)
        setVariant(id)
        swal("selected","price selected :" + price,"success")
    }

    const AddToCart = async() => {
        try{
            if(!variant){
                swal("oops!","choose a price tag from above","error")
                return null
            }
            if(!session){
                const login = await swal({
                    title: "LogIn",
                    text: "You are required to login before checkout",
                    icon: "warning",
                    // dangerMode: true,
                  });
                   console.log(login)
                  if (login) {
                    // swal("Deleted!", "Your imaginary file has been deleted!", "success");
                    router.push("/users/signin")
                  }
            }else{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Checkout/`,{
                    // cache: "no-store",
                    method:"POST",
                    body : JSON.stringify({
                        id:variant,
                        quantity
                    }),
                    headers: {
                        'Content-Type': 'application/json', // Indicates the body is JSON
                    },
                });
            }
        }catch(error){

        }
    }

    const toggleQuantity = (direction) => {
        if(direction && quantity > 1){
            quantity--
        }else{
            quantity++
        }
        setQuantity(quantity)
    }

    return (
        <>
        {/* {console.log(item.variants)} */}
            <div className={windowWidth > 800 ? "w-[100%] h-auto flex flex-row" : "w-[100%] h-auto flex flex-column"}>
                <div className={windowWidth > 800 ? "w-[60%] h-auto" : "w-[100%] h-auto"}>
                    <div className="w-[100%]">
                        <h1 style={{textAlign:"center",color:"#000",fontSize:"200%"}}>{item.title}</h1>
                    </div>
                    <div className="w-[100%] flex flex-row">
                        {
                            item.variants?.edges?.map(({node},index) => (
                                <button
                                onClick={() => buyItem(node.id, `KSH ${toMoney(node.price)}`)}
                                className="w-[40%] min-h-[60px] m-[1%]"
                                style={{borderRadius:"2px",border:"2px solid #ccc"}}
                                key={index}
                                >
                                    <h2>{node.title}</h2>
                                    <p style={{fontSize:"70%",textDecoration:"line-through"}}>KSH {toMoney(node.compareAtPrice)}</p>
                                    <p>KSH {toMoney(node.price)}</p>
                                </button>
                            ))
                        }
                    </div>
                    <div id="item-content" className="w-[100%]" style={{display:"flex",flexDirection:"column",flexWrap:"wrap",height:"300px",overflow:"auto"}}>
                        {
                            item?.images?.edges.map(({node},index,self) => 
                            (
                                <div className="m-[1%] w-[30%]"  key={index}>
                                    <Image src = {node.src} alt={node.altText} width={node.width} height={node.height} className="w-[100%] h-[250px] object-conatin"/>
                                </div>

                            )
                            )
                        }
                    </div>
                    <div className="w-[100%] items-center grid">
                        <h2 style={{textAlign:"center"}}>Quantity</h2>
                        <div className="w-[80%] flex flex-wrap flex-row">
                            <button
                                type="button"
                                className="w-[30%] h-[40px] rounded-md bg-[#411342] m-[1%]"
                                onClick={() => toggleQuantity(1)}
                                >
                                <FontAwesomeIcon style={{fontSize:"150%",color:"#fff",textAlign:"center"}} icon={faMinusCircle}/>
                            </button>
                            <input
                                type="number"
                                // ref={quantityRef}
                                value={quantity}
                                className="w-[20%] h-[60px] border border-[#ccc] text-center"
                                readOnly/>
                            <button
                                type="button"
                                className="w-[30%] h-[40px] rounded-md bg-[#411342] m-[1%]"
                                onClick={() => toggleQuantity(0)}
                                >
                                <FontAwesomeIcon style={{fontSize:"150%",color:"#fff",textAlign:"center"}} icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                    <div className="w-[100%]">
                        <button
                            type="button"
                            className="w-[80%] h-[60px] rounded-md  bg-[linear-gradient(#411342,rgba(0,0,0,0.76),rgba(0,0,0,0.65))] m-[1%] text-white"
                            onClick={() => AddToCart()}
                            >
                            <strong>Add To Cart</strong><FontAwesomeIcon style={{fontSize:"200%",color:"#fff",textAlign:"center"}} icon={faShoppingBasket}/>
                        </button>  
                    </div>
                </div>
                <div className={windowWidth > 800 ? "w-[40%] bg-[linear-gradient(#000,rgba(0,0,0,0.56),rgba(0,0,0,0.45))] text-white" : "w-[100%] bg-[linear-gradient(#000,rgba(0,0,0,0.56),rgba(0,0,0,0.45))] text-white"}>
                    
                    <article>
                        <h1>Product Features</h1>
                        {item.description ? 
                            <ul>
                                {item.description.split(".").map((words,index) => <li key={index}>{words}</li>)}
                            </ul>
                            :
                            ""
                        }

                    </article>
                </div>
            </div>
        </>
    )
}

export default function ITEMPAGE() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ITEM />
      </Suspense>
    );
  }