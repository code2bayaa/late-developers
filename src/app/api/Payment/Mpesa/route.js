// import TOKEN from "./lib/route";
import {NextResponse} from "next/server"
// import { hash } from "bcrypt";
import axios from "axios";
// import db from "@/app/api/Signin/lib/database"

export async function POST(request){
    const body = await request.json();
    const { total, session } = body;
  
    try {

      const response = await axios.post(`${process.env.BACKEND_API}/netlify/payment/mpesa`,
        {session},
        {
         headers: {
           'Content-Type': 'application/json',
         },
      });

      if(response.data.status)
          return NextResponse.json({ message: 'Mpesa process commenced', status:true, data:response.data.data },{status:200});
      else
        return NextResponse.json({ message: 'Try again', status:false },{status:500});

    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}
