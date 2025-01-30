import db from "./../Signin/lib/database";
import {NextResponse} from "next/server"

export async function POST(request) {

  try {
    // Update the database to set is_logged_in = 0
    const body = await request.json();
    const {id} = body
    await db.query("UPDATE users SET is_logged_in = 0 WHERE id = ?", [id]);

    return NextResponse.json({ message: "User logged out successfully" }, {status:200});
  } catch (error) {
    console.error("Error updating logout status:", error);
    return NextResponse.json({ message: "Internal server error" + error.message },{status:500});
  }
}