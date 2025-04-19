import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request){

    try{
        const body = await request.json()
        const {comment,videoId} = body
        
        const oauth2Client = new google.auth.OAuth2(
            process.env.youtube_client_id,
            process.env.youtube_client_secret,
            process.env.redirect_uri
          );
        // Set access token
        oauth2Client.setCredentials({ refresh_token: process.env.youtube_refresh_token });
        const youtube = google.youtube({ version: "v3", auth: oauth2Client });
        const response = await youtube.commentThreads.insert({
            part: "snippet",
            requestBody: {
                snippet: {
                    channelId: process.env.youtube_CHANNEL_ID,
                    videoId: videoId,
                    topLevelComment: {
                        snippet: {
                            textOriginal: comment,
                        },
                    },
                },
            },
        });
        return NextResponse.json({body:response.data, status:true},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:error.message, status:false},{status:500})
    }
}
