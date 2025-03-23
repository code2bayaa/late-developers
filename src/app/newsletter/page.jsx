"use client"
import {useEffect, useState, useRef} from "react"
import swal from "sweetalert"
import gsap from "gsap"
import {feedback} from "@/assets"
import { runThemes } from "../../components/themes"

export default function NEWSLETTER(){
    // const [ isMounted, setMounted ] = useState( false );
    const [form, setForm] = useState({name:"",email:""})
    const [loading, setLoading] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const formRef = useRef(null)

    useEffect( () => {
        runThemes()
        console.log("newsletters")
        gsap.to(document.getElementById("NavBar"),{
            // css:{
                // backgroundImage:`url(${contact})`,
            // },
            // background:`url(${contact})`,
            onStart:() => {
                document.getElementById("NavBar").classList.add("newsletters")
                document.getElementById("logo").classList.add("transparent")
            },
            minHeight:"30%",
            duration:3
        })
        const handleResize = () => setWindowWidth(window.screen.width)
        handleResize()

        // setMounted( true );

        // return () => {
        //     setMounted( false );
        // };
    }, [] );

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        if(!form.name || !form.email){
            swal("oops","fill all fields","error")
            setLoading(false)
            return false
        }
        const response = await fetch("/api/Newsletter",{
            method: "POST",
            body:JSON.stringify({
              form
            }),
            headers: {
              'Content-Type': 'application/json', // Indicates the body is JSON
            },
        });

        const {status, results} = await response.json()
        console.log(results, "results")
        if(status){
            swal("success","success")            
        }else{
            swal("oops","try again","error")
        }
        setLoading(false)
    }

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="w-[100%] min-h-[100%] text-center">
            <h2 style={{fontSize:"200%"}}>NEWSLETTERS</h2>            
            <p>late developers are engaged in many rivatilizing technological manouveours, associate with us as we send you the latest news of evolving tch to you daily inbox</p>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={windowWidth > 800 ? 'w-[80%] bg-[#F5F5F5] mx-[10%]':'w-[95%] bg-[#F5F5F5] mx-[2.5%] '}
            >
                <div className='w-[100%] h-[30%]'>
                    <h2>NAME</h2>
                    <input
                        type='text'
                        name='name'
                        className='w-[100%] h-[50px] bg-[#F5F5F5]'
                        style={{borderBottom:"1px solid #000"}}
                        placeholder='NAME'
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='w-[100%] h-[30%]'>
                    <h2>EMAIL</h2>
                    <input
                        type='text'
                        name='email'
                        className='w-[100%] h-[50px] bg-[#F5F5F5]'
                        style={{borderBottom:"1px solid #000"}}
                        placeholder='EMAIL'
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className='w-[40%] h-[40px] bg-[#000] text-white'
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </form>
        </div>
    )
}