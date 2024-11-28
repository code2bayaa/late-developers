"use client"
import gsap from "gsap";
import Image from "next/image";
import {hr1, hr2} from "@/assets/"
import { useState, useEffect } from "react";
import Link from "next/link"

const HR = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        document.title = `HR - late-developers`;
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
                    <h1 style={{fontSize:"350%",color:"#411342"}}><b>HR & PAYROLL</b></h1>
                </article>
            </div>
            <div className={ windowWidth > 800 ? "relative h-[100%] w-[100%] bg-slate-50" : "relative h-auto w-[100%] bg-slate-50"}>
                <h1 style={{textAlign:"center",fontSize:"200%"}}>Human Resource & Payroll</h1>
                <div className={ windowWidth > 800 ? "flex relative left-[10%] w-[80%]" : "flex flex-col w-[100%]"}>
                    <Image src = {hr1} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[-1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>

                    <article className={ windowWidth > 800 ? "text-justify m-[1%] w-[50%]" : "text-justify m-[1%] p-[1%] w-[98%]"}>
                    Managing HR and payroll processes manually can be time-consuming, error-prone, and costly. A robust digital system not only automates repetitive tasks but also ensures compliance with regulations, minimizes errors, and improves transparency. Businesses that invest in advanced HR and payroll systems are better equipped to focus on strategic growth rather than administrative hurdles.

                        <ol  style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                            <li><b>Customized Systems</b>
                                Our HR and Payroll systems are tailored to meet the unique challenges and opportunities of businesses in Kenya. Whether you're a startup or an established company, we’ll build solutions that fit your scale and goals.
                            </li>
                            <li>
                                <b>User-Friendly Interfaces</b>
                                We prioritize ease of use, ensuring that both HR professionals and employees can navigate our systems effortlessly.
                            </li>
                            <li>
                                <b>Seamless Integration</b>
                                Our systems integrate with existing business tools, such as accounting software and tax systems, for a cohesive experience.
                            </li>
                            <li>
                                <b>Scalability</b>
                                As your business grows, our solutions grow with you, offering the flexibility to adapt to your changing needs.
                            </li>
                            <li>
                                <b>Ongoing Support</b>
                                From implementation to maintenance, we provide continuous support to ensure your systems function smoothly.
                            </li>
                        </ol>
                    </article>
                </div>
            </div>
            <div className={ windowWidth > 800 ? "relative flex h-[30%] w-[100%] bg-[#E1F977]" : "relative flex flex-col h-auto w-[100%] bg-[#E1F977]"}>
                <Image src = {hr2} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[-1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>
                <article className={ windowWidth > 800 ? "w-[50%] text-justify" : "w-[98%] m-[1%] p-[1%] text-justify"}>
                    <p>An ERP system helps unify people, core business processes, and technology across an organization.</p>

                    <p>late developers is there to make your enterprises more efficient by connecting every aspect of your business.</p>
                    <Link href="/contact" className="w-[40%] inline-block text-center bg-rose-800 text-white h-[40px]">Request quote</Link>
                </article>
            </div>
        </>
    )
}

export default HR