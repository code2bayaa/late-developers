import {NextResponse} from "next/server"
import nodemailer from "nodemailer"

export async function GET(){
    return NextResponse.json({
        "hey" : "you"
    })
}
export async function POST(req){

    const body = await req.json();
    const { RECIEVER, MSG, SUBJECT, CC, ATTATCHMENTS } = body.formData

    console.log("HEY")
    // return NextResponse.json({message:true},{status:200})
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
            to : RECIEVER, // list of receivers
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