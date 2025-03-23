// import db from "./../Signin/lib/database";
import {NextResponse} from "next/server"
import axios from "axios";

export async function POST(request) {

  try {
    // Update the database to set is_logged_in = 0
    const body = await request.json();
    const {id} = body
    const response = await axios.post(`${process.env.BACKEND_API}/netlify/signout`,
      {id},
      {
        headers: {
          'Content-Type': 'application/json',
        },
    });
    if(response.data.status)
      return NextResponse.json({ message: "User logged out successfully" }, {status:200});
    else
      return NextResponse.json({ message: "Try again" }, {status:400});
  } catch (error) {
    console.error("Error updating logout status:", error);
    return NextResponse.json({ message: "Internal server error" + error.message },{status:500});
  }
}