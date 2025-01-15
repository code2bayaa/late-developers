"use client"
import gsap from "gsap";
import swal from 'sweetalert';
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"
const ThreeDScroll = dynamic(() => import("../../models/scene"), { ssr: false });

const DOORS = () => {

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
                SUBJECT: 'INVEST IN THINKING DOORS',
                MSG:`<div style='width:100%'><div style='width:80%;margin-left:10%;'><h1>Interested in investing in THINKING DOORS</h1><p>Create an email to ${form.email}</p><p>Send share inquiry</p></div></div>`
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
                        <p><span style={{fontSize:"300%"}}>L</span>ooking to invest in a <strong>start up</strong> production, introducing <b>THINKING DOORS</b> read below for more details</p>
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
                        <span><span style={{fontSize:"300%"}}>Thinking Doors</span>: Innovating Smart Access Solutions with Wireless Connectivity</span>
                    </article>
                    <article>
                        <p><span style={{fontSize:"300%"}}>H</span>ere are the core technologies driving THINKING DOORS:</p>
                        <ol>
                            <li>
                                <strong>Wireless Connectivity (Bluetooth & WiFi)</strong>
                                <p>At the heart of Thinking Doors is its ability to connect wirelessly to a wide range of devices. Users can open or close doors remotely via Bluetooth or WiFi, making it easy to integrate the system into a variety of environments.</p>

                            </li>
                            <li>
                                <strong>Smart Locks and IoT Integration</strong>
                                <p>Thinking Doors integrates smart locks that can be controlled via mobile apps or web dashboards. The locks are equipped with advanced security features such as encrypted communication and secure keyless entry.</p>

                            </li>
                            <li>
                                <strong>Cloud-Based Management</strong>
                                <p>A central component of Thinking Doors is the cloud-based management platform that stores and manages access credentials, usage logs, and permissions.</p>

                            </li>
                            <li>
                                <strong>Mobile and Web Applications</strong>
                                <p>The app is user-friendly, with simple interfaces to manage door access, permissions, and notifications. Additionally, a web interface allows property managers or business owners to control and monitor access from any internet-enabled device.</p>
                            </li>
                            <li>
                                <strong>Security and Encryption</strong>
                                <p>Thinking Doors utilizes end-to-end encryption to protect user data and prevent unauthorized access.</p>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <h2>Strategies</h2>
                        <p><i>Late Developers</i> understands that an innovative product needs strong financial backing. Here's how the company plans to attract investors for THINKING DOORS:</p>
                        <ol>
                            <li>
                                <h2>Targeting Growing Markets (Airbnb, Rentals, Offices)</h2>
                                <p>The global market for smart home technology is expanding rapidly, with more consumers and businesses adopting IoT-based solutions.</p>
                            </li>
                            <li>
                                <h2>Subscription-Based and Pay-Per-Use Revenue Models</h2>
                                <p>Thinking Doors offers several potential revenue models:</p>
                                <ul>
                                    <li><b>Subscription-based model</b></li>
                                    <li><b>Pay-per-use model</b></li>
                                </ul>
                            </li>
                            <li>
                                <h2>Cost Reduction and Efficiency</h2>
                                <p>For investors, the cost efficiency of Thinking Doors is a key selling point. By eliminating the need for physical keys, the system reduces the costs associated with key management, lost keys, and security breaches.</p>
                            </li>
                            <li>
                                <h2>Partnerships with Property Management and Security Companies</h2>
                                <p>Late Developers plans to form partnerships with property management firms, real estate agencies, and security companies to enhance the reach of Thinking Doors. These partnerships will allow for integration into existing properties and help market the product to new customers in both the residential and commercial sectors.</p>
                            </li>
                            <li>
                                <h2>Scalability and Global Expansion</h2>
                                <p>The system can easily be implemented in a variety of environments, from small Airbnb properties to large corporate office buildings. The flexibility and ease of installation make it a promising solution for both emerging and established markets worldwide.</p>
                            </li>
                            <li>
                                <h2>Investor Transparency and Data Analytics</h2>
                                <p>Late Developers aims to build trust with investors by providing transparent insights into system usage, security performance, and growth potential. Data analytics tools integrated into the platform offer investors a real-time view of how the product is performing in the market, its adoption rate, and the overall financial trajectory of the business.</p>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <span><span style={{fontSize:"300%"}}>Thinking Doors</span> is set to transform how we access and manage entry points in modern living and working spaces. With its innovative use of Bluetooth, WiFi, and smart lock technology, the system offers a seamless and secure solution for property owners, managers, and businesses alike. By targeting high-growth markets like Airbnb, private rentals, and offices, Late Developers is poised to make a significant impact in the IoT and smart home sectors.

Late Developers invites investors to be part of this exciting venture, promising a high-growth opportunity that combines security, convenience, and scalability with a clear path for long-term success.</span>
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
                    <ThreeDScroll glbPath="/model/door.glb" settings={{position:2}} triggerRef={triggerRef} />
                </div>
            </div>
        </>
    )
}

export default DOORS