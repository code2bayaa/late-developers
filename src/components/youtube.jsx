"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import swal from "sweetalert"
import {social} from "@/assets"
import dynamic from "next/dynamic";
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

const YOUTUBE = () => {
    const [data, setData] = useState({})
    const [pageToken, setPageToken] = useState(null)
    const [windowWidth, setWindowWidth] = useState(0)
    const [statsPage, setStatsPage] = useState({})
    const [comment, setComment] = useState("")
    useEffect(() => {
        async function runVideos(){

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Youtube`,{
                cache: "no-store",
                method: 'POST', // HTTP method
                headers: {
                  'Content-Type': 'application/json', // Indicates the body is JSON
                },
                body: JSON.stringify({
                  pageToken
                }), // Convert the data object to JSON
              })
              const {body, status} = await res.json()
            //   console.log(body,"body")
              if(!status){
                swal("oops","could not fetch tweets","error")
              }
              body.items.map(({id}) => {
                setStatsPage(() => getStats(id?.videoId))
              })
              setData(() => ({...body}))
        }
        runVideos()
        const handleResize = () => setWindowWidth(window.screen.width)
        handleResize()
    },[])

    const getDate = (date) => {
        const aDate = new Date(date)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return aDate.toLocaleDateString(undefined, options)
    }

    const getStats = async(id) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Youtube/Statistics`,{
            cache: "no-store",
            method: 'POST', // HTTP method
            headers: {
              'Content-Type': 'application/json', // Indicates the body is JSON
            },
            body: JSON.stringify({
              id
            }), // Convert the data object to JSON
          })
          const {body, status} = await res.json()  
        //   console.log(body)  
        if(!status){
            return swal("oops","could not fetch videos","error")
        }
          const {statistics} = body.items[0]
          setStatsPage(() => statistics)
        //   if(status){
        //     const {statistics} = body.items[0]
        //     const {viewCount, likeCount, commentCount} = statistics
        //     return (
        //         <div className="w-[100%] flex flex-row justify-between items-center">
        //             <p><span>Views:</span> {viewCount}</p>
        //             <p><span>Likes:</span> {likeCount}</p>
        //             <p><span>Comments:</span> {commentCount}</p>
        //         </div>
        //     )
        //   }
        //   return (
        //     <p>No views</p>
        //   )
              

    }

    // const addComment = async(videoId) => {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Youtube/Comment/Upload`,{
    //         cache: "no-store",
    //         method: 'POST', // HTTP method
    //         headers: {
    //           'Content-Type': 'application/json', // Indicates the body is JSON
    //         },
    //         body: JSON.stringify({
    //           comment,
    //           videoId
    //         }), // Convert the data object to JSON
    //       })
    //       const {body, status} = await res.json() 
    // }


    return (
        <div className="w-[100%] bg-[#000] h-[auto] min-h-[100%] text-white">
            {
                data && data.hasOwnProperty("regionCode") && data.hasOwnProperty("items") ? 
                    <div className={windowWidth > 800 ? "w-[80%] mx-[10%]":"w-[95%] mx-[2.5%]"} style={{borderLeft:"1px solid #fff"}}>
                        
                        <h3>{data?.regionCode}</h3>
                        {
                            data?.items.map(({snippet, id},index) => (
                                <div key={index} className={windowWidth > 800 ? "w-[100%] h-[auto] flex flex-row":"w-[100%] flex flex-col"} style={{borderBottom:"1px solid #fff"}}>
                                    <div className={windowWidth > 800 ? "w-[50%] m-[1%]":"w-[98%] m-[1%]"}>
                                        {
                                            snippet.hasOwnProperty("thumbnails") ? 
                                                <Image src = {snippet?.thumbnails?.high?.url} alt={id} width={100} height={100} className="w-[60%] object-contain"/>
                                            :
                                                <Image src = {social} alt={id} width={200} height={200} className="w-[60%] object-contain"/>

                                        }
                                    </div>
                                    <div className={windowWidth > 800 ? "w-[48%] h-[auto]":"w-[98%] m-[1%]"}>
                                        <Plyr
                                            source={{
                                                type:"video",
                                                sources: [
                                                {
                                                    src: id?.videoId, // YouTube video ID
                                                    provider: "youtube",
                                                },
                                                ],

                                            }}
                                            options= {{
                                                autoplay: false,
                                                muted: true,
                                                controls: ["play"],
                                            }
                                            }
                                        />
                                        <div className="w-[100%] flex flex-row justify-between items-center">
                                            <p><span>Comments:</span> {statsPage?.commentCount}</p>
                                            <p><span>Likes:</span> {statsPage?.likeCount}</p>
                                            <p><span>Views:</span> {statsPage?.viewCount}</p>
                                        </div>
                                        <div className="w-[100%] text-white">
                                            <p><span>published:</span> {getDate(snippet?.publishedAt)}</p>
                                            <p>{snippet?.title}</p>
                                            <p>{snippet?.description}</p>
                                        </div>
                                        <div className="w-[100%] flex flex-row justify-between items-center">
                                            {/* <p>Click below to add a comment or like the video</p> */}
                                            <a href={`https://www.youtube.com/watch?v=${id?.videoId}`} target="_blank" rel="noopener noreferrer" className="w-[60%] h-[60px] bg-[#900C3F] text-white flex flex-row justify-center items-center">
                                                <FontAwesomeIcon icon={faEye} style={{fontSize:"200%"}}/>
                                                Comment/Like
                                            </a>

                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                        {
                            data.hasOwnProperty("nextPageToken") ?
                                <div className="w-[100%] flex flex-row justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPageToken(data?.nextPageToken)
                                            setData(() => ({...data, pageToken:data?.nextPageToken}))
                                        }}
                                        className="w-[20%] h-[60px] bg-[#900C3F] text-white"
                                    >
                                        Load More
                                    </button>
                                </div>
                            :
                                ""
                        }

                        
                    </div>
                :
                ""
            }

        </div>
    )
}

export default YOUTUBE