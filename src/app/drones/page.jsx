"use client"
import gsap from "gsap";
import swal from 'sweetalert';
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"
const ThreeDScroll = dynamic(() => import("../../models/scene"), { ssr: false });

const DRONES = () => {

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
                SUBJECT: 'INVEST IN DRONES DELIVERY',
                MSG:`<div style='width:100%'><div style='width:80%;margin-left:10%;'><h1>Interested in investing in DELIVERY DRONES</h1><p>Create an email to ${form.email}</p><p>Send share inquiry</p></div></div>`
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
                        <span><span style={{fontSize:"300%"}}>Delivery Drones</span>: Transforming Logistics in Mombasa with Cutting-Edge Technology</span>
                    </article>
                    <article>
                        <p><span style={{fontSize:"300%"}}>H</span>ere are the core technologies driving DELIVERY DRONES:</p>
                        <ol>
                            <li>
                                <strong>Drone Technology (Autonomous & Semi-Autonomous Drones)</strong>
                                <p>The project utilizes autonomous drones equipped with advanced navigation systems powered by AI. These drones can deliver packages over both land and sea routes, utilizing GPS, LIDAR, and computer vision to safely navigate the skies and islands of Mombasa.

GPS Navigation: Drones rely on real-time GPS tracking to follow the most efficient flight paths.
AI Algorithms: The drones' onboard AI helps optimize flight routes, avoid obstacles, and adjust for weather conditions, ensuring the safe delivery of goods.</p>

                            </li>
                            <li>
                                <strong>Geofencing and Tracking Systems</strong>
                                <p>To ensure safe and precise delivery, the drones are integrated with geofencing technology. This allows for a digital boundary to be set around specific areas, ensuring the drones do not veer off course and always stay within predefined delivery zones. Real-time tracking systems also allow both customers and operators to monitor the drone's location throughout its journey</p>

                            </li>
                            <li>
                                <strong>Cloud Computing and IoT Integration</strong>
                                <p>The entire delivery process is orchestrated by cloud computing infrastructure that allows drones to receive real-time commands, weather data, and flight updates. The Internet of Things (IoT) enables seamless communication between drones, operators, and customers to ensure accurate delivery timelines.</p>

                            </li>
                            <li>
                                <strong>Data Analytics for Optimized Routes</strong>
                                <p>Advanced data analytics tools are employed to gather insights from the drone fleet's performance, weather patterns, and delivery timings. This data helps refine the system, enabling drones to choose the most time-efficient and energy-efficient flight paths across Mombasa's urban landscape and ocean lines.</p>
                            </li>
                            <li>
                                <strong>Battery Technology and Solar Charging</strong>
                                <p>The drones are equipped with state-of-the-art battery technology that allows for long-range deliveries without compromising payload capacity. To further extend their range and sustainability, drones can also utilize solar charging stations strategically placed around Mombasa, ensuring minimal downtime between deliveries.</p>
                            </li>
                            <li>
                                <strong>Safety Features and Regulatory Compliance</strong>
                                <p>To ensure the safety of the system, collision avoidance systems are integrated into each drone. These systems rely on sensors such as radar, ultrasonic, and visual cameras to detect and avoid potential obstacles mid-flight. The drones also comply with local and international aviation regulations, ensuring they can operate in controlled airspace.</p>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <strong>Strategies</strong>
                        <p><i>Late Developers</i> understands that an innovative product needs strong financial backing. Here's how the company plans to attract investors for DELIVERY DRONES:</p>
                        <ol>
                            <li>
                                <strong>Tapping into the Growing E-Commerce Market</strong>
                                <p>The demand for fast and efficient delivery services is growing rapidly, driven by the expansion of e-commerce and on-demand services. Delivery Drones provides an innovative solution to a logistical problem, especially in urban areas and islands, where traditional delivery methods may face delays due to traffic and geographical limitations.</p>
                            </li>
                            <li>
                                <strong>Cost Efficiency and Environmental Sustainability</strong>
                                <p>By utilizing drones for deliveries, the project promises to significantly lower transportation costs while reducing the carbon footprint. Drones are much more energy-efficient than traditional vehicles, making the system more eco-friendly. Investors are likely to find this sustainability angle appealing, especially with growing demand for green technologies..</p>
                            </li>
                            <li>
                                <strong>Targeting Strategic Partnerships</strong>
                                <p>Late Developers is looking to form partnerships with e-commerce companies, local businesses, and municipal authorities to streamline the integration of Delivery Drones into the urban infrastructure. By collaborating with established brands and logistics companies, the project will enhance its reach and credibility.</p>
                            </li>
                            <li>
                                <strong>Scalability and Expansion Plans</strong>
                                <p>The scalability of the drone fleet is a critical selling point for investors. Once the system is proven in Mombasa, the technology can be expanded to other regions, including across Kenya and other East African countries. The opportunity for geographic expansion into new markets adds to the project's investment appeal.</p>
                            </li>
                            <li>
                                <strong>Data-Driven Insights for Optimization</strong>
                                <p>The use of big data and AI to optimize drone deliveries will generate valuable insights, not only for operational efficiency but also for future business strategies. This data will be shared with stakeholders and investors, providing transparency and creating opportunities for innovation.</p>
                            </li>
                            <li>
                                <strong>Monetization and Revenue Streams</strong>
                                <p>Delivery Drones offers a variety of potential revenue streams for investors, including:.</p>
                                <ul>
                                    <li><strong>Subscription-based models:</strong>Charging businesses for using the delivery network.</li>
                                    <li><strong>Pay-per-delivery services:</strong>Charging customers for individual drone deliveries.</li>
                                    <li><strong>Advertising on drones:</strong>Offering advertising opportunities on drones to increase revenue generation.</li>
                                </ul>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <span><span style={{fontSize:"300%"}}>Delivery Drones</span> represents a transformative shift in how goods and products are delivered in Mombasa, using state-of-the-art technology to solve logistical challenges. Late Developers is committed to creating a sustainable, scalable, and efficient system that benefits both businesses and consumers while reducing environmental impact. With its strategic approach to attracting investors, the project is poised to revolutionize delivery services in East Africa and beyond.

Late Developers invites investors to be part of this groundbreaking initiative, which promises both significant returns and a positive impact on the environment and local communities.</span>
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
                    <ThreeDScroll glbPath="/model/drone_design.glb" settings={{position:1}} triggerRef={triggerRef} />
                </div>
            </div>
        </>
    )
}

export default DRONES