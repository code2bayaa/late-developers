import { useRef, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlus, faShoppingBasket, faCartShopping, faCoins, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export function QUANTITY({quantity,index,toggleQuantity}){

    const [windowWidth, setWindowWidth] = useState(0)
    const quantity_number = useRef(null)
    useEffect(() => {
        setWindowWidth(() => window.screen.width)
    },[])



    return (
        <>
            <div className="w-[100%] flex flex-wrap flex-row">
                <button
                    type="button"
                    className={windowWidth > 800 ? "w-[30%] h-[40px] bg-[#411342] m-[1%]" : "w-[38%] h-[40px] rounded-md bg-[#411342] m-[1%]"}
                    onClick={() => toggleQuantity(1,index,quantity_number)}
                >
                    <FontAwesomeIcon style={{fontSize:"150%",color:"#fff",textAlign:"center"}} icon={faMinusCircle}/>
                </button>
                <input
                    // type="number"
                    ref={quantity_number}
                    // id={"calculator" + index}
                    value={quantity}
                    className="w-[20%] h-[40px] border border-[#ccc] text-center"
                    readOnly/>
                <button
                    type="button"
                    className={windowWidth > 800 ? "w-[30%] h-[40px] bg-[#411342] m-[1%]" : "w-[38%] h-[40px] rounded-md bg-[#411342] m-[1%]"}
                    onClick={() => toggleQuantity(0,index,quantity_number)}
                    >
                    <FontAwesomeIcon style={{fontSize:"150%",color:"#fff",textAlign:"center"}} icon={faPlus}/>
                </button>
            </div>
        </>
    )
}