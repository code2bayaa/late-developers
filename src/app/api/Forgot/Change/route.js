// import db from "./../../Signin/lib/database";
import {NextResponse} from "next/server"
import axios from "axios";
// import { hash } from "bcrypt";

export async function POST(req, res) {

  const body = await req.json();
  const { code, password } = body;

  try {
    const response = await axios.post(`${process.env.BACKEND_API}/netlify/forgot/change`,
      {code, password},
      {
       headers: {
         'Content-Type': 'application/json',
       },
    });
    if(response.data.status)
      return NextResponse.json({ message: "Changed successfully", status:true },{status:200});
    else
      return NextResponse.json({ message: "Try again", status:false },{status:500});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}