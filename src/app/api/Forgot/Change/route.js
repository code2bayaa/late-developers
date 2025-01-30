import db from "./../../Signin/lib/database";
import {NextResponse} from "next/server"
import { hash } from "bcrypt";

export async function POST(req, res) {

    const body = await req.json();
  const { code, password } = body;

  try {
    console.log(code,"code")
    // Check if the user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE verification LIKE ?",
      [`%"forgot":"${code}"%`]
    );

    if (existingUser.length === 0) {
      return NextResponse.json({message: "Link already used", status:false},{status:400});
    }
    
    const constantSalt = "$2b$10$ABCDEFGHIJKLMNOPQRSTUV";

    const hashedPassword = await hash(password, constantSalt);

    const update_verify = JSON.parse(existingUser[0].verification)
    update_verify.forgot = false
    // Insert the user into the database
    await db.query('UPDATE users SET verification = ?, password = ? WHERE id = ?', [JSON.stringify(update_verify),hashedPassword,existingUser[0].id]);

    return NextResponse.json({ message: "Changed successfully", status:true },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" + error.message, status:false },{status:500});
  }
}