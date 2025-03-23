import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(request, response){

    const {session} = await request.json()

    try{
      const response = await axios.post(`${process.env.BACKEND_API}/netlify/payment/mpesa/telephone`,
        {session},
        {
         headers: {
           'Content-Type': 'application/json',
         },
      });

      if(response.data.status)
        return NextResponse.json({status:true,message:response.data.message},{status:200})
      else
        return NextResponse.json({status:false},{status:500})
    }catch(error){
         return NextResponse.json({error:error.message},{status:500})
    }

}