
import { NextResponse } from "next/server";
import { google } from "googleapis";
  export async function GET(request){

    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get("code");
    
        if (!code) {
            return NextResponse.json({ message: "Authorization code not provided", status: false }, { status: 400 });
        }
        const oauth2Client = new google.auth.OAuth2(
          process.env.youtube_client_id,
          process.env.youtube_client_secret,
          process.env.redirect_uri
        );
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // console.log(tokens, "tokens")
        return NextResponse.json({ message: "Authentication successful", status: true, tokens }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message, status: false }, { status: 500 });
    }
  }