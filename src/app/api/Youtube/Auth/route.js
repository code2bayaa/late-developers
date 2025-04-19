
import { NextResponse } from "next/server";
import { google } from "googleapis";
  export async function GET(){
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.youtube_client_id,
        process.env.youtube_client_secret,
        process.env.redirect_uri
      );
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