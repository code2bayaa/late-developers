import { NextResponse } from "next/server";
import axios from "axios";
// import needle from "needle";
// import db from "@/app/api/Signin/lib/database"

export async function GET(){

      try{

        const response = await axios.get(`${process.env.BACKEND_API}/netlify/twitter/tweets`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
        });
        console.log(response)
        if(response.data.status)
          return NextResponse.json({body:response.data.body, status:true},{status:200})
        else
          return NextResponse.json({status:false},{status:400})
      }catch(error){
        console.log(error)
        return NextResponse.json({message:error.message, status:false},{status:500})
      }

    //   {
    //     "data": [
    //         {
    //             "text": "@notDiobi Her mom was head of a spiritualist cult convent😒",
    //             "edit_history_tweet_ids": [
    //                 "1873761762912395377"
    //             ],
    //             "id": "1873761762912395377"
    //         },
    //         {
    //             "text": "Programming is the future, and the job market is booming.\nSet your child ready with our kids programming course.\nVery affordable https://t.co/KWrPFW1Izd",
    //             "edit_history_tweet_ids": [
    //                 "1862198871645905125"
    //             ],
    //             "id": "1862198871645905125",
    //             "attachments": {
    //                 "media_keys": [
    //                     "3_1862198868210810880"
    //                 ]
    //             }
    //         }
    //     ],
    //     "includes": {
    //         "media": [
    //             {
    //                 "media_key": "3_1862198868210810880",
    //                 "type": "photo",
    //                 "url": "https://pbs.twimg.com/media/GdfcARjXAAANecn.jpg"
    //             }
    //         ]
    //     },
    //     "meta": {
    //         "result_count": 2,
    //         "newest_id": "1873761762912395377",
    //         "oldest_id": "1862198871645905125"
    //     }
    // }
}

// {"users":[{"id":"1862195582237839360","name":"late developers","username":"latedeveloperz"}],
// "media":[
// {"media_key":"3_1862198868210810880","type":"photo","url":"https://pbs.twimg.com/media/GdfcARjXAAANecn.jpg"}]}

// {"author_id":"1862195582237839360",
// "text":"@notDiobi Her mom was head of a spiritualist cult convent😒",
// "id":"1873761762912395377",
// "edit_history_tweet_ids":["1873761762912395377"],"created_at":"2024-12-30T16:03:11.000Z"}
// {"author_id":"1862195582237839360","text":"Programming is the future, and the job market is booming.\nSet your child ready with our kids programming course.\nVery affordable https://t.co/KWrPFW1Izd","id":"1862198871645905125","edit_history_tweet_ids":["1862198871645905125"],
// "attachments":{"media_keys":["3_1862198868210810880"]},"created_at":"2024-11-28T18:16:23.000Z"}