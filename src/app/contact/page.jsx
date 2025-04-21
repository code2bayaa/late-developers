"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRibbon, faPhone, faMailForward, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import {useRef, useState, useLayoutEffect} from 'react'
import { faTwitter, faFacebook, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Loader } from "@googlemaps/js-api-loader"
import { contact, logo2 } from "@/assets/"
import Link from 'next/link'
// import gsap from "gsap"
import { runThemes } from '../../components/themes'

const CONTACTS = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useLayoutEffect(() => {
        runThemes(window.screen.width)
        // console.log("contact")
        // gsap.to(document.getElementById("NavBar"),{
        //     // css:{
        //         // backgroundImage:`url(${contact})`,
        //     // },
        //     // background:`url(${contact})`,
        //     onStart:() => {
        //         document.getElementById("NavBar").classList.add("contact")
        //         logoWall.current.classList.add("transparent")
        //     },
        //     minHeight:"30%",
        //     duration:3
        // })

        const handleResize = () => setWindowWidth(window.screen.width);
        handleResize()

        const loader = new Loader({
            apiKey: process.env.map,
            version: "weekly",
            // options,
          });
          

          loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

            let position = {lat:-3.9968431767133388,lng:39.699020416678195}

            let map = new Map(document.getElementById("map"), {
              center: position,
              zoom: 18,
              mapId: "late_developer_3"
            });

            // Define the custom icon
            var customIcon = {
                url: logo2, // URL to your custom image
                scaledSize: new google.maps.Size(60, 60), // Desired size
                origin: new google.maps.Point(0, 0), // Origin point (0, 0)
                anchor: new google.maps.Point(25, 50) // Anchor point (center of the image)
            };

            // Create a marker with the custom icon
            var marker = new google.maps.Marker({
                position,
                map,
                icon: customIcon,
                title: 'we for she movement'
            });

          });

    },[])

    return (
        <div style={{backgroundColor:"#f4f7f7"}} className={windowWidth > 800 ? "w-[100%] h-[100%] grid justify-items-center":"w-[100%] h-[800px] grid justify-items-center"}>
            <div style={{background:"#FBF7F5",textAlign:"center"}} className={windowWidth > 800 ? "w-[80%] relative" : "w-[95%] relative"}>
                    
                <h2 style={{fontSize:"200%"}}>Connect with us</h2>
                <p>Do you want to partner with late developers or seek opportunites contact below</p>
                <div className="w-[100%] flex flex-row flex-wrap">
                    <div className={windowWidth > 800 ? "w-[23%] m-[1%]" : "w-[48%] m-[1%]"}  style={{backgroundColor:"#fff",color:"#411342",textAlign:"center"}}>
                        <FontAwesomeIcon icon={faPhone} />
                        <p>+254717323852</p>
                    </div>
                    <div className={windowWidth > 800 ? "w-[23%] m-[1%]" : "w-[48%] m-[1%]"}  style={{backgroundColor:"#fff",color:"#411342",textAlign:"center"}}>
                        <FontAwesomeIcon icon={faMailForward} />
                        <p>info@late-developers.com</p>
                    </div>
                    <div className={windowWidth > 800 ? "w-[23%] m-[1%]" : "w-[48%] m-[1%]"}  style={{backgroundColor:"#fff",color:"#411342",textAlign:"center"}}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        <article>
                            <h3>P.O. BOX 908452 - 80100, Tudor, Mombasa</h3>

                            <h3>Tom Mboya Rd, Tudor</h3>
                        </article>
                    </div>
                    <div className={windowWidth > 800 ? "w-[48%] m-[1%]" : "w-[98%] m-[1%]"}  style={{backgroundColor:"#fff",color:"#411342",textAlign:"center"}}>
                        <Link href = "https://x.com/late-developers" target = "_blank" style={{width:"23%", margin:"1%", color:"#411342", fontSize:"150%"}}>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </Link>
                        <Link href = "https://www.facebook.com/share/H3rp5RarRfLnTCkt/?mibextid=qi2Omg" target = "_blank" style={{width:"23%", margin:"1%", color:"#411342", fontSize:"150%"}} >
                            <FontAwesomeIcon icon={faFacebook}/>
                        </Link>
                        <Link href = "https://www.youtube.com/channel/UCGNOPsGsy07--f884Cy3WBw" target = "_blank" style={{width:"23%", margin:"1%", color:"#411342", fontSize:"150%"}} >
                            <FontAwesomeIcon icon={faYoutube}/>
                        </Link>
                        <Link href = "https://www.linkedin.com/in/late-developer/" target = "_blank" style={{width:"23%", margin:"1%", color:"#411342", fontSize:"150%"}} >
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </Link>
                        <Link href = "https://www.instagram.com/late-developers/" target = "_blank" style={{width:"23%", margin:"1%", color:"#411342", fontSize:"150%"}} >
                            <FontAwesomeIcon icon={faInstagram}/>
                        </Link>
                    </div>
                </div>
                <div id="map">
                    <h1>late developers map</h1>
                </div>
            </div>
        </div>
    )
}

export default CONTACTS