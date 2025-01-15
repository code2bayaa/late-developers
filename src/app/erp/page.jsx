"use client"
import gsap from "gsap";
import Image from "next/image";
import {erp1, erp2} from "@/assets/"
import { useState, useEffect } from "react";
import Link from "next/link"

const ERP = () => {


    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        document.title = `ERP - late-developers`;
      const handleResize = () => setWindowWidth(window.screen.width);
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize width
      gsap.to("#NavBar",{
            backgroundColor:"rgb(203 213 225)",
            color:"#000",
            duration:3
        })

        gsap.to("#logo",{
            backgroundColor:"rgb(203 213 225)",
            color:"#000",
            duration:3,
            delay:1
        })
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            <div className={ windowWidth > 800 ? "relative h-[20%] w-[100%] bg-slate-300" : "relative h-auto w-[100%] bg-slate-300"}>
                <article className="w-[100%] grid justify-items-center">
                    <h1 style={{fontSize:"350%",color:"#411342"}}><b>ERP</b></h1>
                </article>
            </div>
            <div className={ windowWidth > 800 ? "relative h-[100%] w-[100%] bg-slate-50" : "relative h-auto w-[100%] bg-slate-50"}>
                <h1 style={{textAlign:"center",fontSize:"200%"}}>Enterprise Resource Planning </h1>
                <div className={ windowWidth > 800 ? "flex relative left-[10%] w-[80%]" : "flex flex-col w-[100%]"}>
                    <Image src = {erp1} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>

                    <article className={ windowWidth > 800 ? "text-justify m-[1%] w-[50%]" : "text-justify m-[1%] p-[1%] w-[98%]"}>
                        ERP is a software category that assists organizations in managing and automating core business processes for optimum performance. By coordinating the data flow between a company's business processes, ERP software streamlines operations throughout the organization and creates a single source of truth. The functions of the financials, supply chain, operations, business, reporting, manufacturing, and human resources can all be integrated into one platform.
                        

                        Our range of ERP solutions give you access to real-time data, making long-term planning and day-to-day operations more streamlined and efficient.

                        They provide essential insights into your company, including areas for improvement, as well as giving you an overview of your finances and automating accounting tasks.

                        Using ERP software also allows you to improve workforce management by tying all the key areas of your business together in one single system. Connect your core business processes, including inventory and order management, accounting, human resources, and customer relationship management (CRM).

                        Using an ERP allows you to run your entire business from one system.

                    </article>
                </div>
            </div>
            <div className={ windowWidth > 800 ? "relative flex h-[auto] w-[100%] bg-[#E1F977]" : "relative flex flex-col h-auto w-[100%] bg-[#E1F977]"}>
                <Image src = {erp2} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[1%] z-[2] h-[100px] object-contain" : "w-[100%] object-contain"}/>
                <article className={ windowWidth > 800 ? "w-[50%] text-justify" : "w-[98%] m-[1%] p-[1%] text-justify"}>
                    <p>An ERP system helps unify people, core business processes, and technology across an organization.</p>

                    <p>late developers is there to make your enterprises more efficient by connecting every aspect of your business.</p>
                    <Link href="/contact" className="w-[40%] inline-block text-center bg-rose-800 text-white h-[40px]">Request quote</Link>
                </article>
            </div>
        </>
    )
}

export default ERP