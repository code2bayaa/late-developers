import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request){
    try{
        // const body = request.json()
        // console.log(body,"body")
        // console.log(process.env.CJ_API_URL,process.env.CJ_API_KEY)
        const response = await axios.get(`${process.env.CJ_API_URL}/api/product/search`,{
            headers:{
                "Authorization":`Bearer ${process.env.CJ_API_KEY.trim()}`,
                'Content-Type': 'application/json'
            },
            params: {
                keyword: "tech",
                pageNum: 1,
                pageSize: 20
              }
        })
        // console.log(response)
        // console.log(response.data)
        return NextResponse.json({message:"hello world",data:response.data},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
    
}