import { NextResponse } from "next/server";
import needle from "needle";

export async function GET(){

      try{
        const endpointURL = `https://api.twitter.com/2/users/${process.env.user_id}/liked_tweets`
        const params = {
            "tweet.fields": "lang,author_id", // Edit optional query parameters here
            "user.fields": "created_at", // Edit optional query parameters here
        };
        
          // this is the HTTP header that adds bearer token authentication
          const res = await needle("get", endpointURL, params, {
            headers: {
              "User-Agent": "v2LikedTweetsJS",
              authorization: `Bearer ${process.env.bearer_token}`
            },
          });

        return NextResponse.json({data:res.body, status:true},{status:200})
      }catch(error){
        return NextResponse.json({message:error.message, status:false},{status:500})
      }
}