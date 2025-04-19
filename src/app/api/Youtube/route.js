import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(request){

    try{

        const body = await request.json()
        const {pageToken} = body

        // console.log(pageToken,"pageToken")
        const response = await axios.get(`${process.env.youtube_videos}search?key=${process.env.youtube_API_KEY}&channelId=${process.env.youtube_CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=10${pageToken ? `&pageToken=${pageToken}` : ''}`,
            {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // console.log(response,"response")
        return NextResponse.json({body:response.data, status:true},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:error.message, status:false},{status:500})
    }
}
