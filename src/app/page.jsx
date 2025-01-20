"use client"
import Image from "next/image";
// import Plyr from "plyr-react"
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css"
// import { logo1 } from "../assets"
import Slider from "react-slick";
import {clients, accreditors} from "./../components/constants"
import {useLayoutEffect, useEffect, useState} from "react"
import { avatar, solutions1, solutions2, solutions3, solutions4, wave1, wave3 } from "@/assets";
// import waveImage from '@/assets/wave.gif';
import { faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap"
export default function Home() {

  const [plyrMode, setPlyrMode] = useState(null)

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.screen.width);

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize width
    gsap.to("#NavBar",{
      backgroundImage: "linear-gradient( #900C3F , #900c85bd, #900c85bd)",
      color:"#fff",
      duration:3
  })

  gsap.to("#logo",{
      backgroundColor:"#fff",
      duration:3,
      delay:1
  })

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    // dots:false,
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
          dots: true
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
          <div style={{width:windowWidth > 800 ? "40%" : "100%", height:windowWidth > 800 ? "70%" : "100%", position:windowWidth > 800 ? "relative" : "absolute", }} className="flex gap-[2%] grid justify-items-center text-white z-[1] bg-shade">
            {/* <Image src = {wave1} alt="late-developers" style={{height:"50%"}} className="w-[20%] p-0 m-[-1%] z-[2] object-contain"/> */}
            <div className={windowWidth > 800 ? "w-[100%] my-[20%] relative":"w-[100%] relative my-[20%]"}>
              <h1 style={{color:"#000"}}>STILL UNDER CONSTRUCTION</h1>
              <h1 style={{fontSize:windowWidth > 800 ? "300%" : "180%",color:"#000"}}><i><b>Late Developers</b></i></h1>
              
              <h2 style={{fontSize:windowWidth > 800 ? "300%" : "180%"}} className="text-rose-900"><b>ICT SOLUTIONS & SERVICES</b></h2>
              <h3 style={{fontSize:windowWidth > 800 ? "200%" : "150%",color:"#000"}}>late again</h3>
            </div>
          </div>
          {/* {plyrMode} */}
          <Plyr
              source={{
                  type:"video",
                  sources: [
                  {
                      src: "i929cusfg60", // YouTube video ID
                      provider: "youtube",
                  },
                  ],

              }}
              options= {{
                autoplay: true,
                muted: true,
                controls: ["play"],
              }
            }
          />
        </div>
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[60%]" : "relative w-[100%] h-auto" }>
          <div className={windowWidth > 800 ? "w-[80%] h-[100%] relative left-[10%] bg-[#E1F977] text-[#411342] flex flex-row":"w-[100%] h-[100%] relative bg-[#E1F977] text-[#411342] flex flex-col"}>
            <article className={windowWidth > 800 ? "w-[48%] m-[1%] text-center ":"w-[98%] m-[1%] text-center "}>
              <FontAwesomeIcon style={{fontSize:"400%",color:"#411342",textAlign:"center"}} icon={faHeart}/>
              <h1 style={{fontSize:"250%",textAlign:"center"}}>MISSION</h1>
              To empower communities by embracing digital skills, through creativity and innovation contribute and develop to both the industry and the economy
            </article>
            <article className={windowWidth > 800 ? "w-[48%] m-[1%] text-center ":"w-[98%] m-[1%] text-center "}>
              <FontAwesomeIcon style={{fontSize:"400%",color:"#411342",textAlign:"center"}} icon={faHandFist}/>
              <h1 style={{fontSize:"250%",textAlign:"center"}}>VISION</h1>
              To be a leading hub for innovation and digital transformation globally, empowering individuals and businesses with world-class technological skills and solutions to drive sustainable development and economic growth.
            </article>
          </div>
        </div>
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[50%]" : "relative w-[100%] h-auto" }>
          <h1 style={{textAlign:"center",fontSize:"300%"}}>OUR CLIENTS</h1>
          <div className="w-[100%]">
            <Slider {...settings}>
              {
                  clients.map(({image,name,link},index) => 
                  (
                      <div className="w-[23%] m-[1%]" key={index}>
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
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[60%] bg-[#411342]" : "relative w-[100%] h-auto bg-[#411342]" }>
          <Image src = {avatar} alt="late-developers" style={{height:windowWidth ? "100%" : "50%"}} className={windowWidth > 800 ? "float-left w-[20%] p-0 m-[-1%] z-[2] object-contain" : "w-[100%] object-contain"}/>
          <div className="w-[98%] m-[1%] text-center">
              <h1 className="text-rose-800" style={{fontSize:"180%"}}>Quality Means No Compromise</h1>
              <article className="p-[2px]  text-white">
                At <i>Late Developers</i>, we recognize that technology is more than just a tool; it is an enabler. By equipping young people with programming and digital skills, we empower them to innovate, create, and thrive in a competitive global marketplace. Our programming school curriculum is designed not just to teach coding but to inspire problem-solving, critical thinking, and creativity—skills that are indispensable in the 21st century.
                Catalyzing Economic Growth
                The economic impact of digital literacy cannot be overstated. As Kenya seeks to solidify its position as a technological hub in Africa, a skilled workforce is essential. <i>Late Developers</i> is committed to producing tech talent that will contribute to key industries such as finance, healthcare, education, and agriculture.

                By fostering innovation, we are not only enhancing individual livelihoods but also driving national economic growth. A tech-literate population will attract investment, boost productivity, and position Kenya as a leader in the global digital economy.

                A Call to Action
                As the founder of <i>Late Developers</i>, I believe in the power of collaboration. Together, we can build a Kenya where no one is left behind in the digital age. We invite individuals, organizations, and policymakers to join us in this mission to innovate development, eradicate digital illiteracy, and create a future where technology works for everyone.

                At <i>Late Developers</i>, we are not just teaching programming; we are cultivating a movement—one that will define the next chapter of Kenya’s growth story. Let us work together to empower our community, transform our youth, and energize our economy.

                Together, we code the future.
              </article>
          </div>
        </div>
        <div className = {windowWidth > 800 ? "relative w-[100%] h-[90%]" : "relative w-[100%] h-auto" }>
          <h1 className="text-rose-800 text-center" style={{fontSize:"250%"}}>Best Solutions</h1>
          <div className="flex flex-row flex-wrap w-[100%]">
            <div className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions1} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>
            
              <article className="w-[80%] text-center relative left-[10%]">
                <h2><b>Software Development Training</b></h2>
                Late Developers will offer comprehensive training in programming languages, software development frameworks, and tools to equip individuals with the skills needed for careers in tech. This includes courses in front-end and back-end development, mobile app development, and software engineering.
              </article>

            </div>
            <div className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions3} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>

              <article className="w-[80%] text-center relative left-[10%]">
              <h2><b>Custom Software Solutions for Businesses</b></h2>

                We will develop tailor-made software applications to help Kenyan businesses streamline operations, improve productivity, and enhance customer experiences. These solutions include enterprise resource planning (ERP) systems, point-of-sale (POS) applications, and customer relationship management (CRM) platforms.
              </article>

            </div>
            <div className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions2} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>

              <article className="w-[80%] text-center relative left-[10%]">
              <h2><b>Digital Literacy and E-Learning Platforms</b></h2>

              To bridge the digital divide, Late Developers will design and implement e-learning platforms and digital literacy programs, making education accessible to underserved communities
              </article>

            </div>
            <div className={windowWidth > 800 ? "w-[23%] m-[1%] shadow-md grid items-center" : "w-[98%] m-[1%] shadow-md grid items-center"}>
              <Image src = {solutions4} alt="late-developers" style={{height:"200px"}} className="w-[100%]"/>

              <article className="w-[80%] text-center relative left-[10%]">
              <h2><b>Innovative Tech for Social Good</b></h2>

              Addressing societal challenges is at the heart of our mission. We aim to create solutions for areas like healthcare (e.g., telemedicine platforms), education (e.g., virtual classrooms), and agriculture (e.g., smart farming apps) to drive social and economic development.
              </article>

            </div>
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
