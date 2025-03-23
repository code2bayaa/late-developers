// import db from "./../../Signin/lib/database";
import {NextResponse} from "next/server"
import axios from "axios"

export async function POST(request){
    const body = await request.json();
    let { table, session, data } = body;
  
    try {

      const response = await axios.post(`${process.env.BACKEND_API}/netlify/profile/update`,
        {session, data, payment},
        {
          headers: {
            'Content-Type': 'application/json',
          },
      });

      if(response.data.status){
        return NextResponse.json({ message: 'Updated successfully', status:true, data:response.data.data[0] },{status:200});
      } else {
        return NextResponse.json({ message: 'Invalid credentials' },{status:401});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}
