import { useRef, useState } from "react"
import $ from "jquery"

const SNIPPET = ({title,header,description}) => {

    const blogDiv = useRef(null)
    const [slide, setSlide] = useState(false)
    const seeMore = (e) => {
        if(!slide){
            $(blogDiv.current).removeClass("hidden")
            $(blogDiv.current).slideDown("slow")
            e.target.innerText = "View Less"
        }else{
            $(blogDiv.current).slideUp("fast")
            $(blogDiv.current).addClass("hidden")
            e.target.innerText = "Read More"
        }
        setSlide(!slide)
    }
    return (
        <div className="w-[100%] h-[auto] transparent text-center">
            <div className="w-[100%] transparent">
                <h1 style={{fontWeight:"bolder",fontSize:"300%"}}>{title}</h1><hr/>
                <button
                 onClick={(e) => seeMore(e)}
                 style={{height:"60px",width:"40%",borderRadius:"5px",border:"4px solid #fff",backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)",color:"#fff"}}
                 >
                    Read More
                 </button>
            </div>
            <div ref={blogDiv} className="hidden w-[100%] transparent">
                <h1 style={{textDecoration:"underline",fontSize:"180%"}}>{header}</h1>
                {description}
            </div>
        </div>
    )
}

export default SNIPPET