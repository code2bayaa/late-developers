// import { hash } from "bcrypt";
// import db from "./../Signin/lib/database";
import {NextResponse} from "next/server"
import axios from "axios";
export async function POST(req, res) {

  const body = await req.json();
  const { email } = body;

  try {
    const response = await axios.post(`${process.env.BACKEND_API}/netlify/forgot`,
      {email},
      {
       headers: {
         'Content-Type': 'application/json',
       },
    });
    console.log(response)
    if(response.data.status)
      return NextResponse.json({ message: "Process started successfully", status:true, code:response.data.hashedForgot },{status:200});
    else
      return NextResponse.json({ message: "Try again!", status:false },{status:500});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}