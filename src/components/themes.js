import { logo2, logo3 } from "@/assets"
import gsap from "gsap"

export const runThemes = () => {
    document.getElementById("NavBar").classList.remove("contact")
    document.getElementById("NavBar").classList.remove("feedback")
    document.getElementById("NavBar").classList.remove("contact")
    document.getElementById("logo").classList.remove("transparent")
    document.getElementById("NavBar").classList.remove("newsletters")
    document.getElementById("imageFrame").srcset = logo2.src
    document.getElementById("imageFrame").style.objectFit = "contain"
    document.getElementById("imageFrame").style.height = "auto"
    document.getElementById("logo").style.background = "#fff"
    document.getElementById("NavBar").style.background = "linear-gradient( #900C3F , #900c85bd, #900c85bd)"

    if(window.location.pathname === "/contact"){
        console.log("contact")
        gsap.to(document.getElementById("NavBar"),{
            // css:{
                // backgroundImage:`url(${contact})`,
            // },
            // background:`url(${contact})`,
            onStart:() => {
                document.getElementById("NavBar").classList.add("contact")
                document.getElementById("logo").classList.add("transparent")
            },
            minHeight:"30%",
            duration:3
        })
      }else if(window.location.pathname === "/social"){
        console.log("social")
        console.log(logo3)
        document.getElementById("imageFrame").srcset = logo3.src
        document.getElementById("imageFrame").style.objectFit = "cover"
        document.getElementById("imageFrame").style.height = "150px"
        document.getElementById("logo").style.background = "#000"
      }else if(window.location.pathname === "/feedback"){
        console.log("feedback")
        gsap.to(document.getElementById("NavBar"),{
            // css:{
                // backgroundImage:`url(${contact})`,
            // },
            // background:`url(${contact})`,
            onStart:() => {
                document.getElementById("NavBar").classList.add("feedback")
                document.getElementById("logo").classList.add("transparent")
            },
            minHeight:"30%",
            duration:3
        })
      }else if(window.location.pathname === "/newsletter"){
        console.log("newsletters")
        gsap.to(document.getElementById("NavBar"),{
            // css:{
                // backgroundImage:`url(${contact})`,
            // },
            // background:`url(${contact})`,
            onStart:() => {
                document.getElementById("NavBar").classList.add("newsletters")
                document.getElementById("logo").classList.add("transparent")
            },
            minHeight:"30%",
            duration:3
        })
      }
}