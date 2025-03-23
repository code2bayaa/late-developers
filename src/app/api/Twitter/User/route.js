import { NextResponse } from "next/server";
import needle from "needle";

export async function GET(){

    try{
    const endpointURL = `https://api.twitter.com/2/users/by?usernames=`
    const params = {
        usernames: "TwitterDev,TwitterAPI", // Edit usernames to look up
        "user.fields": "created_at,description", // Edit optional query parameters here
        "expansions": "pinned_tweet_id"
    }
        // this is the HTTP header that adds bearer token authentication
        const res = await needle("get", endpointURL, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            authorization: `Bearer ${process.env.bearer_token}`
        },
        });

    return NextResponse.json({body:res.body, status:true},{status:200})
    }catch(error){
    return NextResponse.json({message:error.message, status:false},{status:500})
    }
}