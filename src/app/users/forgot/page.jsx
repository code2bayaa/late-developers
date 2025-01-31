"use client"
import { useState, useEffect, useLayoutEffect } from "react";
import {useRouter} from "next/navigation"
import {login, sign_up, forgot_password} from "@/assets"
import swal from "sweetalert"
import Image from "next/image";
import Link from "next/link"
import { useSession, signIn } from "next-auth/react";

export default function FORGOT() {
  const [form, setForm] = useState({email:""});
  const [loading, setLoading] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const router = useRouter()

  const { data: session, status } = useSession()

  useLayoutEffect(() => {
    if(session && session.hasOwnProperty("user")){
      router.push("/users/dashboard")
    }
    setWindowWidth(() => window.screen.width)
  },[session])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(!form.email){
      swal("oops","input email","error")

      return null
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Forgot`, {
      method: "POST",
      body:JSON.stringify({
        email:form.email
      }),
      headers: {
        'Content-Type': 'application/json', // Indicates the body is JSON
      },
    });

    const {status, message, code} = await response.json()
    if(!status){
      swal("oops!",message,"error");
      setLoading(false)
      return null
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Email/`, {
      cache: "no-store",
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Indicates the body is JSON
      },
      body: JSON.stringify({
        RECEIVER: form.email,
        SUBJECT: 'FORGOT YOUR EMAIL',
        MSG:`
          <div style='width:100%'>
              <div style='width:80%;margin-left:10%;'>
                  <h1>Welcome To Late Developers</h1>
                  <p>Use the link to change your password ${process.env.NEXT_PUBLIC_API_URL}/users/forgot/code?code=${code}</p>
                  <p>For more information contact info@late-developers.com © 2025</p>
              </div>
          </div>`
      }), // Convert the data object to JSON
    });

    const waited = await res.json()
    if (!res.status) {
        swal("Oops!", status.message + "Try again", "error");
        setLoading(false)
        return null
    }


  };

  return (
    <div className="w-[100%] h-[auto] bg-[linear-gradient(#fdfcfb,#e2d1c3,#e2d1c3)]">
      <h1 style={{textAlign:"center",fontSize:"200%"}}>Forgot Password</h1>
      <div className={windowWidth > 800 ? "w-[100%] h-[60%] flex flex-row" : "w-[100%] h-[auto] flex flex-col-reverse" }>
          <div className={windowWidth > 800 ? "w-[44%] mx-[5%] bg-[linear-gradient(#900C3F,#900c85bd,#900c85bd)]" : "w-[100%] bg-[linear-gradient(#900C3F,#900c85bd,#900c85bd)]"}>
            <Image src = {forgot_password} alt="late-developers" className="w-[80%] p-0 m-[-1%] z-[2] object-contain"/>
          </div>
          <div className={windowWidth > 800 ? "w-[45%] grid items-center justify-items-center":"w-[100%] grid items-center justify-items-center"}>
            <form onSubmit={handleSubmit} className="w-[80%]">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                className="w-[100%] m-[0.5%] items-center h-[40px] border border-[#ccc]"
                name="email"
                onChange={(e) => setForm(() => ({...form, [e.target.name] : e.target.value}))}
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-[40%] h-[40px] text-white bg-[#000] mx-[30%]"
                >Send Email</button>
              <fieldset>
                  <Link href="/users/signup" className="w-[48%] m-[1%] underline">Create an Account</Link>
                  <Link href="/users/signin" className="w-[48%] m-[1%] underline">Sign In</Link>     
              </fieldset>
            </form>
          </div>
      </div>
    </div>
  );
}