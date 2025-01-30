import { hash } from "bcrypt";
import db from "./../Signin/lib/database";
import {NextResponse} from "next/server"

export async function POST(req, res) {

    const body = await req.json();
  const { email } = body;

  try {
    // Check if the user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log(existingUser)
    if (existingUser.length === 0) {
      return NextResponse.json({ message: "User does not exists", status:false },{status:400});
    }

    const constantSalt = "$2b$10$ABCDEFGHIJKLMNOPQRSTUV";
    // Hash the password
    const hashedForgot = await hash(Math.floor(1000 + Math.random() * 9000).toString(), constantSalt);

    const update_verify = JSON.parse(existingUser[0].verification)
    update_verify.forgot = hashedForgot
    // Insert the user into the database
    await db.query('UPDATE users SET verification = ? WHERE id = ?', [JSON.stringify(update_verify),existingUser[0].id]);

    return NextResponse.json({ message: "Process started successfully", status:true, code:hashedForgot },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}