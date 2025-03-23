// import { hash } from "bcrypt";
// import db from "@/app/api/Signin/lib/database"
import {NextResponse} from "next/server"
import axios from "axios"
export async function POST(req, res) {

    const body = await req.json();
  const { form } = body;

  try {
      // Check if the user already exists
    //   const [existingUser] = await db.query(
    //     "SELECT * FROM users WHERE email = ?",
    //     [session]
    //   );

    //   if (existingUser.length !== 1) {
    //     return NextResponse.json({ message: "Invalid session", status:false },{status:400});
    //   }
      
    // const results = await db.query(
    //     "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)",
    //     [form.name, form.email, form.message]
    // );
    // console.log(results)

    const response = await axios.post(`${process.env.BACKEND_API}/netlify/feedback`,
       form,
       {
        headers: {
          'Content-Type': 'application/json',
        },
    });
    
    if(response.data.status)
      return NextResponse.json({ message: "Feedback added successfully", status:true, results : response.data.results },{status:200});
    else
      return NextResponse.json({ message: "Error updating the database", status:false, results : response?.data?.results },{status:200});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}