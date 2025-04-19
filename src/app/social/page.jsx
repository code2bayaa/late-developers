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

    
    useEffect(() => {
        gsap.to(document.getElementById("NavBar"), {
            background:"#000",
            color:"#fff",
            duration:2
        });
        runThemes()
    },[])
    return(
        <div className="w-[100%] min-h-[100%] bg-[#000] text-white">
            <div className="w-[80%] h-[20%] mx-[10%] flex flex-row">
                <button
                    type="button"
                    onClick={() => setPane("twitter")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "twitter" ? "350%" : "150%",textDecoration:pane === "twitter" ? "underline":"none"}} icon={faTwitter}/> TWITTER
                </button>
                <button
                    type="button"
                    onClick={() => setPane("facebook")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "facebook" ? "350%" : "150%",textDecoration:pane === "facebook" ? "underline":"none"}} icon={faFacebook}/> FACEBOOK
                </button>
                <button
                    type="button"
                    onClick={() => setPane("instagram")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "instagram" ? "350%" : "150%",textDecoration:pane === "instagram" ? "underline":"none"}} icon={faInstagram}/> INSTAGRAM
                </button>
                <button
                    type="button"
                    onClick={() => setPane("youtube")}
                    className="w-[25%] h-[60px]"
                    style={{backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}}
                >
                    <FontAwesomeIcon style={{fontSize:pane === "youtube" ? "350%" : "150%",textDecoration:pane === "youtube" ? "underline":"none"}} icon={faYoutube}/> YOUTUBE
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