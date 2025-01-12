"use client"
import gsap from "gsap";
import Image from "next/image";
import {hr1, hr2, website7, background1} from "@/assets/"
import { useState, useEffect } from "react";
import Link from "next/link"
import SWIPER from "../../components/swiper";
import {websites} from "@/components/constants.jsx"
import swal from 'sweetalert';

const WEBSITE = () => {

    const [windowWidth, setWindowWidth] = useState(0);
    const [bodyPage, setBodyPage] = useState(null)
    const [form,setForm] = useState({email:""})

    useEffect(() => {
        document.title = `WEB DEVELOPMENT - late-developers`;
      const handleResize = () => setWindowWidth(window.screen.width);
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize width
      gsap.to("#NavBar",{
            backgroundColor:"#000",
            color:"#fff",
            duration:3
        })

        gsap.to("#logo",{
            backgroundColor:"#000",
            color:"#fff",
            duration:3,
            delay:1
        })
  

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const newBody = websites.map(({image,article}) => (
        <div className={ windowWidth > 800 ? "w-[100%] h-[100%] flex flex-row" : "w-[100%] h-[100%] flex flex-col" }>
            <div className={ windowWidth > 800 ? "w-[50%] h-[100%]" : "w-[100%] h-[auto]" }>
                <Image src = {image} alt="late-developers" style={{height:windowWidth ? "100%" : "450px"}} className={windowWidth > 800 ? "w-[100%] p-0 m-[-1%] z-[2] h-[100%] object-cover" : "w-[100%] object-cover"}/>
            </div>
            <div className={ windowWidth > 800 ? "w-[50%] h-[100%] text-white bg-black grid item-center" : "w-[100%] h-[auto]" }>
                {article}
            </div>
        </div>
    ))
    
    const sendQuote = async(e) => {

        
        try {
            e.preventDefault()

            if(!form.email){
                swal("Oops!", "input your email", "error");
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Email/`, {
              cache: "no-store",
              method: 'POST', // HTTP method
              headers: {
                'Content-Type': 'application/json', // Indicates the body is JSON
              },
              body: JSON.stringify({
                RECEIVER: "latedevelopers@hotmail.com",
                SUBJECT: 'CREATE WEBSITE',
                MSG:`<div style='width:100%'><div style='width:80%;margin-left:10%;'><h1>WEBSITE CREATION</h1><p>Create an email to ${form.email}</p><p>Enquire about type of website creation</p></div></div>`
              }), // Convert the data object to JSON
            });
            if (!res.ok) {
                swal("Oops!", "Failed to fetch topic!", "error");
              throw new Error("Failed to fetch topic");
            }
        
            // return res.json();
            swal("success!");
          } catch (error) {
            swal("Oops!", error.message, "error");
            console.log(error);
          }
    }


    return (
        <>
            <div className={ windowWidth > 800 ? "relative h-[20%] w-[100%] bg-black" : "relative h-auto w-[100%] bg-black"}>
                <article className="w-[100%] grid justify-items-center">
                    <h1 style={{fontSize:"350%",color:"#fff"}}><b>WEB DESIGN & DEVELOPMENT</b></h1>
                </article>
            </div>
            <div className={ windowWidth > 800 ? "relative h-[70%] w-[100%] bg-black" : "relative h-auto w-[100%] bg-black"}>
                <div className={ windowWidth > 800 ? "flex relative left-[10%] w-[80%]" : "flex flex-col w-[100%]"}>
                    {SWIPER({bodyPage:newBody,setting:{

                    }})}
                </div>
            </div>
            <div style={{backgroundAttachment:"url(" + background1 + ")"}} className={ windowWidth > 800 ? "bg-fixed relative flex h-[100%] w-[100%]" : "relative flex flex-col bg-fixed h-auto w-[100%]"}>
                <Image src = {website7} alt="late-developers" className={windowWidth > 800 ? "w-[50%] m-[1%] h-[100%] object-contain border-b-indigo-500/50" : "w-[100%] object-contain"}/>
                <article className={ windowWidth > 800 ? "w-[48%] grid justify-center justify-items-center h-[30%] my-[10%]" : "w-[98%] m-[1%] p-[1%] text-justify"}>
                    <h1 style={{fontSize:"250%",color:"#fff"}} className="w-[100%] bg-gradient-to-r from-purple-500 to-pink-500">RESPONSIVE WEBSITES</h1>
                    <h1 style={{fontSize:"250%",color:"#fff"}} className="w-[100%] bg-gradient-to-r from-purple-500 to-pink-500">SEO PROVISION</h1>
                    <h1 style={{fontSize:"250%",color:"#fff"}} className="w-[100%] bg-gradient-to-r from-purple-500 to-pink-500">PERSONALIZED THEMES</h1>
                    <form 
                        id="quote-submit"
                        onSubmit={sendQuote}
                        className="w-[100%] b-[1px]"
                    >
                        <input
                         id="input-email"
                         className="w-[100%] h-[60px] b-[1px] m-[1%]"
                         placeholder="INPUT EMAIL"
                         name="email"
                        //  value={form.email}
                         onChange={ e => setForm({...form, [e.target.name]:e.target.value})}
                         />
                        <button
                            type="submit"
                            className="w-[100%] h-[40px] bg-[#000]"
                            style={{color:"#fff",fontSize:"150%"}}
                        >
                            GET QUOTE
                        </button>
                    </form>

                </article>
            </div>
        </>
    )
}

export default WEBSITE