"use client"
import Image from "next/image"
import { logo2 } from "../assets"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHome, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { useState,useRef } from "react"
import $ from "jquery"

const NavBar = () => {


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
        // <nav>
            <div className="w-[100%] flex bg-rose-800 text-white">
                <div className="w-[30%] bg-white">
                    <Image src = {logo2} alt="late-developers" className="w-[20%] p-0 m-[-1%] z-[2] absolute object-contain"/>

                </div>
                <div className="w-[70%] flex">
                    <div className="flex flex-col w-[18%] m-[1%]">
                        <div className="w-[100%]">
                            <Link href="/">
                                <FontAwesomeIcon icon={faHome}/> <label>Home</label>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col w-[18%] m-[1%]">
                        <div className="h-[25%]"> 
                             
                            <button className = "btn-header" ref={introductionsHeader} onClick={() => openHeader(1)} btn = "introductions" clicked = "1" page="#introductions-header">
                                <span>Introductions</span> {
                                    btnChange.introductions ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "introductions-header" className="w-[100%] hidden">
                            <p><Link href="/about">about us</Link></p>
                            <p><Link href="/vision">vission</Link></p>
                            <p><Link href="/values">values</Link></p>
                            <p><Link href="/mission">mission</Link></p>
                            <p><Link href="/team">team</Link></p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[18%] m-[1%]">
                        <div className="h-[25%]"> 
                             
                            <button className = "btn-header" ref={servicesHeader} onClick={() => openHeader(2)} btn = "services" clicked = "1" page="#services-header">
                                <span>Services</span> {
                                    btnChange.services ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "services-header" className="w-[100%] hidden">
                            <p><Link href="/website">website development</Link></p>
                            <p><Link href="/mobile">mobile application development</Link></p>
                            <p><Link href="/cloud">cloud consultation</Link></p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[18%] m-[1%]">
                        <div className="h-[25%]">
                            
                            <button className = "btn-header" ref={projectsHeader} onClick={() => openHeader(3)} btn = "projects" clicked = "1" page="#projects-header">
                                <span>Projects</span> {
                                    btnChange.projects ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id="projects-header" className="w-[100%] hidden">
                            <p><Link href="/uko">UKO</Link></p>
                            <p><Link href="/drones">Drone Delivery</Link></p>
                            <p><Link href="/doors">Thinking Doors</Link></p>  
                        </div>
                    </div>
                    <div className="flex flex-col w-[18%] m-[1%]">
                        <div className="h-[25%]">
                            
                            <button className = "btn-header" ref={shopHeader} onClick={() => openHeader(4)} btn = "shop" clicked = "1" page="#shop-header">
                                <span>Shop</span> {
                                    btnChange.shop ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "shop-header" className="w-[100%] hidden">
                            <p><Link href="/store">Store</Link></p>
                            <p><Link href="/signin">LogIn</Link></p>  
                        </div>
                    </div>
                    <div className="flex flex-col w-[18%] m-[1%]">
                        <div className="h-[25%]">
                            
                            <button className = "btn-header" ref={activitiesHeader} onClick={() => openHeader(5)} btn = "activities" clicked = "1" page="#activities-header">
                                <span>Activities</span> {
                                    btnChange.activities ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "activities-header" className="w-[100%] hidden">
                            <p><Link href="/feedback">Feedback</Link></p>
                            <p><Link href="/contact">Contact Us</Link></p> 
                            <p><Link href="/newsletter">Newsletter</Link></p>
                            <p><Link href="/blogs">Blogs</Link></p> 
                            <p><Link href="/social">Social Media</Link></p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[18%] m-[1%]">
                        <div className="h-[25%]">
                            
                            <button className = "btn-header" ref={schoolHeader} onClick={() => openHeader(6)} btn = "school" clicked = "1" page="#school-header">
                                <span>School</span> {
                                    btnChange.school ? 
                                        <FontAwesomeIcon icon={faChevronUp} />
                                        :
                                            <FontAwesomeIcon icon={faChevronDown} />
                                }
                                
                            </button>
                        </div>
                        <div id = "school-header" className="w-[100%] hidden">
                            <p><Link href="/certifications">Certifications</Link></p>
                            <p><Link href="/courses">Courses</Link></p> 
                            <p><Link href="/enrollment">Enrollment</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        // </nav>
    )
}

export default NavBar