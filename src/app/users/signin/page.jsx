"use client"
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation"
import {login, sign_up, forgot_password} from "@/assets"
import swal from "sweetalert"
import Image from "next/image";
import Link from "next/link"

export default function Signin() {
  const [form, setForm] = useState({email:"",password:""});
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    console.log(session)
    if(session.hasOwnProperty("user")){
      router.push("/users/dashboard")
    }
    setWindowWidth(() => window.screen.width)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(!form.password || !form.email){
      if(!form.email){
        swal("oops","input email","error")

        
      }
      if(!form.password){
        swal("oops","input passowrd","error")
      }
      setLoading(false)
      return null
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Signin`, {
      method: "POST",
      body:JSON.stringify({
        email:form.email,
        password:form.password
      }),
      headers: {
        'Content-Type': 'application/json', // Indicates the body is JSON
      },
    });

    const {status, message} = await response.json()
    if(!status){
      swal("oops!",message,"error");
      setLoading(false)
      return null
    }
    const result = await signIn("credentials", {
      redirect: false,
      email:form.email,
      password:form.password,
    });

    // console.log(form.email,result)
    setLoading(false)
    if (result.ok) {
      router.push("/users/dashboard"); // Redirect to dashboard after successful login
    } else {
      swal("oops!","Invalid credentials, please try again.","error");
    }
  };

  return (
    <div className="w-[100%] h-[100%] bg-[linear-gradient(#fdfcfb,#e2d1c3,#e2d1c3)]">
      <h1 style={{textAlign:"center",fontSize:"200%"}}>User Login</h1>
      <div className={windowWidth > 800 ? "w-[100%] h-[60%] flex flex-row" : "w-[100%] h-[auto] flex flex-col-reverse" }>
          <div className="w-[44%] mx-[5%] bg-[linear-gradient(#900C3F,#900c85bd,#900c85bd)]">
            <Image src = {login} alt="late-developers" className="w-[80%] p-0 m-[-1%] z-[2] object-contain"/>
          </div>
          <div className="w-[45%] grid items-center justify-items-center">
            <form onSubmit={handleSubmit} className="w-[80%]">
              <fieldset>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  className="w-[100%] m-[0.5%] items-center h-[40px] border border-[#ccc]"
                  name="email"
                  onChange={(e) => setForm(() => ({...form, [e.target.name] : e.target.value}))}
                />
              </fieldset>
              <fieldset>
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  className="w-[100%] m-[0.5%] h-[40px] border border-[#ccc]"
                  name="password"
                  onChange={(e) => setForm(() => ({...form, [e.target.name]:e.target.value}))}
                />
              </fieldset>

              <button 
                type="submit"
                disabled={loading}
                className="w-[40%] h-[40px] text-white bg-[#000] mx-[30%]"
                >Login</button>
              <fieldset>
                  <Link href="/users/signup" className="w-[48%] m-[1%] underline">Create an Account</Link>
                  <Link href="/users/forgot" className="w-[48%] m-[1%] underline">Forgot Password</Link>     
              </fieldset>
            </form>
          </div>
      </div>
    </div>
  );
}