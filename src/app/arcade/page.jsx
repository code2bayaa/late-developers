"use client"
import gsap from "gsap";
import swal from 'sweetalert';
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"
const ThreeDScroll = dynamic(() => import("../../models/scene"), { ssr: false });

const ARCADE = () => {

    const [windowWidth, setWindowWidth] = useState(0);
    const [form,setForm] = useState({email:""})
    let triggerRef = useRef(null)

    useEffect(() => {
        document.title = `late-developers`;
      const handleResize = () => setWindowWidth(window.screen.width);
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize width
      gsap.to("#NavBar",{
            backgroundColor:"#fff",
            color:"#000",
            borderBottom:"1px solid #000",
            duration:3
        })

        gsap.to("#logo",{
            backgroundColor:"#fff",
            color:"#000",
            duration:3,
            delay:1
        })
  

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const investorsQuote = async() => {
        try {
            e.preventDefault()

            if(!form.email){
                swal("Oops!", "input your email", "error");
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Email/`, {
              cache: "no-store",
              method: 'POST', // HTTP method
              headers: {
                'Content-Type': 'application/json', // Indicates the body is JSON
              },
              body: JSON.stringify({
                RECEIVER: "latedevelopers@hotmail.com",
                SUBJECT: 'INVEST IN ARCADES',
                MSG:`<div style='width:100%'><div style='width:80%;margin-left:10%;'><h1>Interested in investing in ARCADES</h1><p>Create an email to ${form.email}</p><p>Send share inquiry</p></div></div>`
              }), // Convert the data object to JSON
            });
            if (!res.ok) {
                swal("Oops!", "Failed to fetch topic!", "error");
              throw new Error("Failed to fetch topic");
            }
        
            // return res.json();
            swal("success!");
        } catch (error) {
            swal("Oops!", error.message, "error");
            console.log(error);
        }
    }
    return (
        <>
            <div className={windowWidth > 800 ? "flex flex-row w-[100%] relative" : "flex flex-col w-[100%]" }>
                <div ref={triggerRef} className={windowWidth > 800 ? "w-[60%] text-justify three m-[0px]" : "w-[100%] text-justify three"}>
                    <article>
                        <p><span style={{fontSize:"300%"}}>L</span>ooking to invest in a <strong>start up</strong> production, introducing <b>DELIVERY DRONES</b> read below for more details</p>
                        <form 
                            id="investors-submit"
                            onSubmit={investorsQuote}
                            className="w-[100%] b-[1px]"
                        >
                        <input
                            id="input-email"
                            className="w-[100%] h-[60px] b-[1px] m-[1%]"
                            placeholder="INPUT EMAIL OR TELEPHONE"
                            name="email"
                            onChange={ e => setForm({...form, [e.target.name]:e.target.value})}
                         />
                        <button
                            type="submit"
                            className="w-[100%] h-[40px] bg-[#000]"
                            style={{color:"#fff",fontSize:"150%"}}
                        >
                            INVESTOR QUOTE
                        </button>
                    </form>
                    </article>
                    <article>
                        <span><span style={{fontSize:"300%"}}>ARCADES</span>: Transforming Logistics in Mombasa with Cutting-Edge Technology</span>
                    </article>
                    <article>
                        <p><span style={{fontSize:"300%"}}>H</span>ere are the core technologies driving ARCADES:</p>
                        <ol>
                            <li>
                                <strong>Arcades: Bringing High-Performance Gaming to Smart TVs with Cloud Support</strong>
                                <p>Arcades is set to revolutionize how gamers engage with cloud-based, console-quality games. This article explores the innovative technologies driving Arcades and outlines Late Developers' strategy to attract investors for this exciting venture.</p>

                            </li>
                            <li>
                                <strong>Cloud Gaming Infrastructure</strong>
                                <p>By utilizing powerful servers in data centers, Arcades ensures that the most graphically demanding games can be played smoothly without the need for local hardware upgrades.</p>

                            </li>
                            <li>
                                <strong>Web and TV Applications</strong>
                                <p>Arcades runs on both web applications and TV applications to provide a seamless user experience across multiple platforms. Whether playing on a smart TV or using a web browser on a computer, users can access the game library and stream games in real time.</p>

                            </li>
                            <li>
                                <strong>Socket Technologies for Multiplayer and Resource Farming</strong>
                                <p>Arcades utilizes advanced socket technologies to power multiplayer functionality and real-time resource farming. Socket communication allows for low-latency, bidirectional data exchange between users and the cloud servers, which is critical for fast-paced, multiplayer online games.</p>
                            </li>
                            <li>
                                <strong>Game Streaming Optimization</strong>
                                <p>To ensure high-quality video output despite varying internet speeds, Arcades employs advanced adaptive streaming protocols such as HLS (HTTP Live Streaming) and DASH (Dynamic Adaptive Streaming over HTTP). These protocols dynamically adjust the resolution and quality of the game stream based on the user's available bandwidth, ensuring smooth gameplay even in less optimal conditions.</p>
                            </li>
                            <li>
                                <strong>Backend Server Management and Load Balancing</strong>
                                <p>Arcades relies on distributed cloud servers and advanced load balancing techniques to handle the large volume of game data and ensure scalability. The cloud infrastructure is designed to handle large numbers of concurrent users, allowing for consistent performance even during peak times.</p>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <strong>Strategies</strong>
                        <p><i>Late Developers</i> understands that an innovative product needs strong financial backing. Here's how the company plans to attract investors for ARCADES:</p>
                        <ol>
                            <li>
                                <strong>Targeting the Growing Cloud Gaming Market</strong>
                                <p>The global cloud gaming market is growing rapidly, driven by increasing internet speeds, improved cloud infrastructure, and the popularity of gaming. Arcades taps into this expanding market by offering console-quality gaming without the need for expensive hardware. Investors can benefit from the increasing demand for cloud-based solutions in the gaming sector.</p>
                            </li>
                            <li>
                                <strong>High Scalability and Accessibility</strong>
                                <p>Arcades is designed to be highly scalable, enabling easy expansion across multiple platforms and regions. Its cloud-based infrastructure allows for a seamless experience on any smart TV or web browser, making it accessible to a wide range of users. The project has the potential to reach millions of gamers globally, which is a compelling factor for investors looking for scalable opportunities.</p>
                            </li>
                            <li>
                                <strong>Revenue Streams and Monetization</strong>
                                <p>Arcades offers several revenue models that make it an attractive investment opportunity:</p>
                                <ul>
                                    <li><strong>Subscription-Based Model:</strong></li>
                                    <li><strong>Pay-Per-Play Model:</strong></li>
                                    <li><strong>Partnerships with Game Developers:</strong></li>
                                    <li><strong>In-Game Purchases:</strong></li>
                                </ul>
                            </li>
                            <li>
                                <strong>Building Strategic Partnerships</strong>
                                <p>Late Developers aims to build partnerships with game developers, cloud service providers, and smart TV manufacturers to expand Arcades' reach and capabilities. Collaborations with game developers will ensure access to popular titles, while partnerships with hardware manufacturers could lead to exclusive deals for pre-installation of the Arcades app on smart TVs.</p>
                            </li>
                            <li>
                                <strong>Enhanced User Engagement and Data Analytics</strong>
                                <p>With its cloud infrastructure and gaming analytics, Arcades provides investors with valuable insights into user behavior, gaming preferences, and trends. This data can be used to improve user experience, target specific demographics, and optimize the platform for maximum growth.</p>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <span><span style={{fontSize:"300%"}}>Arcades</span> represents a leap forward in the evolution of cloud gaming, providing gamers with the ability to enjoy high-performance games without the need for expensive consoles. Late Developers' use of cloud infrastructure, socket technologies for multiplayer engagement, and seamless streaming optimization positions Arcades as a game-changer in the industry.

By offering scalable solutions, innovative monetization models, and strategic partnerships, Late Developers is well-positioned to attract investors who are looking to capitalize on the growing demand for accessible, high-quality gaming experiences. Arcades offers an exciting opportunity to be part of the next wave of gaming innovation.</span>
                    </article>
                    <form 
                        id="investors-submit"
                        onSubmit={investorsQuote}
                        className="w-[100%] b-[1px]"
                    >
                        <input
                            id="input-email"
                            className="w-[100%] h-[60px] b-[1px] m-[1%]"
                            placeholder="INPUT EMAIL OR TELEPHONE"
                            name="email"
                            onChange={ e => setForm({...form, [e.target.name]:e.target.value})}
                         />
                        <button
                            type="submit"
                            className="w-[100%] h-[40px] bg-[#000]"
                            style={{color:"#fff",fontSize:"150%"}}
                        >
                            INVESTOR QUOTE
                        </button>
                    </form>
                </div>
                <div className={windowWidth > 800 ? "w-[42.5%] fixed mx-[58%]" : "hidden"}>
                    <ThreeDScroll glbPath="/model/arcade.glb" settings={{position:3}} triggerRef={triggerRef} />
                </div>
            </div>
        </>
    )
}

export default ARCADE