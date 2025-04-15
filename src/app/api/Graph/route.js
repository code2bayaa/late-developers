import {NextResponse} from "next/server"
import axios from "axios"

export async function GET(request){
    try{
      
        const response = await axios.get(`${process.env.BACKEND_API}/netlify/report`,
            {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if(response.data.status)
            return NextResponse.json({ message: "Fetched successfully", status:true, data : response.data.results },{status:200});
        else
            return NextResponse.json({ message: "Error updating the database", status:false, data : response?.data?.results },{status:200});
    
    }catch(error){
        return NextResponse.json({error},{status:500})
    }
}
