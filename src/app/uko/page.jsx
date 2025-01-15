"use client"
import gsap from "gsap";
import swal from 'sweetalert';
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"
const ThreeDScroll = dynamic(() => import("../../models/scene"), { ssr: false });

const UKO = () => {

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
                SUBJECT: 'INVEST IN UKO',
                MSG:`<div style='width:100%'><div style='width:80%;margin-left:10%;'><h1>Interested in investing in UKO</h1><p>Create an email to ${form.email}</p><p>Send share inquiry</p></div></div>`
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
                        <p><span style={{fontSize:"300%"}}>L</span>ooking to invest in a <strong>start up</strong> production, introducing <b>UKO</b> read below for more details</p>
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
                        <span><span style={{fontSize:"300%"}}>S</span>et to make waves in the entertainment industry with its latest project, UKO. Designed as a platform to stream and react to movies—both international blockbusters and locally embraced films—UKO aims to create a unique global community for movie enthusiasts</span>
                    </article>
                    <article>
                        <p><span style={{fontSize:"300%"}}>H</span>ere are the core technologies driving UKO:</p>
                        <ol>
                            <li>
                                <strong>Cloud Infrastructure</strong>
                                <p>Using services such as AWS, Microsoft Azure, or Google Cloud, the platform ensures reliable streaming, fast load times, and high availability. The scalable cloud architecture will handle high traffic and ensure seamless content delivery to users worldwide.</p>

                            </li>
                            <li>
                                <strong>Content Delivery Network (CDN)</strong>
                                <p>To minimize latency and deliver smooth streaming, UKO integrates a global CDN. This technology allows content to be cached and delivered from servers closest to users, ensuring a buffer-free experience, even in regions with lower internet speeds.</p>

                            </li>
                            <li>
                                <strong>Artificial Intelligence and Machine Learning</strong>
                                <p>Sentiment Analysis: Reactions are analyzed using AI to generate insights about viewer emotions, offering creators and audiences unique engagement opportunities.</p>

                            </li>
                            <li>
                                <strong>Interactive UI/UX Design</strong>
                                <p>Ensuring a seamless experience across web and mobile platforms. The design focuses on interactivity, allowing users to stream movies, leave reactions, and engage with community discussions.</p>
                            </li>
                            <li>
                                <strong>Blockchain for Content Security</strong>
                                <p>To protect intellectual property and prevent piracy, UKO employs blockchain technology for secure digital rights management. This also ensures transparent revenue sharing with content creators.</p>
                            </li>
                            <li>
                                <strong>Video Streaming Protocols</strong>
                                <p>Advanced streaming protocols like HLS (HTTP Live Streaming) and DASH (Dynamic Adaptive Streaming over HTTP) to optimize video quality dynamically based on user bandwidth</p>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <h2>Strategies</h2>
                        <p><i>Late Developers</i> understands that an innovative product needs strong financial backing. Here's how the company plans to attract investors for UKO:</p>
                        <ol>
                            <li>
                                <h2>Showcasing Market Potential</h2>
                                <p>The global streaming market is projected to grow exponentially, driven by increasing internet penetration and content demand. UKO uniquely combines streaming with interactive reactions, targeting a niche but rapidly expanding audience</p>
                            </li>
                            <li>
                                <h2>Pilot Launch with Local Content</h2>
                                <p>The platform plans to collaborate with African filmmakers to promote local content alongside international films. This dual approach will highlight UKO’s ability to serve both global and niche markets.</p>
                            </li>
                            <li>
                                <h2>Data-Driven Insights</h2>
                                <p>Using the AI-powered recommendation engine and sentiment analysis tools, UKO will provide actionable data to filmmakers, advertisers, and other stakeholders, creating multiple revenue streams</p>
                            </li>
                            <li>
                                <h2>Strategic Partnerships</h2>
                                <p>Late Developers is keen on forming partnerships with film distributors, local production houses, and global tech giants to enhance UKO's content library and technological capabilities</p>
                            </li>
                            <li>
                                <h2>Investor-Friendly Revenue Models</h2>
                                <p>With a subscription-based model, ad revenue, and pay-per-view options, UKO offers a diversified revenue strategy. Blockchain-powered transparent royalty systems will attract content creators and ensure investor confidence in financial processes</p>
                            </li>
                            <li>
                                <h2>Innovative Marketing</h2>
                                <p>To generate buzz, UKO will organize movie reaction challenges, influencer partnerships, and live events, creating an engaged community that drives organic growth.</p>
                            </li>
                        </ol>
                    </article>
                    <article>
                        <span><span style={{fontSize:"300%"}}>U</span>KO represents <i>Late Developers’</i> commitment to innovation and community building. With a robust technological foundation and a clear roadmap to attract investors, the project is poised to become a global sensation in the entertainment industry. By blending streaming with social engagement, UKO not only caters to movie enthusiasts but also empowers filmmakers and content creators on a global scale.

                        <i>Late Developers</i> invites investors to be part of this groundbreaking journey to redefine how the world experiences movies and reactions.</span>
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
                    <ThreeDScroll glbPath="/model/iron_man.glb" settings={{position:0}} triggerRef={triggerRef} />
                </div>
            </div>
        </>
    )
}

export default UKO