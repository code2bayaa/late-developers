
import oauth2Client from "@/components/youtube.js";
import { NextResponse } from "next/server";

  export async function GET(){
    try {
        // console.log(oauth2Client, "oauth2Client")
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/youtube.force-ssl"
            ]
          });

          return NextResponse.redirect(authUrl, 302);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message, status: false }, { status: 500 });
    }
  }