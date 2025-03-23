"use client"

import $ from "jquery";
// import "rateyo/jquery.rateyo.min.css";
// import "rateyo/jquery.rateyo.min.js";
import { useEffect, useRef } from "react";

export default async function RATECOMPONENT({rate}){

    const rateRef = useRef(nulll)

    useEffect(() => {
        $(rateRef.current).rateYo({
            rating: Number(rate),
            readOnly: true,
            starWidth:"20px",
            ratedFill: "#F39C12",
            numStars: 5,
            precision:2
        });
    },[rate])

    return (
        <>
            <div ref={rateRef} style={{width:"100%"}}></div>
        </>
    )
}