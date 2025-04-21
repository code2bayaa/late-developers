"use client"
import gsap from "gsap"
import { useEffect, useState } from "react"
import TWITTER from "../../components/twitter"
import YOUTUBE from "../../components/youtube"
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { runThemes } from "../../components/themes"
import "./social.css"
import swal from "sweetalert"

export default function SOCIAL(){

    const [pane, setPane] = useState("twitter")
    const [windowWidth, setWindowWidth] = useState(0)

    
    useEffect(() => {
        gsap.to(document.getElementById("NavBar"), {
            background:"#000",
            color:"#fff",
            duration:2
        });
        runThemes()
        const handleResize = () => setWindowWidth(window.screen.width);
        handleResize()
    },[])
    return(
        <div className={windowWidth > 800 ? "w-[100%] min-h-[100%] bg-[#000] text-white":"w-[100%] min-h-[100%] bg-[#000] text-white flex flex-col-reverse"}>
            <div style={{fontSize:"90%"}} className={windowWidth > 800 ? "w-[80%] h-[20%] mx-[10%] flex flex-row":"w-[100%] h-[20%] flex flex-row fixed my-[80%] "}>
                <button
                    type="button"
                    onClick={() => setPane("twitter")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "twitter" ? windowWidth > 800 ? "350%" : "200%" : windowWidth > 800 ? "150%" : "150%",textDecoration:pane === "twitter" ? "underline":"none"}} icon={faTwitter}/> TWITTER
                </button>
                <button
                    type="button"
                    onClick={() => setPane("facebook")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "facebook" ? windowWidth > 800 ? "350%" : "200%" : windowWidth > 800 ? "150%" : "150%",textDecoration:pane === "facebook" ? "underline":"none"}} icon={faFacebook}/> FACEBOOK
                </button>
                <button
                    type="button"
                    onClick={() => setPane("instagram")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "instagram" ? windowWidth > 800 ? "350%" : "200%" : windowWidth > 800 ? "150%" : "150%",textDecoration:pane === "instagram" ? "underline":"none"}} icon={faInstagram}/> INSTAGRAM
                </button>
                <button
                    type="button"
                    onClick={() => setPane("youtube")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "youtube" ? windowWidth > 800 ? "350%" : "200%" : windowWidth > 800 ? "150%" : "150%",textDecoration:pane === "youtube" ? "underline":"none"}} icon={faYoutube}/> YOUTUBE
                </button>
            </div>
            <div className="w-[100%] min-h-[100%]">
                {
                    pane === "twitter" ? 
                        <TWITTER />
                    :
                        pane === "youtube" ? 
                            <YOUTUBE/>
                    :
                    <TWITTER />
                }
            </div>
        </div>
    )
}