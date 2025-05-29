"use client"
import Image from "next/image";
// import Plyr from "plyr-react"
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css"
import "./home.css"
// import { logo1 } from "../assets"
import Slider from "react-slick";
import {clients, accreditors, marketing} from "./../components/constants"
import {useLayoutEffect, useRef, useEffect, useState} from "react"
import { avatar, solutions1, solutions2, solutions3, solutions4, wave1, wave3 } from "@/assets";
// import waveImage from '@/assets/wave.gif';
import { faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";
import { runThemes } from "@/components/themes";
import Link from "next/link";
import $ from "jquery"
// import {COLLECT} from "@/components/reports.jsx"

export default function Home() {

  const [plyrMode, setPlyrMode] = useState(null)
  const [quality, setQuality] = useState(false)
  const textRef = useRef(null)
  const textAllRef = useRef(null)

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // COLLECT()
    const handleResize = () => setWindowWidth(window.screen.width);
    runThemes()
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize width
    gsap.to("#NavBar",{
      backgroundImage: "linear-gradient( #900C3F , #900c85bd, #900c85bd)",
      color:"#fff",
      duration:5
    })

    gsap.registerPlugin(ScrollTrigger);
    
    const textAll = document.querySelectorAll("#textAll");
    // const lettersAll = textAll.innerText.split("");

    // textAll.innerHTML = lettersAll.map(letter => `<span style="opacity:0;">${letter}</span>`).join("");

    // gsap.utils.toArray("p").forEach(span =>
    textAll.forEach( all => {
      gsap.fromTo(
        all.children,
        { y: 50, opacity: 0 }, // Start position (bottom & invisible)
        { y: 0, opacity: 1, duration: 2, ease: "power3.out",
          scrollTrigger:{
            trigger:all,
            scroller:"#main-body",
            start:"2% 5%",
            end:"bottom bottom",
            // markers:true
          }
        }, // End position (visible)


      )
    })
    // )

    gsap.to("#logo",{
        backgroundColor:"#fff",
        duration:3,
        delay:1
    })
    const text = textRef.current;
    const letters = text.innerText.split("");

    text.innerHTML = letters.map(letter => `<span style="opacity:0;">${letter}</span>`).join("");

    gsap.to(text.children, {
      opacity: 1,
      stagger: 0.1, // Delay between each letter
      duration: 0.5,
      ease: "power1.out",
    });
    // return () => {
    //   setPlyrMode(() => true)
    //   // window.removeEventListener("resize", handleResize);
    // }
  }, []);
  useLayoutEffect(() => {
    setPlyrMode(true)
  },[])

  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5,
    speed:5000,
    swipeToSlide:true,
    draggable:true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay:true,
    arrows:false,
    pauseOnHover:true,
    dots:false,
    cssEase:"ease",
    responsive: [{

        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true
        }
   
      }, {
   
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false
        }
   
      }, {
   
        breakpoint: 300,
        settings: "unslick" // destroys slick
   
      }]
  };

  return (
    <>
    {/* <div className="component"> */}
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[100%] flex flex-row wave  bg-[url('/image/wave6.gif')]" : "relative w-[100%] h-[100%]" }>
          <div style={{width:windowWidth > 800 ? "30%" : "100%", height:windowWidth > 800 ? "70%" : "100%", position:windowWidth > 800 ? "relative" : "absolute", }} className="flex gap-[2%] grid justify-items-center text-white z-[1] bg-shade">
            {/* <Image src = {wave1} alt="late-developers" style={{height:"50%"}} className="w-[20%] p-0 m-[-1%] z-[2] object-contain"/> */}
            <div className={windowWidth > 800 ? "w-[100%] my-[20%] relative":"w-[100%] relative my-[20%]"}>
              <h1 style={{color:windowWidth > 800 ? "#000" : "#fff"}}>STILL UNDER CONSTRUCTION</h1>
              <h1 style={{fontSize:windowWidth > 800 ? "300%" : "180%",color:windowWidth > 800 ? "#000" : "#fff"}}><b>Late Developers</b></h1>
              
              <h2 ref={textRef} style={{fontSize:windowWidth > 800 ? "300%" : "180%"}} className="text-rose-900"><b>EARLY SOLUTIONS & SERVICES</b></h2>
              <h3 style={{fontSize:windowWidth > 800 ? "200%" : "150%",color:windowWidth > 800 ? "#000" : "#fff"}}>late again</h3>
            </div>
          </div>
          {
            plyrMode && 
            < Plyr
                source={{
                    type:"video",
                    sources: [
                    {
                        src: "pxU5nMFx1wM", // YouTube video ID
                        provider: "youtube",
                    },
                    ],

                }}
                options= {{
                  autoplay: true,
                  muted: false,
                  controls: ["play", "volume", "fullscreen"],
                }
              }
            />
          }

        </div>
        <div ref={textAllRef} id="textAll" className = {windowWidth > 800 ? "relative w-[100%] h-[60%]" : "relative w-[100%] h-auto" }>
          <div style={{boxShadow:"0 15px 35px rgba(0, 0, 0, 0.12)"}} className={windowWidth > 800 ? "w-[80%] my-[5%] h-[100%] relative left-[10%] bg-[#E1F977] text-[#411342] flex flex-row":"w-[100%] h-[100%] relative bg-[#E1F977] text-[#411342] flex flex-col"}>
            <article className={windowWidth > 800 ? "w-[48%] m-[1%] text-center ":"w-[98%] m-[1%] text-center "}>
              <FontAwesomeIcon style={{fontSize:"400%",color:"#411342",textAlign:"center"}} icon={faHeart}/>
              <h1 style={{fontSize:"250%",textAlign:"center"}}>MISSION</h1>
              To empower individuals and businesses through innovative software solutions and comprehensive training programs, fostering a culture of digital literacy and entrepreneurship that drives sustainable development and economic growth.
            </article>
            <article className={windowWidth > 800 ? "w-[48%] m-[1%] text-center ":"w-[98%] m-[1%] text-center "}>
              <FontAwesomeIcon style={{fontSize:"400%",color:"#411342",textAlign:"center"}} icon={faHandFist}/>
              <h1 style={{fontSize:"250%",textAlign:"center"}}>VISION</h1>
              To be a leading hub for innovation and digital transformation globally, empowering individuals and businesses with world-class technological skills and solutions to drive sustainable development and economic growth.
            </article>
          </div>
        </div>
        <div ref={textAllRef} id="textAll" style={{background:"linear-gradient(to right, #FFE0B2 50%, #FAFAFA 50%)"}} className = {windowWidth > 800 ? "min-h-[100%] w-[100%] h-[auto]" : "relative w-[100%] h-auto" }>
          <h1 style={{textAlign:"center",fontSize:"200%"}}>PACKAGES OFFERED</h1>
          <div style={{background:"rgba(0,0,0,0.75)",color:"#fff",width:windowWidth > 800 ? "70%" : "98%",marginBottom:"1%",marginLeft:windowWidth > 800 ? "15%" : "1%",textAlign:"justify"}}>
            <p>At Late Developers, we believe technology should be accessible, affordable, and transformational — whether you're a community organization working to uplift society, or a growing business ready to scale.
            That's why we've designed custom digital packages tailored specifically for:</p>
          </div>
          <div className={windowWidth > 800 ? "w-[100%] flex flex-row":"w-[100%] flex flex-col"}>
            <div className={windowWidth > 800 ? "w-[50%] min-h-[100%] text-[#411342]":"w-[100%] h-[auto] relative text-[#411342] flex flex-col"}>
              <Image src = "/image/package1.jpeg" width={500} height={500} alt="late-developers" style={{height:"300px"}} className="w-[100%] object-contain"/>

              <article className={windowWidth > 800 ? "w-[90%] mx-[5%] text-justify ":"w-[98%] m-[1%] text-justify"}>
                <h1 style={{fontSize:"250%",textAlign:"center"}}>COMMUNITY PACKAGE</h1>
                At Late Developers, we believe true community change starts with visionary ideas, supported by strategic digital solutions. Whether you’re serving a neighborhood, a region, or a global mission — we are your technology and visibility partner.

                We understand that investors want to see impact. Not just ideas, but structured outcomes, transparent systems, and measurable growth. That’s where we come in.              
                <ul>
                  <li>Churches & Religious Institutions</li>
                  <li>Community-Based Organizations (CBOs)</li>
                  <li>Public Benefit Organizations (PBOs)</li>
                  <li>Youth & Women Empowerment Groups</li>
                  <li>Grassroots Environmental Movements</li>
                </ul>
                <p>But we don’t stop at websites. We help you tell your story in a way that inspires funding, engages the community, and scales your vision.</p>
                <p>Send a mail below for more information</p>
                <Link href="/feedback" className={windowWidth > 800 ? "bg-[#900C3F] text-center underline h-[40px] w-[20%] inline-block text-white rounded" :"bg-[#900C3F] text-center underline h-[40px] w-[50%] inline-block text-white rounded" }>
                  More Info
                </Link>
              </article>
            </div>
            <div className={windowWidth > 800 ? "w-[50%] min-h-[100%] relative text-[#411342]":"w-[100%] h-[auto] relative text-[#411342] flex flex-col"}>
              <Image src = "/image/package2.jpg" width={500} height={500} alt="late-developers" style={{height:"300px"}} className="w-[100%] object-contain"/>

              <article className={windowWidth > 800 ? "w-[90%] mx-[5%] text-justify ":"w-[98%] m-[1%] text-justify"}>
                <h1 style={{fontSize:"250%",textAlign:"center"}}>ENTERPRISE PACKAGE</h1>
                <h3>Smart Solutions for Smart Businesses — Scale Your Enterprise with Late Developers</h3>
                In today’s fast-paced world, growth belongs to the bold — and the digitally prepared.
                At Late Developers, we provide intelligent, automated, and scalable tech solutions for businesses ready to lead, not follow.

                Whether you run a bank, bar, restaurant, logistics firm, or retail chain, our enterprise packages are designed to transform your operations, unlock efficiency, and drive revenue — all through the power of AI, IoT, Robotics, and Automation.
                <strong>Embrace the Future — We Build it For You</strong>
                <ol>
                  <li>AI-Powered Business Intelligence</li>
                  <li>IoT & Robotics Integration</li>
                  <li>Workflow Automation for Speed & Accuracy</li>
                  <li>Scale with Data, Not Guesswork</li>
                  <li>Custom Software for Business Evolution</li>
                </ol>
                <p>Send a mail below for more information</p>
                <Link href="/feedback" className={windowWidth > 800 ? "bg-[#900C3F] text-center underline h-[40px] w-[20%] inline-block text-white rounded" :"bg-[#900C3F] text-center underline h-[40px] w-[50%] inline-block text-white rounded" }>
                  More Info
                </Link>
              </article>
            </div>
          </div>
        </div>
        <div ref={textAllRef} id="textAll" style={windowWidth > 800 ? {clipPath:"polygon(0 20%, 100% 0, 100% 80%, 0 100%)"} : {}} className = {windowWidth > 800 ? "relative w-[100%] h-[100%] bg-[url('/image/background1.jpg')]" : "relative w-[100%] h-auto bg-[url('/image/background1.jpg')] flex flex-row flex-wrap" }>
            <div className="w-[100%] relative top-[25%] flex flex-row flex-wrap">
              {
                marketing.map(({title, article, icon}, index) => (
                    <div key={index} style={{boxShadow:"2 18px 75px rgba(0, 150, 255, 0.25)"}} className={windowWidth > 800 ? "w-[30%] h-[200px] m-[1%] bg-[#FAF3E0]":"w-[98%] m-[1%] bg-[#FAF3E0]"}>
                      <div className="w-[100%]">
                        {icon}
                      </div>
                      <div className="w-[100%]">
                        {title}
                        {article}
                      </div>

                    </div>
                  )
                )
              }
            </div>

        </div>
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[50%]" : "relative w-[100%] h-auto" }>
          <h1 style={{textAlign:"center",fontSize:"300%"}}>OUR CLIENTS</h1>
          <div className="w-[100%]">
            <Slider {...settings}>
              {
                  clients.map(({image,name,link},index) => 
                  (
                      <div className="w-[23%] m-[1%]" style={{boxShadow:"0 18px 45px rgba(0, 150, 255, 0.25)"}} key={index}>
                          <a href={link}>
                              <Image src={image} alt="<i>Late Developers</i>" style={{height:"150px"}} className="w-[40%] object-contain"/>

                          </a>
                          <h3>{name}</h3>
                      </div>
                  )
                  )
              }
            </Slider>
          </div>
          
        </div>

        <div style={{boxShadow:"0 15px 35px rgba(0, 0, 0, 0.12)"}} className = {windowWidth > 800 ? "relative w-[60%] mx-[20%] h-[auto] bg-[#411342] flex flex-row" : "relative w-[100%] h-auto bg-[#411342]" }>
          <Image src = "/image/home2.png" width={500} height={500} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "w-[50%]" : "w-[100%] object-contain"}/>
          <div className={windowWidth > 800 ? "w-[60%] m-[1%] text-center":"w-[100%]"}>
              <h1 className="text-rose-800" style={{fontSize:"180%"}}>Quality Means No Compromise</h1>
              <article className="text-white text-left">
                At <i>Late Developers</i>, we recognize that technology is more than just a tool; it is an enabler. By equipping young people with programming and digital skills, we empower them to innovate, create, and thrive in a competitive global marketplace. Our programming school curriculum is designed not just to teach coding but to inspire problem-solving, critical thinking, and creativity—skills that are indispensable in the 21st century.
                <br/>
                <button className="bg-[#900C3F] text-white p-[2%] m-[2%] rounded"
                  onClick={() => {
                    // Handle button click
                    if(quality){
                      $("#quality").slideUp(1000)
                      setTimeout(() => {
                        $("#quality").addClass("hidden")
                      }, 1000)
                    }else{
                      $("#quality").removeClass("hidden")
                      $("#quality").slideDown(1000)
                    }
                    setQuality(!quality)
                  }
                }>
                  Learn More
                </button>
                <div id="quality" className="hidden w-[100%]">
                  <strong>Catalyzing Economic Growth</strong>
                  The economic impact of digital literacy cannot be overstated. As Kenya seeks to solidify its position as a technological hub in Africa, a skilled workforce is essential. <i>Late Developers</i> is committed to producing tech talent that will contribute to key industries such as finance, healthcare, education, and agriculture.

                  By fostering innovation, we are not only enhancing individual livelihoods but also driving national economic growth. A tech-literate population will attract investment, boost productivity.

                  <strong>A Call to Action</strong>
                  We invite individuals, organizations, and policymakers to join us in this mission to innovate development, eradicate digital illiteracy, and create a future where technology works for everyone.

                  At <i>Late Developers</i>, we are not just teaching programming; we are cultivating a movement—one that will define the next chapter, the next <b>digital native</b>. Let us work together to empower our community, transform our youth, and energize our economy.

                  Together, we code the future.
                </div>
              </article>
          </div>
        </div>
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[90%]" : "relative w-[100%] h-auto" }>
          <h1 className="text-rose-800 text-center" style={{fontSize:"250%"}}>Best Solutions</h1>
          <div className="flex flex-row flex-wrap w-[100%]">
            <div className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions1} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>
            
              <article className="w-[80%] text-left relative left-[10%]">
                <h2><b>Software Development Training</b></h2>
                Late Developers will offer comprehensive training in programming languages, software development frameworks, and tools to equip individuals with the skills needed for careers in tech. This includes courses in front-end and back-end development, mobile app development, and software engineering.
              </article>

            </div>
            <div className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions3} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>

              <article className="w-[80%] text-left relative left-[10%]">
              <h2><b>Custom Software Solutions for Businesses</b></h2>

                We will develop tailor-made software applications to help Kenyan businesses streamline operations, improve productivity, and enhance customer experiences. These solutions include enterprise resource planning (ERP) systems, point-of-sale (POS) applications, and customer relationship management (CRM) platforms.
              </article>

            </div>
            <div style={{background:"#000",color:"#fff"}} className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions2} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>

              <article className="w-[80%] text-left relative left-[10%]">
              <h2><b>Digital Literacy and E-Learning Platforms</b></h2>

              To bridge the digital divide, Late Developers will design and implement e-learning platforms and digital literacy programs, making education accessible to underserved communities
              </article>

            </div>
            <div className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions4} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>

              <article className="w-[80%] text-left relative left-[10%]">
              <h2><b>Innovative Tech for Social Good</b></h2>

              Addressing societal challenges is at the heart of our mission. We aim to create solutions for areas like healthcare (e.g., telemedicine platforms), education (e.g., virtual classrooms), and agriculture (e.g., smart farming apps) to drive social and economic development.
              </article>

            </div>
          </div>
        </div>
        <div className={windowWidth > 800 ? "w-[100%] h-[30%] grid justify-items-center" : "w-[100%] h-[auto] grid justify-items-center"} style={{background:"linear-gradient(to right, rgb(136 19 55 / var(--tw-text-opacity, 1)) 0%, rgba(245, 182, 193, 1) 100%)"}}>
          <div className="w-[60%] h-[100%] text-center justify-text rounded text-black">
              <h1 style={{fontSize:"200%",textDecoration:"underline",color:"#4"}}>Subscribe To Our Newsletters</h1>
              <p>Cloud technology is changing, AI trends are outpacing norm jobs, are tech jobs at risk. What can tech do for your business, the next unicorn. Much more to learn, are you <strong>late</strong>? Not really. But don't be left behind</p>
              <Link href="/newsletter" className="underline">SUBSCRIBE</Link>
          </div>
        </div>
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[90%]" : "relative w-[100%] h-auto" }>
          <h1 className="text-rose-800 text-center" style={{fontSize:"250%"}}>Accreditions</h1>
          <article className="w-[80%] text-justify relative left-[10%]">
            Accreditation is a cornerstone for building trust, credibility, and legitimacy in any educational or service-oriented institution. For Late Developers, incorporating accreditation into our website is not just a formality—it’s a vital component that underscores our commitment to excellence, quality, and accountability.
          </article>
          <div className="w-[100%]">
            <Slider {...settings}>
              {
                  accreditors.map(({image,name,link},index) => 
                  (
                      <div className="w-[23%] m-[1%]" key={index}>
                          <a href={link}>
                              <Image src={image} alt="<i>Late Developers</i>" style={{height:"150px"}} className="w-[40%] object-contain"/>

                          </a>
                          {/* <h3>{name}</h3> */}
                      </div>
                  )
                  )
              }
            </Slider>
          </div>
        </div>
        
      {/* </div> */}
    </>

    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //     <div>
    //       <p className="w-[50%]">WELCOME</p>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
