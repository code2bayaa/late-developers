import { logo2, logo3 } from "@/assets"
import gsap from "gsap"
import {COLLECT} from "@/components/reports.jsx"
export const runThemes = async(screen) => {
    document.getElementById("NavBar").classList.remove("contact")
    document.getElementById("NavBar").classList.remove("feedback")
    document.getElementById("NavBar").classList.remove("contact")
    document.getElementById("logo").classList.remove("transparent")
    document.getElementById("NavBar").classList.remove("newsletters")
    document.getElementById("imageFrame").srcset =  "/image/logo2.png"
    document.getElementById("imageFrame").style.objectFit = "cover"
    document.getElementById("imageFrame").style.height = "150px"
    document.getElementById("logo").style.background = "#fff"
    document.getElementById("NavBar").style.background = "linear-gradient( #900C3F , #900c85bd, #900c85bd)"

    if(window.location.pathname === "/contact"){
        gsap.to(document.getElementById("NavBar"),{
            onStart:() => {
                document.getElementById("NavBar").classList.add("contact")
                document.getElementById("logo").classList.add("transparent")
            },
            minHeight:screen > 800 ? "30%" : "100%",
            duration:3
        })
      }else if(window.location.pathname === "/social"){
        document.getElementById("imageFrame").srcset = logo3.src
        document.getElementById("imageFrame").style.objectFit = "cover"
        document.getElementById("imageFrame").style.height = "150px"
        document.getElementById("logo").style.background = "#000"
      }else if(window.location.pathname === "/feedback"){
        gsap.to(document.getElementById("NavBar"),{
            onStart:() => {
                document.getElementById("NavBar").classList.add("feedback")
                document.getElementById("logo").classList.add("transparent")
            },
            minHeight:screen > 800 ? "30%" : "100%",
            duration:3
        })
      }else if(window.location.pathname === "/newsletter"){
        gsap.to(document.getElementById("NavBar"),{
            onStart:() => {
                document.getElementById("NavBar").classList.add("newsletters")
                document.getElementById("logo").classList.add("transparent")
            },
            minHeight:screen > 800 ? "30%" : "100%",
            duration:3
        })
      }
      COLLECT()
}