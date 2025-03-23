// import { hash } from "bcrypt";
// import db from "./../Signin/lib/database";
import axios from "axios"
import {NextResponse} from "next/server"

export async function POST(req, res) {

  const body = await req.json();
  const { session, data, payment } = body;

  try {
    const response = await axios.post(`${process.env.BACKEND_API}/netlify/payment/paypal`,
      {session, data, payment},
      {
       headers: {
         'Content-Type': 'application/json',
       },
    });
    
    if(response.data.status)
      return NextResponse.json({ message: "Payment added successfully", status:true },{status:200});
    else
      return NextResponse.json({ message: "Try again", status:false },{status:500});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}