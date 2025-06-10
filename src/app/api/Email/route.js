import {NextResponse} from "next/server"
import nodemailer from "nodemailer"

export async function POST(req){

    const body = await req.json();
    const { RECEIVER, MSG, SUBJECT, CC, ATTATCHMENTS } = body

    // return NextResponse.json({message:body},{status:200})
    console.log(process.env.email_service,process.env.email)
    try{

        let transporter = nodemailer.createTransport({
            service:process.env.email_service,
            host:process.env.email_service,
            port: 587,
            
            secure: false,
            auth : {
                user:process.env.email,
                pass:process.env.email_password
            }
        });
        const mailOptions = {
            from:`late developers ${process.env.email}`,
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