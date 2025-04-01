import {NextResponse} from "next/server"
import axios from "axios"


export async function POST(request){
    const body = await request.json();
    const { time, user, date } = body;
  
    try {

      const response = await axios.post(`${process.env.BACKEND_API}/user/update`,
        {time, user, date},
        {
          headers: {
            'Content-Type': 'application/json',
          },
      });
  
      if (response.data.status) {  
        return NextResponse.json({ message: 'Report Updated', status:true },{status:200});
      } else {
        return NextResponse.json({ message: 'Invalid credentials' },{status:401});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}