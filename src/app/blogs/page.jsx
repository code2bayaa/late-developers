"use client"
import {useEffect, useState, useRef} from "react"
import {blogs} from "@/components/constants.jsx"
import SNIPPET from "@/components/blogs.jsx"
const BLOGS = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [lightDescription,setLigthDescription] = useState(blogs[0].description)
    const [lightHeader,setLightHeader] = useState(blogs[0].header)

    const showMore = useRef(null)

    useEffect(() => {
        setWindowWidth(window.screen.width)
    },[])
    return (
        <>
            <div className={windowWidth > 800 ? "flex flex-row w-[100%] relative min-h-[100%]" : "flex flex-col w-[100%] min-h-[100%]" }>
                <div className={windowWidth > 800 ? "w-[30%] h-[auto]":"w-[95%] m-[2.5%] h-[auto]"}>
                    {
                        blogs.map(({img,title,header,description},index) => 
                            <SNIPPET windowWidth={windowWidth} setLightHeader={setLightHeader} setLigthDescription={setLigthDescription} showMore={showMore} img={img} title={title} header={header} description={description} key={index}/>
                        )
                    }
                </div>
                {
                    windowWidth > 800 ? 
                        <div ref={showMore} className="w-[70%] h-[auto]">
                            <h1 style={{textDecoration:"underline",marginLeft:"10%",fontSize:"150%"}}>{lightHeader}</h1>
                            {lightDescription}
                        </div>
                    :
                        ""
                }
            </div>
        </>

    )
}

export default BLOGS