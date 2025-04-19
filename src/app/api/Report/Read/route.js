import {NextResponse} from "next/server"
import axios from "axios"


export async function GET(){
    // const body = await request.json();
    // const { time, locations, date, browser, user } = body;
  
    try {

      const response = await axios.get(`${process.env.BACKEND_API}/report/get`);
  
      if (response.data.status) {  
        return NextResponse.json({ message: 'Report fetched', status:true, data:response.data.data, users:response.data.users },{status:200});
      } else {
        return NextResponse.json({ message: response.data.message },{status:200});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}