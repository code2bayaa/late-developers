"use client"
import gsap from "gsap";
import Image from "next/image";
import {edrms1, edrms2} from "@/assets/"
import { useState, useEffect } from "react";
import Link from "next/link"

const EDRMS = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {

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

        document.title = `EDRMS - late-developers`;
      const handleResize = () => setWindowWidth(window.screen.width);
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize width
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            <div className={ windowWidth > 800 ? "relative h-[20%] w-[100%] bg-slate-300" : "relative h-auto w-[100%] bg-slate-300"}>
                <article className="w-[100%] grid justify-items-center">
                    <h1 style={{fontSize:"350%",color:"#411342"}}><b>EDRMS</b></h1>
                </article>
            </div>
            <div className={ windowWidth > 800 ? "relative h-[100%] w-[100%] bg-slate-50" : "relative h-auto w-[100%] bg-slate-50"}>
                <h1 style={{textAlign:"center",fontSize:"200%"}}>Electronic Document & Record Management System</h1>
                <div className={ windowWidth > 800 ? "flex relative left-[10%] w-[80%]" : "flex flex-col w-[100%]"}>
                    <Image src = {edrms1} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[-1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>

                    <article className={ windowWidth > 800 ? "text-justify m-[1%] w-[50%]" : "text-justify m-[1%] p-[1%] w-[98%]"}>
                    An Electronic Document and Records Management System (EDRMS) is a digital platform that enables businesses to capture, store, organize, and retrieve documents and records electronically. It provides a centralized system for managing the entire lifecycle of documents—from creation and storage to archiving and disposal—while ensuring compliance with legal and regulatory standards.
                    <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                        <li>
                            <b>Enhanced Efficiency</b>
                            Digitizing document management eliminates time spent searching for files or managing physical storage, improving overall productivity.

                        </li>
                        <li>
                            <b>Data Security and Backup</b>
                            EDRMS protects sensitive information with encryption, access controls, and automatic backups, ensuring data integrity and confidentiality.

                        </li>
                        <li>
                            <b>Regulatory Compliance</b>
                            Many industries require businesses to maintain detailed records for compliance. EDRMS ensures records are securely stored and easily retrievable for audits or legal needs.

                        </li>
                        <li>
                            <b>Cost Savings</b>
                            Reducing the reliance on paper, storage space, and manual labor translates to significant cost savings over time.

                        </li>
                        <li>
                            <b>Sustainability</b>
                            A digital document management system reduces paper usage, supporting environmentally friendly business practices.

                        </li>
                    </ol>
                
                    </article>
                </div>
            </div>
            <div className={ windowWidth > 800 ? "relative flex h-[30%] w-[100%] bg-[#E1F977]" : "relative flex flex-col h-auto w-[100%] bg-[#E1F977]"}>
                <Image src = {edrms2} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%] p-0 m-[-1%] z-[2] h-[250px] object-contain" : "w-[100%] object-contain"}/>
                <article className={ windowWidth > 800 ? "w-[50%] text-justify" : "w-[98%] m-[1%] p-[1%] text-justify"}>
                    <p><b>Get Started Today</b></p>
                    <p>Ready to revolutionize how your business manages documents and records? Contact Late Developers today to learn more about our EDRMS solutions. Let us help you build a smarter, more efficient workplace.</p>

                    <Link href="/contact" className="w-[40%] inline-block text-center bg-rose-800 text-white h-[40px]">Request quote</Link>
                </article>
            </div>
        </>
    )
}

export default EDRMS