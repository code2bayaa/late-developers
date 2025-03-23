// import db from "./../Signin/lib/database";
import {NextResponse} from "next/server"
import axios from "axios";

export async function POST(request){
    const body = await request.json();
    const { session } = body;
  
    try {

      const response = await axios.post(`${process.env.BACKEND_API}/netlify/orders`,
        {session},
        {
         headers: {
           'Content-Type': 'application/json',
         },
      });
      if(response.data.status)
        return NextResponse.json({ message: 'Added successfully', orders_array:rows, status:true },{status:200});
      else
        return NextResponse.json({ message: 'Try again', status:false },{status:500});

    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}
