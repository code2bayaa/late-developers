"use client"
import { useState, useEffect, useRef } from "react"
import { useSession, signOut } from "next-auth/react";
import swal from 'sweetalert';
import {useRouter} from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlus, faShoppingBasket, faCartShopping, faCoins, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import SOCKETS from "../../models/socket";
import Image from "next/image";
import {load} from "@/assets"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { QUANTITY } from "../../components/quantity";
import { runThemes } from "../../components/themes";

const CHECKOUT = () => {

    const [payment, setPayment] = useState(null)
    const [checkout, setCheckout] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [socket, setSocket] = useState(null)
    const [checkout_array, setCheckout_array] = useState([])
    const [paymentStyle, setPaymentStyle] = useState({mpesa:false,paypal:false})
    // let [quantity, setQuantity] = useState(1)
    const [windowWidth, setWindowWidth] = useState(0);
    const { data:session, status } = useSession();
    const router = useRouter()
    const modalRef = useRef(null);

    if(!session){
        router.push("/users/signin")
    }


    const initialOptions = {

        "client-id":process.env.environment === "development" ? process.env.paypal_sandbox_client: process.env.paypal_live_client,

        // "enable-funding": "venmo",

        "disable-funding": "",

        "buyer-country": "US",

        currency: "USD",

        "data-page-type": "product-details",

        components: "buttons",

        "data-sdk-integration-source": "developer-studio",

    };

    useEffect(() => {
        try {
            runThemes()
            const local_checkout = localStorage.getItem("checkout") ? JSON.parse(localStorage.getItem("checkout")) : []
            if(local_checkout.length === 0){
                router.push("/store")
            }
            setCheckout_array(() => [...local_checkout])
            runThemes()

            async function runItems(){
                console.log(local_checkout)
                const new_checkout = await Promise.all(local_checkout.map( async id => {
                    // console.log(id,"id")
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/Variant`,{
                        // cache: "no-store",
                        method:"POST",
                        body : JSON.stringify({
                            variant:id
                        }),
                        headers: {
                            'Content-Type': 'application/json', // Indicates the body is JSON
                        },
                    });
    
                    const {products, status} = await res.json()
                    console.log(status,"status")
                    if(status)
                        return { id:products.id, image:{src:products.product.images.edges[0].node.src,height:products.product.images.edges[0].node.height,width:products.product.images.edges[0].node.width,altText:products.product.images.edges[0].node.altText}, price:products.price, compareAtPrice: products.compareAtPrice, title:products.product.title, quantity : 1}
                    else
                        return 1
                }))

                console.log(new_checkout)
                if(new_checkout.find(value => value === 1)){
                    console.log("in here..")
                    router.push("/store")
                    return false
                }
                setCheckout(() =>
                    [...new_checkout]
                )
                console.log(checkout)
                if(new_checkout.length > 0){
                    setTotal(
                        new_checkout
                        .map(({price, quantity}) => Number(price) * quantity)
                        .reduce((a,b) => Number(a) + Number(b),[0])
                    )
                }

                console.log(total,"totAL")
            } 

            

            runItems()
            const handleResize = () => setWindowWidth(window.screen.width);
            handleResize()

        } catch (error) {
            console.log(error);
        }
    },[])

    const toMoney = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(num);

        
    }

    const toggleQuantity = (direction,index,quantity_number) => {
        let set_quantity = Number(quantity_number.current.value)
        if(direction && set_quantity > 1){
            set_quantity--
            
        }else if(direction && set_quantity < 2){
            return false
        }else{
            set_quantity++
        }
        quantity_number.current.value = set_quantity

        

        setTotal(
            checkout
            .map(({price, quantity},id) => id === index ? Number(price) * set_quantity : Number(price) * quantity)
            .reduce((a,b) => Number(a) + Number(b),[0])
        )
        setCheckout(() => [...checkout.map((products,id) => {
            if(id === index){
                return {...products, quantity:set_quantity}
            }
            return products
        })])
        
    }
    // const openModal = () => modalRef.current?.showModal();
    // const closeModal = () => modalRef.current?.close();

    const removeItem = async (index, name) => {
        const result = await swal({
            title: 'You are about to remove item ' + name,
            // button: {
            //     text: "Cancel!",
            //     closeModal: true,
            // },
            // showCancelButton: true,
            // confirmButtonText: 'REMOVE',
            // imageUrl: '/remove.svg',
            // imageHeight: 200,
            // confirmButtonColor: '#7FFFD4',
            // cancelButtonColor: '#C70039',
        })

        // result.then(data => console.log(data))
        // console.log(result,"result")
        // return false
        if(!result){
            return false
        }

        checkout.splice(index,1)

        
        setTotal(checkout.map(({price, quantity}) => price * quantity).reduce((a,b) => a + b,[0]))
        setCheckout(() => [...checkout])
        // const checkout_array = localStorage.getItem("checkout") ? JSON.parse(localStorage.getItem("checkout")) : []

        checkout_array.splice(index,1)
        localStorage.setItem("checkout",JSON.stringify(checkout_array))
        swal("removed","success")
    }

    const payCheckout = async(e) => {
        e.preventDefault()
        setLoading(true)
        if(payment === null){
            swal("oops","choose between mpesa or paypal","error")
            setLoading(false)
            return false
        }else if(payment === "mpesa"){
            //open model instructing to pay mpesa updating number in account.
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Payment/Mpesa`,{
                // cache: "no-store",
                method:"POST",
                body : JSON.stringify({
                    total,
                    session:session.user.email
                }),
                headers: {
                    'Content-Type': 'application/json', // Indicates the body is JSON
                },
            });

            const {status, data, message} = await res.json()

            if(!status || data.ResponseCode !== "0"){
                swal("oops",message,"error")
                return false
            }
            //start socket io
            console.log(data)

            //open model to wait for payment success
            modalRef.current?.showModal();

            SOCKETS.connect().then(socket => {
                socket.emit("user", data.MerchantRequestID)
            })

            SOCKETS.on("callback", async data => {
                //check if payment was cancelled
                console.log(data)
                if(data.ResultCode !== 0){
                    swal("oops","payment cancelled " + data.ResultDesc,"error")
                    setLoading(false)
                    modalRef.current?.close()
                    return null
                }
                runPurchase({success:data.ResultDesc,payment:"mpesa",data})
                
            })

            
            
        }else if(payment === "paypal"){
            //open div payment modal to pay via paypal
            //open model to wait for payment success
            modalRef.current?.showModal();
        }
        setLoading(false)
    }

    const runPurchase = async({success,payment,data}) => {
        //insert payment
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Payment`,{
            // cache: "no-store",
            method:"POST",
            body : JSON.stringify({
                data,
                session:session.user.email,
                payment
            }),
            headers: {
                'Content-Type': 'application/json', // Indicates the body is JSON
            },
        });

        const {status} = await res.json()
        console.log(status,"status")
        //payment receipt must be added
        while(!status){
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Payment`,{
                // cache: "no-store",
                method:"POST",
                body : JSON.stringify({
                    data,
                    session:session.user.email,
                    payment
                }),
                headers: {
                    'Content-Type': 'application/json', // Indicates the body is JSON
                },
            }); 
            const {status} = await res.json()
        }

        //add the orders
        const order_response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/Add`,{
            // cache: "no-store",
            method:"POST",
            body : JSON.stringify({
                data : checkout,
                session:session.user.email
            }),
            headers: {
                'Content-Type': 'application/json', // Indicates the body is JSON
            },
        });

        const orders = await order_response.json()
        while(!orders.status){
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/Add`,{
                // cache: "no-store",
                method:"POST",
                body : JSON.stringify({
                    data:checkout,
                    session:session.user.email
                }),
                headers: {
                    'Content-Type': 'application/json', // Indicates the body is JSON
                },
            }); 
            const orders = await res.json()
        }

        setLoading(false)
        setCheckout([])
        localStorage.removeItem("checkout")
        modalRef.current?.close()
        swal("success " + success,"success")
        setTimeout(() => {
            router.push("/users/orders")
        },1000)
    }

    const customPayment = async(payment) => {
        
        if(payment === "mpesa"){
            //check telephone
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Payment/Mpesa/Telephone`,{
                // cache: "no-store",
                method:"POST",
                body : JSON.stringify({
                    session:session.user.email
                }),
                headers: {
                    'Content-Type': 'application/json', // Indicates the body is JSON
                },
            }); 
            const {status, message} = await res.json()

            if(!status){
                swal("oops",message,"error")
                return false
            }
            swal("success" + message)
            //filter match
            setPaymentStyle({mpesa:true, paypal:false})
        }else{
            setPaymentStyle({mpesa:false, paypal:true})
        }
        setPayment(payment)
    }

    return (
        <>
            <div className={windowWidth > 800 ? "w-[100%] h-auto flex flex-row" : "w-[100%] h-auto flex flex-col-reverse flex-wrap"}>
                <div className={windowWidth > 800 ? "w-[20%] h-auto min-h-[100%]" : "w-[100%] h-auto"}>
                    <h2>Thank you for shopping with late developers</h2>
                    <p>All products have 1+ year warranty</p>
                    <p>You can track its progress on your account</p>
                </div>
                <div className={windowWidth > 800 ? "w-[80%] h-[100%]" : "w-[100%] h-auto"}>
                    <div className={windowWidth > 800 ? "w-[100%] h-[80%] overflow-auto" : "w-[100%] h-auto"}>
                        <div className={windowWidth > 800 ? "w-[90%] mx-[5%]" : "w-[100%] h-auto"}>
                            {
                                checkout.map((item,index) => (
                                    <div className="w-[98%] m-[1%] flex flex-row" key={index} style={{background:index%2 ? "#fff":"#FAF3E0"}}>
                                        <div className="w-[23%] m-[1%]">
                                            <Image src = {item?.image.src} alt={item?.image?.altText} height={item?.image?.height} width={item?.image?.width} className="w-[100%] object-contain"/>
                                        </div>
                                        <div className="w-[23%] m-[1%]">
                                            <h2>NAME</h2>
                                            <p>{item?.title.length > 20 ? item?.title.substr(20) + "..." : item?.title}</p>
                                        </div>
                                        <div className="w-[23%] m-[1%]">
                                            <h2>AMOUNT</h2>
                                            <p>KSH {toMoney(Number(item?.price))}</p>
                                        </div>
                                        <div className="w-[23%] m-[1%]">
                                            <h2>QUANTITY</h2>
                                            <QUANTITY quantity={item?.quantity} toggleQuantity={toggleQuantity} index={index}/>
                                        </div>
                                        <div className="w-[23%] m-[1%]">
                                            <button
                                                type="button"
                                                className="w-[100%] h-[40px] bg-[red] text-white"
                                                onClick={() => removeItem(index, item?.title)}
                                            >
                                                <FontAwesomeIcon style={{fontSize:"150%",color:"#fff",textAlign:"center"}} icon={faDeleteLeft}/> REMOVE
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "w-[80%] mx-[10%] h-auto m-[1%] grid justify-items-center text-center" : "w-[100%] h-auto"}>
                        <p>Choose a payment type below</p>
                        <div className="w-[100%] flex flex-row">
                            <button
                                type="button"
                                style={{border:"1px solid #000",background:paymentStyle.mpesa ? "#80ff80":"transparent"}}
                                className="w-[48%] m-[1%] h-[40px] bg-[transparent] text-black"
                                onClick={() => customPayment("mpesa")}
                                
                            >
                                MPESA
                            </button>
                            <button
                                type="button"
                                style={{border:"1px solid #000",background:paymentStyle.paypal ? "#0096FF":"transparent"}}
                                className="w-[48%] m-[1%] h-[40px] bg-[transparent] text-black"
                                onClick={() => customPayment("paypal")}
                            >
                                PAYPAL
                            </button>
                        </div>
                        <p><FontAwesomeIcon style={{fontSize:"150%",color:"#000",textAlign:"center"}} icon={faCoins}/>TOTAL : KSH {toMoney(total)}</p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-[60%] h-[40px] bg-[#000] text-white"
                            onClick={payCheckout}
                        >
                            CHECKOUT
                        </button>
                    </div>
                    <dialog ref={modalRef} className="rounded-lg p-6 bg-white shadow-xl">
                        {
                            payment === "mpesa" ?
                                <>
                                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                                        <h2 className="text-lg font-semibold">MPESA PAYMENT</h2>
                                        <Image src = {load} alt="late developers https://late-developers.com" className="w-[30%] object-contain"/>

                                    </div>
                                    <p className="mb-4">The payment prompt is sent to your phone.</p>
                                    <p className="mb-4">Enter PIN number</p>
                                    <p className="mb-4">Then wait for confirmation</p>
                                    {/* <button
                                        type="button"
                                        className="w-[60%] h-[40px] bg-[#000] text-white"
                                        onClick={() => {
                                            setLoading(false)
                                            modalRef.current?.close()
                                        }}
                                    >
                                        Close
                                    </button> */}
                                </>
                            :
                                <>
                                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                                        <h2 className="text-lg font-semibold">PAYPAL PAYMENT</h2>
                                    </div>
                                    <PayPalScriptProvider options={initialOptions}>

                                        <PayPalButtons

                                            style={{

                                                shape: "pill",

                                                layout: "vertical",

                                                color: "gold",

                                                label: "pay",

                                            }} 

                                            createOrder={async () => {

                                                try {

                                                    const response = await fetch("/api/Payment/Paypal/Orders", {

                                                        method: "POST",

                                                        headers: {

                                                            "Content-Type": "application/json",

                                                        },

                                                        // use the "body" param to optionally pass additional order information

                                                        // like product ids and quantities

                                                        body: JSON.stringify({
                                                            amount:total,
                                                            cart: [

                                                                {

                                                                    id: "YOUR_PRODUCT_ID",

                                                                    quantity: "YOUR_PRODUCT_QUANTITY",

                                                                },

                                                            ],

                                                        }),

                                                    });


                                                    const orderData = await response.json();


                                                    if (orderData.id) {

                                                        return orderData.id;

                                                    } else {

                                                        const errorDetail = orderData?.details?.[0];

                                                        const errorMessage = errorDetail

                                                            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`

                                                            : JSON.stringify(orderData);
                                                        
                                                            swal("oops!", errorMessage, "error")

                                                        // throw new Error(errorMessage);

                                                    }

                                                } catch (error) {

                                                    console.error(error);

                                                    // setMessage(

                                                    //     `Could not initiate PayPal Checkout...${error}`

                                                    // );
                                                    swal("oops!", `Could not initiate PayPal Checkout...${error}`, "error")

                                                }

                                            }} 

                                            onApprove={async (data, actions) => {

                                                try {

                                                    const response = await fetch(`/api/Payment/Paypal/Capture`,

                                                        {

                                                            method: "POST",

                                                            headers: {

                                                                "Content-Type": "application/json",

                                                            },
                                                            body : JSON.stringify({
                                                                id:data.orderID
                                                            })

                                                        }

                                                    );


                                                    const orderData = await response.json();

                                                    // Three cases to handle:

                                                    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

                                                    //   (2) Other non-recoverable errors -> Show a failure message

                                                    //   (3) Successful transaction -> Show confirmation or thank you message


                                                    const errorDetail = orderData?.details?.[0];


                                                    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {

                                                        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

                                                        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/

                                                        return actions.restart();

                                                    } else if (errorDetail) {

                                                        // (2) Other non-recoverable errors -> Show a failure message

                                                        throw new Error(

                                                            `${errorDetail.description} (${orderData.debug_id})`

                                                        );

                                                    } else {

                                                        // (3) Successful transaction -> Show confirmation or thank you message

                                                        // Or go to another URL:  actions.redirect('thank_you.html');

                                                        const transaction =

                                                            orderData.purchase_units[0].payments

                                                                .captures[0];
                                                        
                                                        runPurchase({success:`Transaction ${transaction.status}: ${transaction.id}`,payment:"paypal", data:orderData})

                                                        // setMessage(

                                                        //     `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`

                                                        // );


                                                        // console.log(

                                                        //     "Capture result",

                                                        //     orderData,

                                                        //     JSON.stringify(orderData, null, 2)

                                                        // );

                                                    }

                                                } catch (error) {

                                                    console.error(error);

                                                    // setMessage(

                                                    //     `Sorry, your transaction could not be processed...${error}`

                                                    // );
                                                    swal("oops",`Sorry, your transaction could not be processed...${error.message}`,"error")

                                                }

                                            }} 

                                        />

                                        </PayPalScriptProvider>
                                </>
                            
                        }

                    </dialog>
                </div>
            </div>
        </>
    )
}

export default function CHECKOUTPAGE() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CHECKOUT />
      </Suspense>
    );
  }