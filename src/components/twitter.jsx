"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import swal from "sweetalert"
import {social} from "@/assets"
const TWITTER = () => {
    const [data, setData] = useState({})
    const [windowWidth, setWindowWidth] = useState(0)
    useEffect(() => {
        async function runLikes(){

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Twitter/Tweets`)
              const {body, status} = await res.json()
              console.log(body)
              if(!status){
                swal("oops","could not fetch tweets","error")
              }
              setData(() => ({...body}))
              console.log
        }
        runLikes()
        const handleResize = () => setWindowWidth(window.screen.width)
        handleResize()
    },[])

    return (
        <div className="w-[100%] bg-[#000] text-white">
            {
                data.hasOwnProperty("data") ? 
                    <div className={windowWidth > 800 ? "w-[80%] mx-[10%]":"w-[95%] mx-[2.5%]"} style={{borderLeft:"1px solid #fff"}}>
                        {
                            data?.data.map(({text, id, attachments, created_at, author_id},index) => (
                                <div key={index} className={windowWidth > 800 ? "w-[100%] flex flex-row":"w-[100%] flex flex-col"} style={{borderBottom:"1px solid #fff"}}>
                                    <div className={windowWidth > 800 ? "w-[50%] m-[1%]":"w-[98%] m-[1%]"}>
                                        {
                                            attachments ? 
                                                <Image src = {data.includes.media.find(({media_key}) => media_key == attachments?.media_keys[0])?.url} alt={id} width={200} height={200} className="w-[60%] object-contain"/>
                                            :
                                                <Image src = {social} alt={id} width={200} height={200} className="w-[60%] object-contain"/>

                                        }
                                    </div>
                                    <div className={windowWidth > 800 ? "w-[48%]":"w-[98%] m-[1%]"}>
                                        {text}
                                        <p>{created_at}</p>
                                        <a
                                            href={`https://twitter.com/${author_id}/status/${id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: "blue", textDecoration: "underline" }}
                                        >
                                            View Tweet on Twitter
                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                :
                ""
            }

        </div>
    )
}

export default TWITTER