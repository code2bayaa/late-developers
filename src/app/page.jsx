"use client"
import Image from "next/image";
// import Plyr from "plyr-react"
import dynamic from "next/dynamic";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css"
// import { logo1 } from "../assets"
import Slider from "react-slick";
import {clients} from "./../components/constants"
import {useLayoutEffect, useEffect, useState} from "react"

export default function Home() {

  const [plyrMode, setPlyrMode] = useState(null)

  // useLayoutEffect(() => {

  //   const implementPlyr = async() => {
  //     const myModule = await import("plyr-react");
  //     const Plyr = myModule.default

  //     // console.log(Plyr)
  //     setPlyrMode(<Plyr 
  //       source={{
  //         type:"video",
  //         sources: [
  //         {
  //             src: "i929cusfg60", // YouTube video ID
  //             provider: "youtube",
  //         },
  //         ],

  //       }}
  //       options= {{
  //         autoplay: true,
  //         muted: true,
  //         controls: ["play"],
  //       }}
  //     />)
  //   }

  //   implementPlyr()
  // },[])

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
        <div className = "relative w-[100%] h-[100%]">
          <div style={{height:"800px",background:"linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.95),rgba(0,0,0,0.65))"}} className="flex gap-[2%] text-white w-[100%] h-[100%] z-[1] bg-shade absolute">
            {/* <Image src = {logo1} alt="late-developers" style={{height:"50%"}} className="w-[20%] p-0 m-[-1%] z-[2] object-contain"/> */}
            <div className="w-[100%] my-[20%]">
              <h1 style={{fontSize:"300%"}}>LATE DEVELOPERS</h1>
              
              <h2 style={{fontSize:"300%"}}>ICT SOLUTIONS & SERVICES</h2>
              <h3 style={{fontSize:"200%"}}>late again</h3>
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
        <div className = "relative w-[100%] h-[40%]">
          <h1 style={{textAlign:"center",fontSize:"300%"}}>OUR CLIENTS</h1>
          <div className="w-[100%]">
            <Slider {...settings}>
              {
                  clients.map(({image,name,link},index) => 
                  (
                      <div className="w-[23%] m-[1%]" key={index}>
                          <a href={link}>
                              <Image src={image} alt="late developers" style={{height:"150px"}} className="w-[40%] object-contain"/>

                          </a>
                          <h3>{name}</h3>
                      </div>
                  )
                  )
              }
            </Slider>
          </div>
          <h1>STILL IN CONSTRUCTION</h1>
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
