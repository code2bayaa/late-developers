"use client"
import gsap from "gsap";
import Image from "next/image";
import {custom1, custom2} from "@/assets/"
import { useState, useEffect } from "react";
import Link from "next/link"

const CUSTOM = () => {


    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        document.title = `CUSTOM - late-developers`;
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
                    <h1 style={{fontSize:"350%",color:"#411342"}}><b>CUSTOM SOLUTIONS</b></h1>
                </article>
            </div>
            <div className={ windowWidth > 800 ? "relative h-[100%] w-[100%] bg-slate-50" : "relative h-auto w-[100%] bg-slate-50"}>
                {/* <h1 style={{textAlign:"center",fontSize:"200%"}}>Enterprise Resource Planning </h1> */}
                <div className={ windowWidth > 800 ? "flex relative left-[10%] w-[80%]" : "flex flex-col w-[100%]"}>
                    <Image src = {custom1} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>

                    <article className={ windowWidth > 800 ? "text-justify m-[1%] w-[50%]" : "text-justify m-[1%] p-[1%] w-[98%]"}>
                    Custom solutions are tailor-made software or systems designed to address the specific requirements of a business or organization. Unlike off-the-shelf products, custom solutions are built from the ground up to integrate seamlessly with existing processes and deliver exceptional performance.
                    <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                        <li>
                            <b>Tailored to Your Needs</b>
                            <p>Our team takes the time to understand your business processes and requirements, delivering solutions that are uniquely suited to your operations.</p>

                        </li>
                        <li>
                            <b>Scalable and Flexible Systems</b>
                            <p>We build solutions that grow with your business, adapting to changing demands and technological advancements.</p>

                        </li>
                        <li>
                            <b>Enhanced Security</b>
                            <p>Data security is at the core of our custom solutions. We implement robust security measures to safeguard your business information.</p>

                        </li>
                        <li>
                            <b>User-Centric Design</b>
                            <p>We prioritize intuitive, user-friendly designs to ensure seamless adoption by your team and customers.</p>

                        </li>
                        <li>
                            <b>Local Expertise, Global Standards</b>
                            <p>As a Kenyan-based company, we understand the local business environment while adhering to global best practices in software development.</p>

                        </li>
                        
                    </ol>

                    </article>
                </div>
            </div>
            <div className={ windowWidth > 800 ? "relative flex h-[auto] w-[100%] bg-[#E1F977]" : "relative flex flex-col h-auto w-[100%] bg-[#E1F977]"}>
                <Image src = {custom2} alt="late-developers" className={windowWidth > 800 ? "w-[50%] p-0 m-[1%] z-[2] h-[150px] object-contain" : "w-[100%] object-contain"}/>
                <article className={ windowWidth > 800 ? "w-[50%] text-justify" : "w-[98%] m-[1%] p-[1%] text-justify"}>
                    <p>At Late Developers, we believe in the power of technology to drive growth and innovation. Our custom solutions are designed to empower businesses, helping them overcome challenges, improve efficiency, and achieve their goals.</p>

                    <p>Ready to build a solution that fits your business like a glove? Contact Late Developers today and let us help you turn your vision into reality.</p>
                    <Link href="/contact" className="w-[40%] inline-block text-center bg-rose-800 text-white h-[40px]">Request quote</Link>
                </article>
            </div>
        </>
    )
}

export default CUSTOM