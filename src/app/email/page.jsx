"use client"
import gsap from "gsap";
import Image from "next/image";
import {email1, email2} from "@/assets/"
import { useState, useEffect } from "react";
import Link from "next/link"

const EMAIL = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        document.title = `EMAIL ARCHIVING - late-developers`;
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
                    <h1 style={{fontSize:"350%",color:"#411342"}}><b>EMAIL ARCHIVING</b></h1>
                </article>
            </div>
            <div className={ windowWidth > 800 ? "relative h-[100%] w-[100%] bg-slate-50" : "relative h-auto w-[100%] bg-slate-50"}>
                <h1 style={{textAlign:"center",fontSize:"200%"}}>Email Archiving</h1>
                <div className={ windowWidth > 800 ? "flex relative left-[10%] w-[80%]" : "flex flex-col w-[100%]"}>
                    <Image src = {email1} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[-1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>

                    <article className={ windowWidth > 800 ? "text-justify m-[1%] w-[50%]" : "text-justify m-[1%] p-[1%] w-[98%]"}>
                        At <i>Late Developers</i>, we offer state-of-the-art email archiving solutions tailored to the needs of Kenyan businesses. Our solutions include:
                        <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                            <li>
                                <b>Cloud-Based Archiving</b>
                                Store your emails securely in the cloud for easy access and scalability.
                                Benefit from automatic backups and disaster recovery.
                            </li>
                            <li>
                                <b>On-Premises Archiving</b>
                                Retain full control over your email data with on-site archiving solutions.
                                Ideal for businesses with strict data sovereignty requirements.
                            </li>
                            <li>
                                <b>Hybrid Archiving</b>
                                Combine the flexibility of cloud storage with the security of on-premises solutions.
                                Perfect for businesses transitioning to cloud systems.
                            </li>
                            <li>
                                <b>Advanced Search Capabilities</b>
                                Powerful search tools to quickly locate emails based on keywords, dates, or specific users.

                            </li>
                            <li>
                                <b>Compliance and Reporting Tools</b>
                                Generate reports to demonstrate compliance with legal and industry regulations.

                            </li>
                        </ol>
                    </article>
                </div>
            </div>
            <div className={ windowWidth > 800 ? "relative flex h-[30%] w-[100%] bg-[#E1F977]" : "relative flex flex-col h-auto w-[100%] bg-[#E1F977]"}>
                <Image src = {email2} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[-1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>
                <article className={ windowWidth > 800 ? "w-[50%] text-justify" : "w-[98%] m-[1%] p-[1%] text-justify"}>
                    <p><b>Get Started with Late Developers</b></p>

                    Ready to take control of your email communication? Contact us today to learn more about our Email Archiving Solutions. Let’s help you build a system that keeps your email data secure, accessible, and fully compliant.

                    <p>Simplify your email management with Late Developers.</p>
                    <Link href="/contact" className="w-[40%] inline-block text-center bg-rose-800 text-white h-[40px]">Request quote</Link>
                </article>
            </div>
        </>
    )
}

export default EMAIL