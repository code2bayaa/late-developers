
"use client"
import {logo3} from "@/assets/index.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import { useEffect, useState  } from "react"

import Link from "next/link"
const FOOTER = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.screen.width);
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize width
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-[100%] text-[#747474] bg-black">
            <section className="w-[100%] flex flex-row flex-wrap">
                <div style={{borderLeft:"1px solid #fff"}} className = {windowWidth > 800 ? "w-[23%] m-[1%]" : "w-[48%] m-[1%]"}>
                    <h2>Address</h2>
                    <p>P.O. BOX 908452 - 80100, Mombasa</p>
                    <p>Shell building Tom Mboya Rd</p>
                    
                </div>
                <div style={{borderLeft:"1px solid #fff"}} className={windowWidth > 800 ? "w-[23%] m-[1%]" : "w-[48%] m-[1%]"}>
                    <h2>Contacts</h2>
                    <p>+254717323852</p>
                    <p>info@late-developers.com</p>

                </div>
                <div style={{borderLeft:"1px solid #fff"}} className={windowWidth > 800 ? "w-[23%] m-[1%]" : "w-[48%] m-[1%]"}>
                    <h2>Quick Links</h2>
                        <div className='w-[100%] flex flex-col'>
                            <Link
                                href="/about"
                                className="theme-color-six links"

                            >
                                <FontAwesomeIcon icon={faArrowRightLong}/> SOLUTIONS
                            </Link>
                            <Link
                                href="/projects"
                                className="theme-color-six links"

                            >
                                <FontAwesomeIcon icon={faArrowRightLong}/> PROJECTS
                            </Link>
                            <Link
                                href="/gallery"
                                className="theme-color-six links"

                            >
                                <FontAwesomeIcon icon={faArrowRightLong}/> SCHOOL
                            </Link>
                        </div>

                    <div className="w-[100%] flex flex-row">
                        <a href = "https://x.com/late-developers" className="w-[18%] m-[1%]" target = "_blank" >
                            <FontAwesomeIcon style={{fontSize:"150%"}} icon={faTwitter}/>
                        </a>
                        <a href = "https://www.facebook.com/share/H3rp5RarRfLnTCkt/?mibextid=qi2Omg" className="w-[18%] m-[1%]" target = "_blank" >
                            <FontAwesomeIcon style={{fontSize:"150%"}} icon={faFacebook}/>
                        </a>
                        <a href = "https://www.youtube.com/channel/UCGNOPsGsy07--f884Cy3WBw" className="w-[18%] m-[1%]" target = "_blank" >
                            <FontAwesomeIcon style={{fontSize:"150%"}} icon={faYoutube}/>
                        </a>
                        <a href = "https://www.linkedin.com/in/late-developer/" className="w-[18%] m-[1%]" target = "_blank" >
                            <FontAwesomeIcon style={{fontSize:"150%"}} icon={faLinkedin}/>
                        </a>
                        <a href = "https://www.instagram.com/late-developers/" className="w-[18%] m-[1%]" target = "_blank" >
                            <FontAwesomeIcon style={{fontSize:"150%"}} icon={faInstagram}/>
                        </a>
                    </div>
                </div>
                <div className={windowWidth > 800 ? "w-[23%] m-[1%]" : "w-[48%] m-[1%]"} style={{background:"#fff"}}>
                    <div style={{background:"#fff",width:"98%",height:"65%",margin:"1%"}}> 
                        <Link
                            href="/home"
                        >
                            <Image src = {logo3} alt="late-developers" style={{height:"200px"}} className="w-[100%] object-contain"/>
                        </Link>
                        <span style={{color:"#000",textAlign:"justify",width:"90%",margin:"2%",display:"inline-block"}}>
                            inspire problem-solving, critical thinking, and creativity—skills that are indispensable in the 21st century.
                        </span>                                   
                    </div> 
                </div>
            </section>
            <div style={(windowWidth > 800) ? {textAlign:"right"}:{}} className="w-[100%]">
                <article className="w-50%]">
                    © 2024 late developers Kenya. All Rights Reserved.
                </article>
                <div className="w-[40%]">
                    <Link
                        href="/privacy"
                        className="privacy"
                    >
                        Privacy Statement
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default FOOTER