import { useEffect, useRef, useState } from "react"
import $ from "jquery"
import Image from "next/image"

const SNIPPET = ({setLigthDescription,setLightHeader,showMore,img,title,header,description}) => {

    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        console.log(description)
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    },[])
    const blogDiv = useRef(null)
    const [slide, setSlide] = useState(false)
    const seeMore = (e) => {
        if(windowWidth > 800){
            if(!slide){
                $(blogDiv.current).removeClass("hidden")
                $(blogDiv.current).slideDown("slow")
                e.target.innerText = "View Less"
            }else{
                $(blogDiv.current).slideUp("fast")
                $(blogDiv.current).addClass("hidden")
                e.target.innerText = "Read More"
            }
        }else{
            if(!slide){
                $(showMore.current).slideUp("fast")
                $(showMore.current).addClass("hidden")
                e.target.innerText = "Read More"
            }else{
                setLigthDescription(description)
                setLightHeader(header)
                $(showMore.current).removeClass("hidden")
                $(showMore.current).slideDown("slow")
                e.target.innerText = "View Less"
            }
        }

        setSlide(!slide)
    }
    return (
        <div className="w-[100%] h-[auto] transparent text-left">
            <div className="w-[100%] transparent">
                <Image src={img} alt="late developers https://late-developers.com" width={500} height={700} className={windowWidth > 800 ? "w-[100%] h-[300px] object-cover " : "w-[100%] h-[150px] object-cover"}/>
                <h1 style={{fontWeight:"bolder",fontSize:"300%"}}>{title}</h1>
                <p className="text-[rgba(0,0,0,0.75)]">{
                        description && description.props.children[0].props.children[1].length > 200
                        ? `${description.props.children[0].props.children[1].slice(0,200)}...` 
                        : `${description.props.children[0].props.children[1]}...` 
                   }
                </p>
                <button
                 onClick={(e) => seeMore(e)}
                 style={{height:"60px",width:windowWidth > 800 ? "40%" : "60%",borderRadius:"5px",border:"4px solid #fff",backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)",color:"#fff"}}
                 >
                    Read More
                 </button>
            </div>
            <div ref={blogDiv} className="hidden w-[100%] transparent">
                <h1 style={{textDecoration:"underline",fontSize:"180%"}}>{header}</h1>
                {description}
            </div>
            <hr className="border-[5px]"/>
        </div>
    )
}

export default SNIPPET