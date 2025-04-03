import db from "./../Signin/lib/database";
import {NextResponse} from "next/server"
import axios from "axios"

export async function POST(request){
    const body = await request.json();
    const { session } = body;
  
    try {

      const response = await axios.post(`${process.env.BACKEND_API}/netlify/profile`,
        {session},
        {
          headers: {
            'Content-Type': 'application/json',
          },
      });
  
      if (response.data.status) {
        return NextResponse.json({ message: 'Fetched successfully', profile_array: response.data.profile_array },{status:200});
      } else {
        return NextResponse.json({ message: 'Invalid credentials' },{status:401});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}
