import needle from "needle"
import { NextResponse } from "next/server"
import got from 'got';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

export async function POST(request,response){
    try{
        const {id} = await request.json()

        const data = {
            "tweet_id": id
          };
          
          const endpointURL = `https://api.twitter.com/2/users/${process.env.user_id}/likes`;
          const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob';

          const oauth = OAuth({
            consumer: {
              key: process.env.consumer_key,
              secret: process.env.consumer_secret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
          });

          //request token
          const authHeader = oauth.toHeader(oauth.authorize({
            url: requestTokenURL,
            method: 'POST'
          }));
        
          const req = await got.post(requestTokenURL, {
            headers: {
              Authorization: authHeader["Authorization"]
            }
          });

          const oAuthRequestToken = req.body
    }catch(error){

    }

}