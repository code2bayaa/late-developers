import {NextResponse} from "next/server"
import axios from "axios"


export async function POST(request){
    const body = await request.json();
    const { time, locations, date, browser, user } = body;
  
    try {

      const response = await axios.post(`${process.env.BACKEND_API}/user/report`,
        {time, locations, date, browser, user},
        {
          headers: {
            'Content-Type': 'application/json',
          },
      });
  
      if (response.data.status) {  
        return NextResponse.json({ message: 'Report made', status:true },{status:200});
      } else {
        return NextResponse.json({ message: response.data.message },{status:200});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}