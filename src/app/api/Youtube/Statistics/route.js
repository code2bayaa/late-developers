import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(request){

    try{
        const body = await request.json()
        const {id} = body

        const response = await axios.get(`${process.env.youtube_videos}videos?part=statistics&id=${id}&key=${process.env.youtube_API_KEY}`,
            {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json({body:response.data, status:true},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:error.message, status:false},{status:500})
    }
}
