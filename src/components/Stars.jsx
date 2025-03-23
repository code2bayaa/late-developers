"use client"

import $ from "jquery";
// import "rateyo/jquery.rateyo.min.css";
// import "rateyo/jquery.rateyo.min.js";
import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

export default async function EDITRATECOMPONENT({id,feedback}){
    const { data:session, status } = useSession();
    const rateRef = useRef(nulll)
    const feedbackRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        $(rateRef.current).rateYo({
            onSet:(rating, rateYoInstance) => {
                editRate(rating)

            },
            starWidth:"20px",
            ratedFill: "#F39C12",
            numStars: 5,
            precision:2
        });
    },[])

    const editRate = async(rating) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/Edit`,{
            // cache: "no-store",
            method:"POST",
            body : JSON.stringify({
                id,
                data:parseFloat(rating),
                session:session.user.email,
                field:"rate"
            }),
            headers: {
                'Content-Type': 'application/json', // Indicates the body is JSON
            },
        });

        const {status} = await res.json()
        if(status){
            swal("success","success")
        }else{
            swal("oops","try again","error")
        }
    }

    const editFeedback = async(e) => {
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/Edit`,{
            // cache: "no-store",
            method:"POST",
            body : JSON.stringify({
                id,
                data:e.target.value,
                session:session.user.email,
                field:"feedback"
            }),
            headers: {
                'Content-Type': 'application/json', // Indicates the body is JSON
            },
        });

        const {status} = await res.json()
        if(status){
            feedbackRef.current.innerText = "updating..."
        }
    }

    return (
        <>
            <div ref={rateRef} style={{width:"100%"}}></div>
            <p ref={feedbackRef}>Edit Feedback</p>
            <textarea
                ref={textRef}
                className="w-[100%] border-[1px]"
                onChange={() => editFeedback()}
                onKeyUp={() => feedbackRef.current.innerText = "Edit Feedback" }
            >
                {feedback}
            </textarea>
        </>
    )
}