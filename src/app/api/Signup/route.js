// import { hash } from "bcrypt";
// import db from "../Signin/lib/database";
import {NextResponse} from "next/server"
import axios from "axios";

export async function POST(req, res) {

  const body = await req.json();
  const { name, email, password, telephone, randomCode } = body;

  try {
    const response = await axios.post(`${process.env.BACKEND_API}/netlify/signup`,
      {name, email, password, telephone, randomCode},
      {
        headers: {
          'Content-Type': 'application/json',
        },
    });

    if(response.data.status)
      return NextResponse.json({ message: "User created successfully", status:true, randomCode },{status:200});
    else
      return NextResponse.json({ message: response.data.message, status:false },{status:500});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}