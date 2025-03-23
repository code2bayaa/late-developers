"use client"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import swal from "sweetalert"
import { useLayoutEffect, useEffect, useState, useRef } from "react";
import { users, avatar, logistics } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faReceipt } from "@fortawesome/free-solid-svg-icons";
import RATECOMPONENT from "../../../components/Rate"
import EDITRATECOMPONENT from "../../../components/Stars";
import { runThemes } from "../../../components/themes";

export default function ORDERS() {
  const { data:session, status } = useSession();
  const [windowWidth, setWindowWidth] = useState(0)
  const [orders, setOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [active, setActive] = useState({one:true,two:false,three:false})
  const router = useRouter()
  const modalRef = useRef(null)

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if(session == null || !session.hasOwnProperty("user")){
    router.push("/users/signin")
    return null
  }

  useEffect(() => {
    setWindowWidth(() => window.screen.width)
    async function runOrders(){
      const response = await fetch("/api/Orders",{
        method: "POST",
        body:JSON.stringify({
          session:session?.user?.email
        }),
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
      });
      let {orders_array} = await response.json()
      setAllOrders(() => [...orders_array])
      setOrders(() => orders_array.filter(({status}) => status === 1))
    }
    runOrders()
    runThemes()

  },[])

  const customSignOut = async() => {
    try {
      const response = await fetch("/api/SignOut", {
        method: "POST",
        body:JSON.stringify({
          id:session?.user?.id
        }),
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
      });
  
      if (!response.ok) {
        // throw new Error("Failed to update logout status in the database");
        swal("Oops!", "Something went wrong!", "error");
        return null;
      }
  
      
      // Call NextAuth's signOut function after updating the database
      await signOut({ callbackUrl: "/users/signin"});
      // router.push("/users/signin")
      
    } catch (error) {
      console.error("Error during sign-out:", error);
      swal("Oops!", error.message, "error");
    }
  }

  const showOrders = n => {
    setOrders(allOrders.filter(({status}) => status === n))
    Object.keys(active).map((a,index) => {
        if(index === n - 1){
            active[a] = true
        }else{
            active[a] = false
        }
    })
    setActive(() => ({...active}))
  }

  const showTrack = tracks => {
    swal(`
        <div className="w-[100%] flex flex-col">
            ${JSON.parse(tracks).map((track,index) => 
                <div className="w-[100%] flex flex-row" style={{background:index%2 ? "#ccc" : "#fff"}}>
                    <div className="w-[30%] m-[1%]">
                        <h2>ID</h2>
                        <p>{track.id}</p>
                    </div>
                    <div className="w-[30%] m-[1%]">
                        <h2>TIME</h2>
                        <p>{track.time}</p>
                    </div>
                    <div className="w-[30%] m-[1%]">
                        <h2>CHECKPOINT</h2>
                        <p>{track.location}</p>
                    </div>
                </div>
            )}
        </div>`
            
    )
  }

  return (
    <div className={windowWidth > 800 ? "w-[100%] h-[100%] flex flex-row" : "w-[100%] h-[100%] flex flex-col-reverse"}>
      <div className="w-[20%] h-[100%] item-center">
        <h1 className="w-[100%]">Welcome, {session?.user?.name}</h1>
        <Image src = {users} alt="late-developers" className="w-[40%] p-0 m-[1%] z-[2] object-contain"/>
        <button onClick={() => customSignOut()} className="underline w-[100%] h-[40px] text-left">SIGN OUT</button>
        <Link href="/users/dashboard" className="w-[100%] text-left underline">PROFILE</Link>
        <h2 className="w-[100%] h-[40px] bg-[#FAF9F6]">ORDERS</h2>
      </div>
      <div className="w-[80%] h-[100%] bg-[#FAF9F6]">
        <h2 style={{textAlign:"center",color:"#0047AB",fontSize:"200%"}} className="underline">ORDERS</h2>
        <div className=" flex flex-row w-[80%] mx-[10%]">
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <button
             className="w-[100%] h-[40px]"
             style={active.one ? {background:"#FAF9F6"} : {background:"#000",color:"#fff"}}
             onClick={() => showOrders(1)}
            >
                <FontAwesomeIcon icon={faBasketShopping}/> ACTIVE LISTING
             </button>
          </div>
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <button
             className="w-[100%] h-[40px]"
             style={active.two ? {background:"#FAF9F6"} : {background:"#000",color:"#fff"}}
             onClick={() => showOrders(2)}
            >
                <FontAwesomeIcon icon={faBasketShopping}/> FINISHED LISTING
             </button>
          </div>
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <button
             className="w-[100%] h-[40px]"
             style={active.three ? {background:"#FAF9F6"} : {background:"#000",color:"#fff"}}
             onClick={() => showOrders(3)}
            >
                <FontAwesomeIcon icon={faBasketShopping}/> CANCELED LISTING
             </button>
          </div>
        </div>
        <div className=" flex flex-col w-[98%] m-[1%]">
            {
                !orders.length ?
                    <>
                        <h1>NO ITEMS IN THE CART</h1>
                        <Image src = {logistics} alt="late-developers" className="w-[80%] object-cover"/>                        
                    </>

                :
                    orders.map((order,index) => 
                        <div className=" flex flex-row w-[100%]" style={{background:index%2 ? "#ccc" : "#fff"}}>
                            <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
                                <h2>NAME</h2>
                                <p>{order.name}</p>
                            </div>
                            <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
                                <h2>AMOUNT</h2>
                                <p>{order.amount}</p>
                            </div>
                            <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
                                <h2>DATE</h2>
                                <p>{order.date}</p>
                            </div>
                            <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
                                <h2>TRACK</h2>
                                <button
                                    className="w-[80%] h-[40px]"
                                    onClick={() => showTrack(order.track)}
                                >
                                    <FontAwesomeIcon icon={faReceipt}/> SHOW LOG
                                </button>
                            </div>
                            <div className="">
                              <RATECOMPONENT rate={order.rate} />
                              <button
                                  className="w-[80%] h-[40px]"
                                  onClick={() => modalRef.current?.showModal() }
                              >
                                EDIT FEEDBACK
                              </button>
                              <dialog ref={modalRef} className="rounded-lg p-6 bg-white shadow-xl">
                                <div className="w-[100%]">
                                  <EDITRATECOMPONENT id={order.id} feedback={order.feedback}/>

                                </div>
                              </dialog>
                            </div>
                        </div>
                    )
            }

        </div>

      </div>
    </div>
  );
}