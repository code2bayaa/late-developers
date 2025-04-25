"use client"
import Image from "next/image"
import { logo2, logo3, contact } from "../assets"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHome, faChevronUp, faBars, faBarsStaggered, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { useState,useRef, useEffect } from "react"
import $ from "jquery"

// const GSAP = dynamic(() => import("gsap"), { ssr: false });
import gsap from "gsap";
const NavBar = () => {

    const [windowWidth, setWindowWidth] = useState(0);
    const [imageData, setImageData] = useState(1)
    const logoFrame = useRef(null)
    const logoWall = useRef(null)
    const navBar = useRef(null)
    useEffect(() => {
        
      const handleResize = () => setWindowWidth(window.screen.width);
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize width

  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [btnChange, setBtnChange] = useState({
        "introductions" : false,
        "services" : false,
        "shop" : false,
        "activities" : false,
        "school" : false
    })

    
    const introductionsHeader = useRef(null)
    const servicesHeader = useRef(null)
    const projectsHeader = useRef(null)
    const shopHeader = useRef(null)
    const activitiesHeader = useRef(null)
    const schoolHeader = useRef(null)
    const mobileHeader = useRef(null)

    const removeNavBar = () => {
        if(windowWidth < 800){
            setBtnChange({ ...btnChange, mobile : false })
            
                mobileHeader.current.attributes["clicked"].value = 1 

            
            // document.querySelector("#NavBar").style.display = "none"
            gsap.to(navBar.current,{
                opacity:0,
                duration:1,
                x:"-10%"
            })
        }
    }

    const mobile = () => {


        const event = mobileHeader.current.attributes["clicked"].value

        if(event === "1"){
            setBtnChange({ ...btnChange, mobile : true })
            mobileHeader.current.attributes["clicked"].value = 0
            document.querySelector("#NavBar").style.display = "block"
            gsap.fromTo("#NavBar",{x:"40%",opacity:0},{
                opacity:1,
                duration:2,
                x:"0%"
            })
        }else{
            setBtnChange({ ...btnChange, mobile : false })
            mobileHeader.current.attributes["clicked"].value = 1 
            document.querySelector("#NavBar").style.display = "none"
            gsap.to("#NavBar",{
                opacity:0,
                duration:2,
                delay:1,
                x:"-10%"
            })
        }
    }

    const openHeader = (prop) => {
        let props = null
        if(prop === 1){
            props = introductionsHeader
        }else if(prop === 2){
            props = servicesHeader
        }else if(prop === 3){
            props = projectsHeader
        }else if(prop === 4){
            props = shopHeader
        }else if(prop === 5){
            props = activitiesHeader
        }else if(prop === 6){
            props = schoolHeader
        }

        const event = props.current.attributes["clicked"].value
        const page = props.current.attributes["page"].value
        const btn = props.current.attributes["btn"].value

        if(event === "1"){
            setBtnChange({ ...btnChange, [btn] : true })
            props.current.attributes["clicked"].value = 0
            document.querySelector(page).classList.add("flex")
            $(page).slideDown("slow")
        }else{
            setBtnChange({ ...btnChange, [btn] : false })
            props.current.attributes["clicked"].value = 1 
            document.querySelector(page).classList.remove("flex")
            $(page).slideUp("slow")   
        }
    }

    return (
        <>
        {
            (windowWidth > 800 )
            ?
            ""
            :
            <div className="fixed z-[20] " style={{width:"100%",backgroundColor:"linear-gradient(rgba(0,0,0,0.57),rgba(0,0,0,0.75),rgba(0,0,0,0.84)"}}>
                <button className = "btn-mobile w-[20%] bg-[#000] text-white" ref={mobileHeader} onClick={mobile} clicked = "1">
                    {
                        btnChange.mobile ? 
                            <FontAwesomeIcon icon={faBarsStaggered} />
                            :
                                <FontAwesomeIcon icon={faBars} />
                    }
                    
                </button>
            </div>
        }
            <div ref={navBar} id="NavBar" style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}} className={windowWidth > 800 ? "w-[100%] min-h-[15%] flex text-white" : "w-[100%] min-h-[100%] flex flex-col fixed text-white z-[10] top-[-1%] hidden"}>
                <div id = "logo" ref={logoWall} className={windowWidth > 800 ? "w-[30%] bg-white" :"w-[100%] bg-white"}>
                    {
                        imageData === 1 ?
                            <Image id="imageFrame" src = {logo2} ref={logoFrame} alt="late-developers" className="w-[100%] p-0 m-[1%] z-[2] object-contain"/>

                        :
                            <Image src = {logo3} ref={logoFrame} alt="late-developers" className="w-[100%] p-0 h-[150px] z-[2] object-cover"/>

                        
                    }

                </div>
                <div className={windowWidth > 800 ? "w-[70%] flex flex-wrap" : "w-[100%] flex flex-col"}>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "w-[100%]"}>
                        <div className="w-[100%]">
                            <Link href="/" className="w-[100%] cursor"  onClick={removeNavBar} style={{width:"100%",display:"block"}}>
                                <FontAwesomeIcon icon={faHome}/> <span>Home</span>
                            </Link>
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <div className={windowWidth > 800 ? "h-[25%]" : "h-[40px]"}> 
                             
                            <button className = {windowWidth > 800 ? "w-[100%]" : "flex flex-row-reverse h-[100%]"} ref={introductionsHeader} onClick={() => openHeader(1)} btn = "introductions" clicked = "1" page="#introductions-header">
                                <span>Solutions</span> {
                                    btnChange.introductions ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "introductions-header" className="w-[100%] hidden" style={{fontSize:"90%"}}>
                            <Link href="/erp"  style={{width:"100%",display:"block"}} className="h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>erp</Link>
                            <Link href="/crm"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>crm</Link>
                            <Link href="/hr"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>hr & payroll</Link>
                            <Link href="/email"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>email archiving</Link>
                            <Link href="/edrms"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>electronic document and records management system</Link>
                            <Link href="/customs"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>custom solutions</Link>
                            
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <div className={windowWidth > 800 ? "h-[25%]" : "h-[40px]"}> 
                             
                            <button className = {windowWidth > 800 ? "w-[100%]" : "flex flex-row-reverse h-[100%]"} ref={servicesHeader} onClick={() => openHeader(2)} btn = "services" clicked = "1" page="#services-header">
                                <span>Services</span> {
                                    btnChange.services ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "services-header" className="w-[100%] hidden">
                            <Link href="/website"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>website development</Link>
                            <Link href="/mobile"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>mobile application development</Link>
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <div className={windowWidth > 800 ? "h-[25%]" : "h-[40px]"}>
                            
                            <button className = {windowWidth > 800 ? "w-[100%]" : "flex flex-row-reverse h-[100%]"} ref={projectsHeader} onClick={() => openHeader(3)} btn = "projects" clicked = "1" page="#projects-header">
                                <span>Projects</span> {
                                    btnChange.projects ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id="projects-header" className="w-[100%] hidden">
                            <Link href="/uko"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>UKO</Link>
                            <Link href="/drones"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Raid Drones</Link>
                            <Link href="/doors"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Thinking Doors</Link>  
                            <Link href="/arcade"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Arcades</Link>  
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <div className={windowWidth > 800 ? "h-[25%]" : "h-[40px]"}>
                            
                            <button className = {windowWidth > 800 ? "w-[100%]" : "flex flex-row-reverse h-[100%]"} ref={shopHeader} onClick={() => openHeader(4)} btn = "shop" clicked = "1" page="#shop-header">
                                <span>Shop</span> {
                                    btnChange.shop ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "shop-header" className="w-[100%] hidden">
                            <Link href="/store"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Store</Link>
                            <Link href="/checkout"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Checkout</Link> 
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <div className={windowWidth > 800 ? "h-[25%]" : "h-[40px]"}>
                            
                            <button className = {windowWidth > 800 ? "w-[100%]" : "flex flex-row-reverse h-[100%]"} ref={activitiesHeader} onClick={() => openHeader(5)} btn = "activities" clicked = "1" page="#activities-header">
                                <span>Activities</span> {
                                    btnChange.activities ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "activities-header" className="w-[100%] hidden">
                            <Link href="/feedback"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Feedback</Link>
                            <Link href="/contact"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Contact Us</Link> 
                            <Link href="/newsletter"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Newsletter</Link>
                            <Link href="/blogs"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Blogs</Link> 
                            <Link href="/social"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Social Media</Link>
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <div className={windowWidth > 800 ? "h-[25%]" : "h-[40px]"}>
                            
                            <button className = {windowWidth > 800 ? "w-[100%]" : "flex flex-row-reverse h-[100%]"} ref={schoolHeader} onClick={() => openHeader(6)} btn = "school" clicked = "1" page="#school-header">
                                <span>Account</span> {
                                    btnChange.school ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "school-header" className="w-[100%] hidden">
                        <Link href="/users/signin"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Sign In</Link> 
                        <Link href="/users/signup"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Sign Up</Link> 
                        <Link href="/users/dashboard"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Account</Link>
                        <Link href="/users/forgot"  style={{width:"100%",display:"block"}} className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]" onClick={removeNavBar}>Forgot Password</Link>  
                        </div>
                    </div>
                    <Link href="/homes"  style={{width:"20%",display:"block"}} className="min-h-[40px] bg-transparent text-white text-left m-[1%]" onClick={removeNavBar}>homes</Link>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <p><FontAwesomeIcon icon={faPhone} /> +254717323852</p>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[12%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <p><FontAwesomeIcon icon={faEnvelope} /> info@late-developers.com</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar