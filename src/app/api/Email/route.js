import {NextResponse} from "next/server"
import nodemailer from "nodemailer"

export async function POST(req){

    const body = await req.json();
    const { RECEIVER, MSG, SUBJECT, CC, ATTATCHMENTS } = body

    // return NextResponse.json({message:body},{status:200})
    try{

        let transporter = nodemailer.createTransport({
            service:"gmail",
            host:"gmail",
            port: 587,
            
            secure: false,
            auth : {
                user:"bayaavint@gmail.com",
                pass:"tnzp jmir cmba kuog"
            }
        });
        const mailOptions = {
            from:"late developers bayaavint@gmail.com",
            to : RECEIVER, // list of receivers
            subject : SUBJECT, // Subject line
            html : MSG, // plain text body
            cc : CC ? CC : false,
            // bcc : "",
            attachments : ATTATCHMENTS ? ATTATCHMENTS : false
            //     {
            //         filename : "Programming.pdf",
            //         path : "./attachments/Programming.pdf"
            //     }         
            // ]
        }

        const info = await transporter.sendMail(mailOptions);
        if(info)
            return NextResponse.json({ 'status' : true, info }, { status: 200 });

    }catch(error){
        console.log(error)
        return NextResponse.json({ error : error.message}, { status: 500 })
    }
    
}