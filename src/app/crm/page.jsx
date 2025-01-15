"use client"
import gsap from "gsap";
import Image from "next/image";
import {crm1, crm2} from "@/assets/"
import { useState, useEffect } from "react";
import Link from "next/link"

const CRM = () => {



    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        document.title = `CRM - late-developers`;
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
                    <h1 style={{fontSize:"350%",color:"#411342"}}><b>CRM</b></h1>
                </article>
            </div>
            <div className={ windowWidth > 800 ? "relative h-[100%] w-[100%] bg-slate-50" : "relative h-auto w-[100%] bg-slate-50"}>
                <h1 style={{textAlign:"center",fontSize:"200%"}}>Customer Relationship Management</h1>
                <div className={ windowWidth > 800 ? "flex relative left-[10%] w-[80%]" : "flex flex-col w-[100%]"}>
                    <Image src = {crm1} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>

                    <article className={ windowWidth > 800 ? "text-justify m-[1%] w-[50%]" : "text-justify m-[1%] p-[1%] w-[98%]"}>
                        CRM, or Customer Relationship Management, is a system that helps businesses manage their interactions with current and potential customers. It centralizes customer information, streamlines processes, and enhances communication, enabling businesses to deliver exceptional customer experiences while driving growth.
                        At <i>Late Developers</i>, we design and implement CRM systems that empower businesses to:
                        <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                            <li><b>Organize Customer Data:</b> Centralized databases to track customer interactions, preferences, and history.
                            </li>
                            <li><b>Streamline Operations:</b> Automate repetitive tasks like follow-ups, invoicing, and customer support tickets.
                            </li>
                            <li><b>Boost Sales Efficiency:</b> Manage leads, track sales pipelines, and analyze sales trends for better decision-making.
                            </li>
                            <li><b>Enhance Customer Engagement:</b> Deliver personalized marketing and communication for improved customer satisfaction.
                            </li>
                            <li><b>Gain Actionable Insights:</b> Use analytics to understand customer behavior and make informed business decisions.
                            </li>
                        </ol>
                    </article>
                </div>
            </div>
            <div className={ windowWidth > 800 ? "relative flex h-[auto] w-[100%] bg-[#E1F977]" : "relative flex flex-col h-auto w-[100%] bg-[#E1F977]"}>
                <Image src = {crm2} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[1%] z-[2] h-[100px] object-contain" : "w-[100%] object-contain"}/>
                <article className={ windowWidth > 800 ? "w-[50%] text-justify" : "w-[98%] m-[1%] p-[1%] text-justify"}>
                    <p style={{fontSize:"150%"}}><b>Get Started Today</b></p>

                    Ready to take your customer relationships to the next level? Contact Late Developers to learn how our CRM solutions can help your business thrive. Together, we’ll build systems that not only manage customer relationships but also create meaningful, lasting connections.

                    <p>Empower your business with CRM. Empower your future.</p>
                    <Link href="/contact" className="w-[40%] inline-block text-center bg-rose-800 text-white h-[40px]">Request quote</Link>
                </article>
            </div>
        </>
    )
}

export default CRM