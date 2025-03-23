import { NextResponse } from "next/server";
import needle from "needle";

export async function POST(request, response){
    
    try{
        const {tweet_id} = await request.json()
        const endpointURL = `https://api.twitter.com/2/tweets/${tweet_id}/retweeted_by`
        const params = {
            "tweet.fields": "lang,author_id", // Edit optional query parameters here
            "user.fields": "created_at", // Edit optional query parameters here
        }
        // this is the HTTP header that adds bearer token authentication
        const res = await needle("get", endpointURL, params, {
            headers: {
                "User-Agent": "v2RetweetedByUsersJS",
                authorization: `Bearer ${process.env.bearer_token}`
            },
        });

        return NextResponse.json({body:res.body, status:true},{status:200})
    }catch(error){
        return NextResponse.json({message:error.message, status:false},{status:500})
    }
    //check more page button hasNext
}