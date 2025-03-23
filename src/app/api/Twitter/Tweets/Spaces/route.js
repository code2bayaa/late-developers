import { NextResponse } from "next/server";
import needle from "needle";

export async function GET(){

    try{
    const endpointURL = `https://api.twitter.com/2/tweets/counts/recent`
    const params = {
        'query': 'from:twitterdev',
        'granularity': 'day'
    }
        // this is the HTTP header that adds bearer token authentication
        const res = await needle("get", endpointURL, params, {
            headers: {
                "User-Agent": "v2RecentTweetCountsJS",
                authorization: `Bearer ${process.env.bearer_token}`
            },
        });

        return NextResponse.json({body:res.body, status:true},{status:200})
    }catch(error){
        return NextResponse.json({message:error.message, status:false},{status:500})
    }
    //check more page button hasNext
}