import { hash } from "bcrypt";
import db from "@/app/api/Signin/lib/database";
import {NextResponse} from "next/server"

export async function POST(req, res) {

    const body = await req.json();
  const { name, email, password, telephone, randomCode } = body;

  try {
    // Check if the user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log(existingUser)
    if (existingUser.length > 0) {
      return NextResponse.json({ message: "User already exists", status:false },{status:400});
    }

    const constantSalt = "$2b$10$ABCDEFGHIJKLMNOPQRSTUV";
    // Hash the password
    const hashedPassword = await hash(password, constantSalt);

    
    // Insert the user into the database
    await db.query(
      "INSERT INTO users (name, email, password, telephone, is_logged_in, verification) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, telephone, 0, JSON.stringify({verify:randomCode})]
    );

    // return NextResponse.json({ message: "User created successfully", status:true, randomCode },{status:200});
    return new Response(JSON.stringify({ message: "User created successfully", status:true, randomCode },{status:200}));
  } catch (error) {
    console.error(error);
    // return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
    return new Response(JSON.stringify({ message: "Internal server error" + error.message, status:false },{status:500}))
  }
}