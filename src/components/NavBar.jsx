"use client"
import Image from "next/image"
import { logo2 } from "../assets"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHome, faChevronUp, faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons"
import { useState,useRef, useEffect } from "react"
import $ from "jquery"
import gsap from "gsap";

const NavBar = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      const handleResize = () => setWindowWidth(windowWidth);
  
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

    const navBar = useRef(null)
    const introductionsHeader = useRef(null)
    const servicesHeader = useRef(null)
    const projectsHeader = useRef(null)
    const shopHeader = useRef(null)
    const activitiesHeader = useRef(null)
    const schoolHeader = useRef(null)
    const mobileHeader = useRef(null)

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
                <button className = "btn-mobile" ref={mobileHeader} onClick={mobile} clicked = "1">
                    {
                        btnChange.mobile ? 
                            <FontAwesomeIcon style={{color:"#E1F977"}} icon={faBarsStaggered} />
                            :
                                <FontAwesomeIcon style={{color:"#E1F977"}} icon={faBars} />
                    }
                    
                </button>
            </div>
        }
            <div ref={navBar} id="NavBar" className={windowWidth > 800 ? "w-[100%] min-h-[20%] flex bg-rose-800 text-white" : "w-[100%] min-h-[100%] flex flex-col fixed bg-rose-800 text-white z-[10] top-[-1%] hidden"}>
                <div className={windowWidth > 800 ? "w-[30%] bg-white" :"w-[100%] bg-white"}>
                    <Image src = {logo2} alt="late-developers" className="w-[100%] p-0 m-[-1%] z-[2] object-contain"/>

                </div>
                <div className={windowWidth > 800 ? "w-[70%] flex" : "w-[100%] flex flex-col"}>
                    <div className={windowWidth > 800 ? "flex flex-col w-[18%] m-[1%]" : "w-[100%]"}>
                        <div className="w-[100%]">
                            <Link href="/">
                                <FontAwesomeIcon icon={faHome}/> <label>Home</label>
                            </Link>
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[18%] m-[1%]" : "flex flex-col w-[100%]"}>
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
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/erp">erp</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/crm">crm</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/hr">hr & payroll</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/email">email archiving</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/edrms">electronic document and records management system</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/custom">custom solutions</Link></p>
                            
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[18%] m-[1%]" : "flex flex-col w-[100%]"}>
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
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/website">website development</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/mobile">mobile application development</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/cloud">cloud consultation</Link></p>
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[18%] m-[1%]" : "flex flex-col w-[100%]"}>
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
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/uko">UKO</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/drones">Drone Delivery</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/doors">Thinking Doors</Link></p>  
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[18%] m-[1%]" : "flex flex-col w-[100%]"}>
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
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/store">Store</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/signin">LogIn</Link></p>  
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[18%] m-[1%]" : "flex flex-col w-[100%]"}>
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
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/feedback">Feedback</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/contact">Contact Us</Link></p> 
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/newsletter">Newsletter</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/blogs">Blogs</Link></p> 
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/social">Social Media</Link></p>
                        </div>
                    </div>
                    <div className={windowWidth > 800 ? "flex flex-col w-[18%] m-[1%]" : "flex flex-col w-[100%]"}>
                        <div className={windowWidth > 800 ? "h-[25%]" : "h-[40px]"}>
                            
                            <button className = {windowWidth > 800 ? "w-[100%]" : "flex flex-row-reverse h-[100%]"} ref={schoolHeader} onClick={() => openHeader(6)} btn = "school" clicked = "1" page="#school-header">
                                <span>School</span> {
                                    btnChange.school ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "school-header" className="w-[100%] hidden">
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/certifications">Certifications</Link></p>
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/courses">Courses</Link></p> 
                            <p className="min-h-[40px] bg-white w-[98%] text-black text-center m-[1%]"><Link href="/enrollment">Enrollment</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar