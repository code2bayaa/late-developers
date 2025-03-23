// import { hash } from "bcrypt";
// import db from "@/app/api/Signin/lib/database"
import {NextResponse} from "next/server"
import axios from "axios";

export async function POST(req, res) {

    const body = await req.json();
  const { session, data } = body;

  try {
    const response = await axios.post(`${process.env.BACKEND_API}/netlify/orders/add`,
      {session, data},
      {
       headers: {
         'Content-Type': 'application/json',
       },
    });
    if(response.data.status)
      return NextResponse.json({ message: "Order added successfully", status:true },{status:200});
    else
      return NextResponse.json({ message: "Try again", status:false },{status:500});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}