"use client"
import {useEffect, useState} from "react"
import {blogs} from "@/components/constants.jsx"
import SNIPPET from "@/components/blogs.jsx"
const BLOGS = () => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.screen.width)
    },[])
    return (
        <>
            <div className={windowWidth > 800 ? "flex flex-row w-[100%] relative min-h-[100%]" : "flex flex-col w-[100%] min-h-[100%]" }>
                <div className="w-[95%] m-[2.5%] h-[auto]">
                    {
                        blogs.map(({img,title,header,description},index) => 
                            <SNIPPET img={img} title={title} header={header} description={description} key={index}/>
                        )
                    }
                </div>
            </div>
        </>

    )
}

export default BLOGS