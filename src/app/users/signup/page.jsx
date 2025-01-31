"use client"
import {login, sign_up, forgot_password} from "@/assets"
import swal from "sweetalert"
import Image from "next/image";
import {useRouter} from "next/navigation"
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from "gsap"
import { faEye, faEyeLowVision, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"

const SIGNUP = () => {
  const [form, setForm] = useState({name:"",email:"",password:"",repeat_password:"",telephone:""});
  const [confirming, setConfirming] = useState(false)
  const [code, setCode] = useState(null)
  const [verify, setVerify] = useState(false)
  const [view, setView] = useState(true)
  const [loading, setLoading] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const [verifyLoading, setVerifyLoading] = useState(false)
  const router = useRouter()
  const repeatPasswordRef = useRef()
//   const passwordRef = useRef()
  const registerRef = useRef()
  const verifyRef = useRef()
  const { data: session, status } = useSession()
  const [windowWidth, setWindowWidth] = useState(0)

  useLayoutEffect(() => {
    if(session && session.hasOwnProperty("user")){
      router.push("/users/dashboard")
    }
    setWindowWidth(() => window.screen.width)
  },[session])

  const handleSubmit = async(e) => {
    e.preventDefault();

    setLoading(true)
    if(Object.values(form).find( value => !value)){
        if(!form.name)
            swal("oops","input name","error")

        if(!form.repeat_password)
            swal("oops","input repeat password","error")
        
        if(!form.email)
            swal("oops","input email","error")
        if(!form.password)
            swal("oops","input passowrd","error")
        setLoading(false)
        return null
    }

    const randomCode = Math.floor(1000 + Math.random() * 9999);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Email/`, {
        cache: "no-store",
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
        body: JSON.stringify({
          RECEIVER: form.email,
          SUBJECT: 'VERIFY YOUR EMAIL',
          MSG:`
            <div style='width:100%'>
                <div style='width:80%;margin-left:10%;'>
                    <h1>Welcome To Late Developers</h1>
                    <p>Use the following code to verify ${randomCode}</p>
                    <p>For more information contact info@late-developers.com © 2025</p>
                </div>
            </div>`
        }), // Convert the data object to JSON
      });
    if (!res.ok) {
        swal("Oops!", "Try again!", "error");
        setLoading(false)
        return null
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Signup-background`, {
        method: "POST",
        body:JSON.stringify({...form, randomCode}),
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
      });

      console.log(response)
      const {status, message} = await response.json()
      console.log(status,"status")
      if(!status){
          swal("oops",message,"error")
          setLoading(false)
          return null
      }
      setLoading(false)

    const formDiv = gsap.timeline()
    formDiv.to(registerRef.current,{
        x:500,
        duration:3
    })
    formDiv.to(registerRef.current,{opacity:0, duration:2})

    const verifyDiv = gsap.timeline()
    verifyDiv.to(verifyRef.current,{
        onEnter:() => {
            verifyRef.current.classList.remove("hidden")
        },
        duration:1
    })
    verifyDiv.to(verifyRef.current,{
        x:-500,
        duration:2
    })
  }

  const repeatPassword = (e) => {
    setForm(() => ({...form, [e.target.name]:e.target.value}))
    repeatPasswordRef.current.classList.add("text-red")
    setConfirming(true)
    console.log(repeatPasswordRef.current.value)
    if(form.password === repeatPasswordRef.current.value){
        setConfirming(false)
        repeatPasswordRef.current.classList.remove("text-red")
    }

  }

  const verifyEmail = async(e) => {
    e.preventDefault()
    setVerifyLoading(true)
    if(!code){
        swal("oops","input code","error")
        setVerifyLoading(false)
        return null
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Signup/verify`, {
        method: "POST",
        body:JSON.stringify({code}),
        headers: {
            'Content-Type': 'application/json', // Indicates the body is JSON
        },
    });

    const {status, message} = await response.json()

    if(!status){
        swal("oops!",message,"error")
        setVerifyLoading(false)
        return null
    }

    setVerifyLoading(false)
    router.push("/users/signin")
  }

  const toggleVision = () => {
    // console.log(passwordRef.current)
    if(view){
        setPasswordType("text")
    }else{
        setPasswordType("password")
    }
    setView(!view)
  }

    return (
    <div className="w-[100%] h-[100%] bg-[linear-gradient(#fdfcfb,#e2d1c3,#e2d1c3)]">
      <h1 style={{textAlign:"center",fontSize:"200%"}}>Create an Account</h1>
      <div className={windowWidth > 800 ? "w-[100%] h-[60%] flex flex-row" : "w-[100%] h-[auto] flex flex-col-reverse" }>
          <div className={windowWidth > 800 ? "w-[44%] mx-[5%] bg-[linear-gradient(#900C3F,#900c85bd,#900c85bd)]":"w-[100%] mx-[5%] bg-[linear-gradient(#900C3F,#900c85bd,#900c85bd)]"}>
            <Image src = {sign_up} alt="late-developers" className="w-[80%] p-0 m-[-1%] z-[2] object-contain"/>
          </div>
          <div ref={registerRef} className={windowWidth > 800 ? "w-[45%] grid items-center justify-items-center" : "w-[100%] grid items-center justify-items-center"}>
            <form onSubmit={handleSubmit} className="w-[80%]">
                <fieldset>
                    <legend>Name</legend>
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        className="w-[100%] m-[0.5%] h-[40px] border border-[#ccc]"
                        name="name"
                        onChange={(e) => setForm(() => ({...form, [e.target.name]:e.target.value}))}
                    />
                </fieldset>
                <fieldset>
                    <legend>Email</legend>
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
                    <legend>Telephone</legend>
                    <input
                        type="telephone"
                        placeholder="Telephone"
                        value={form.telephone}
                        className="w-[100%] m-[0.5%] items-center h-[40px] border border-[#ccc]"
                        name="telephone"
                        onChange={(e) => setForm(() => ({...form, [e.target.name] : e.target.value}))}
                    />
                </fieldset>
                <fieldset>
                    <legend>Password</legend>
                    <input
                        type={passwordType}
                        placeholder="Password"
                        value={form.password}
                        className="w-[89%] m-[0.5%] h-[40px] border border-[#ccc]"
                        name="password"
                        onChange={(e) => setForm(() => ({...form, [e.target.name]:e.target.value}))}
                    />
                    <button 
                        type="button"
                        className="w-[10%] h-[40px] text-white bg-[#000]"
                        onClick={toggleVision}
                    >
                        { view ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/> }
                    </button>
                </fieldset>
                <fieldset>
                    <legend>Repeat Password</legend>
                    <input
                        type="password"
                        ref={repeatPasswordRef}
                        placeholder="Repeat Password"
                        // value={form.repeat_password}
                        className="w-[100%] m-[0.5%] h-[40px] border border-[#ccc]"
                        name="repeat_password"
                        onChange={(e) => repeatPassword(e)}
                    />
                </fieldset>

              {confirming ? <p style={{color:"red"}}>passwords must match</p> : ""}
              <button 
                type="submit"
                disabled={loading}
                className="w-[40%] h-[40px] text-white bg-[#000] mx-[30%]"
                >Register</button>
                <fieldset>
                    <Link href="/users/signin" className="w-[48%] m-[1%] underline">Sign In</Link>
                    <Link href="/users/forgot" className="w-[48%] m-[1%] underline">Forgot Password</Link>     
                </fieldset>
            </form>
          </div>
            <div ref={verifyRef} className="w-[45%] hidden">
                <p>A code was sent to your email. Input it below</p>
                <form onSubmit={verifyEmail}>
                    <input
                        type="text"
                        placeholder="Input Code"
                        className="w-[100%] m-[0.5%] h-[40px] border border-[#000]"
                        name="code"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button 
                    type="submit"
                    disabled={verifyLoading}
                    className="w-[40%] h-[40px] text-white bg-[#000] mx-[30%]"
                    >Verify</button>
                </form>
            </div>

      </div>
    </div>
    )

}

export default SIGNUP