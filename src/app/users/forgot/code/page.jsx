"use client"
import { useState, useRef, useEffect } from "react";
import {useRouter} from "next/navigation"
import {login, sign_up, forgot_password} from "@/assets"
import swal from "sweetalert"
import Image from "next/image";
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeLowVision, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useSearchParams } from "next/navigation";
export default function CHANGE() {
  const [form, setForm] = useState({password:"",repeat_password:""});
  const [loading, setLoading] = useState(false)
    const [passwordType, setPasswordType] = useState("password")
    const [confirming, setConfirming] = useState(false)
    const repeatPasswordRef = useRef()
    const [view, setView] = useState(true)
  const router = useRouter()
  // const params = useParams();
  // const { code } = params;
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // Get the code from the URL
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(() => window.screen.width)
  },[])
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

  const toggleVision = () => {
    // console.log(passwordRef.current)
    if(view){
        setPasswordType("text")
    }else{
        setPasswordType("password")
    }
    setView(!view)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(!form.password){
      swal("oops","input password","error")
      setLoading(false)
      return null
    }
    if(!form.repeat_password){
        swal("oops","input repeat password","error")
        setLoading(false)
        return null
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Forgot/Change`, {
      method: "POST",
      body:JSON.stringify({
        code,
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

    router.push("/users/signin")


  };

  return (
    <div className="w-[100%] h-[100%] bg-[linear-gradient(#fdfcfb,#e2d1c3,#e2d1c3)]">
      <h1 style={{textAlign:"center",fontSize:"200%"}}>Change Password</h1>
      <div className={windowWidth > 800 ? "w-[100%] h-[60%] flex flex-row" : "w-[100%] h-[auto] flex flex-col-reverse" }>
          <div className="w-[44%] mx-[5%] bg-[linear-gradient(#900C3F,#900c85bd,#900c85bd)]">
            <Image src = {forgot_password} alt="late-developers" className="w-[80%] p-0 m-[-1%] z-[2] object-contain"/>
          </div>
          <div className="w-[45%] grid items-center justify-items-center">
            <form onSubmit={handleSubmit} className="w-[80%]">
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
                        ref={repeatPasswordRef}
                        type="password"
                        placeholder="Repeat Password"
                        value={form.repeat_password}
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
                >Change Password</button>
            </form>
          </div>
      </div>
    </div>
  );
}