"use client"
import {useEffect, useState, useRef} from "react"
import Image from "next/image"
import {homeImg, feedbackHome} from "@/components/constants.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHomeUser, faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons"
import swal from "sweetalert"

const HOMES = () => {

    const [windowWidth, setWindowWidth] = useState(0)
    const [form, setForm] = useState({visitor:1,place:"TOWN",checkIn:"",checkOut:"",mobile:"",email:"",room:""})
    const [activeRoom, setActiveRoom] = useState([false,false,false,false,false]) 
    const [loading, setLoading] = useState(false)
    const visitor = useRef(null)
    const [fillRooms, setFillRooms] = useState(false)
    useEffect(() => {
        setWindowWidth(() => window.screen.width)
    },[])

    const bookIn = async(e) => {
        console.log(form)

        try {
            e.preventDefault()
            setLoading(true)

            if(!form.room){
                setFillRooms(true)
                setLoading(false)
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Email/`, {
                cache: "no-store",
                method: 'POST', // HTTP method
                headers: {
                'Content-Type': 'application/json', // Indicates the body is JSON
                },
                body: JSON.stringify({
                RECEIVER: "latedevelopers@hotmail.com",
                SUBJECT: 'BnB BOOKING',
                MSG:`<div style='width:100%'>
                        <div style='width:80%;margin-left:10%;'>
                            <h1>BOOK INFO</h1>
                            <div style='width:"100%",border:"1px solid #ccc"'>
                                <p style='height:"40px";width:"80%";background:"#ccc"'>PLACE: ${form.place}</p>
                                <p style='height:"40px";width:"80%";background:"#fff"'>CHECK IN: ${form.checkIn}</p>
                                <p style='height:"40px";width:"80%";background:"#ccc"'>CHECK OUT: ${form.checkOut}</p>
                                <p style='height:"40px";width:"80%";background:"#fff"'>MOBILE: ${form.mobile}</p>
                                <p style='height:"40px";width:"80%";background:"#ccc"'>EMAIL: ${form.email}</p>
                                <p style='height:"40px";width:"80%";background:"#fff"'>${form.room > 1 ? "ROOMS: " + form.room : "ROOM: " + form.room}</p>
                                <p style='height:"40px";width:"80%";background:"#ccc"'>${form.visitor > 1 ? "VISITORS: " + form.visitor : "VISITOR: " + form.visitor}</p>
                            </div>
                        </div>
                    </div>`
                }), // Convert the data object to JSON
            });
            if (!res.ok) {
                swal("Oops!", "Failed to fetch topic!", "error");
                throw new Error("Failed to fetch topic");
            }
        
            // return res.json();
            setLoading(false)
            swal("success!");
            setActiveRoom(() => [false,false,false,false,false])
            setForm(() => ({visitor:1,place:"TOWN",checkIn:"",checkOut:"",mobile:"",email:"",room:""}))
        } catch (error) {
            swal("Oops!", error.message, "error");
            setLoading(false)
            console.log(error);
        }

    }

    const visitors = n => {
        const current = Number(visitor.current.value)
        if(n){
            visitor.current.value = current + 1
        }else{
            if(current > 1)
                visitor.current.value = current - 1
        }
        setForm(() => ({...form, visitor:visitor.current.value}))
    }

    const setRoom = (n) => {
        setForm(() => ({...form, room:n}))
        let newactiveRoom = activeRoom.map(r => false)
        newactiveRoom[n - 1] = true
        setActiveRoom(() => [...newactiveRoom])
        setFillRooms(false)
    }

    const inputValue = (e) => {
        e.preventDefault()
        try{
            if(e.target.name == "checkOut"){
                console.log("error")

                let checkOutDate = new Date(e.target.value)
                // const checkOutDate = date.toLocaleTimeString()
                const checkInDate = new Date(form.checkIn)
                // const checkInDate = date.toLocaleTimeString()

                if(!form.checkIn){
                    swal("oops","choose the check in date first","error")
                    return false
                }

                if(checkOutDate < checkInDate){
                    swal("oops","check out date should be greater than check in date","error")
                    return false
                }
                    
            }
            setForm(() => ({...form, [e.target.name]:e.target.value}))
        }catch(error){
            swal("oops",error.message,"error")
        }
    }

    const downloadPricing = () => {
        const imageUrls = [
            './image/000.jpg',
            './image/001.jpg',
            './image/000.png',
            './image/001.png',
            './pdf/homes/pricing.pdf'
          ];
    
          imageUrls.forEach((url, index) => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `image${index + 1}.jpg`; // Set the filename
            document.body.appendChild(a); // Required for Firefox
            a.click();
            document.body.removeChild(a);
          });
    }

    return (
        <div className="w-[100%] min-h-[100%]">
            <h2 style={{textAlign:"center",fontSize:"250%"}}><FontAwesomeIcon icon={faHomeUser} /> HOME UNITS</h2>
            <article style={{width:"100%",textAlign:"center"}}>
                <p>Contact as for accomodation in Mombasa, Coast, Kenya</p>
                <p>For as <b>low</b> as $15</p>
                <div style={windowWidth > 800 ? {display:"flex",textAlign:"left",flexWrap:"wrap",flexDirection:"row",width:"65%",marginLeft:"38%",marginTop:"2%"} : {display:"flex",textAlign:"left",flexWrap:"wrap",flexDirection:"row",width:"100%",marginLeft:"0%",marginTop:"2%"}}>
                    <ul>
                        <li>Secure</li>
                        <li>Money Back Guarantee</li>
                        <li>Transportation & Tours</li>
                        <li>Hidden Gems</li>
                    </ul>
                    <ul>
                        <li>Affordable & Comfortable</li>
                        <li>Basic amenities allocated wifi...</li>
                        <li>Local prices available</li>
                        <li>Beaches, Marine Life</li>
                    </ul>
                </div>
                <p>Click below to <strong>download</strong> pricing and catalogue brochure</p>
                <button type="button" onClick={() => downloadPricing()} style={{background:"#000",color:"#fff",height:"40px",width:"40%"}}>DOWNLOAD</button>
            </article>
            <div className={windowWidth > 800 ? "w-[100%] min-h-[100%] flex flex-row" : "w-[100%] h-[auto] flex flex-col" }>
                <div className={windowWidth > 800 ? "w-[50%] h-[100%]" : "w-[100%] h-[100%]"}>
                    <p style={{textAlign:"center",fontSize:"120%"}}><b>Book Below:</b></p>
                    <form 
                     onSubmit={(e) => bookIn(e)}
                    >
                        <fieldset className="w-[100%] text-center">
                            <p>No. Of Visitors</p>
                            <p>Adults and children included</p>
                            <button
                                onClick={() => visitors(false)}
                                className="h-[40px] w-[20%] m-[1%] bg-[#000] text-white"
                                type="button"
                            >
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                                <input
                                    type="text"
                                    ref={visitor}
                                    value={form.visitor}
                                    className={windowWidth > 800 ? "border-[1px] text-center h-[40px] m-[1%]" : "border-[1px] text-center w-[30%] h-[40px] m-[1%]"}
                                    readOnly
                                />
                            <button
                            onClick={() => visitors(true)}
                            className="h-[40px] w-[20%] m-[1%] bg-[#000] text-white"
                            type="button"
                            >
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </fieldset>
                        <fieldset className="text-center">
                            <h2>Desired Location</h2>
                            <select  
                                // value={form.place}
                                className="h-[40px] text-center w-[98%] m-[1%]" name="place" onChange={(e) => inputValue(e)}>
                                <option>TOWN</option>
                                <option>NYALI</option>
                                <option>DIANI</option>
                                <option>BAMBURI</option>
                                <option>SHANZU + MTWAPA</option>
                            </select>
                        </fieldset>
                        <fieldset className="flex flex-row">
                            <div className="w-[50%]">
                                <h2>CHECK IN</h2>
                                <input type="date" value={form.checkIn} style={{height:"40px",width:"98%",border:"1px solid #ccc",margin:"1%"}} name="checkIn" onChange={(e) => inputValue(e)} required/>
                            </div>
                            <div className="w-[50%]">
                                <h2>CHECK OUT</h2>
                                <input type="date" value={form.checkOut} style={{height:"40px",width:"98%",border:"1px solid #ccc",margin:"1%"}} name="checkOut" onChange={(e) => inputValue(e)} required/>
                            </div>
                        </fieldset>
                        <fieldset className="text-center">
                            <h2>TELEPHONE NUMBER</h2>
                            <input placeholder="254717323852" value={form.mobile} style={{height:"40px",width:"98%",border:"1px solid #ccc"}} name="mobile" onChange={(e) => inputValue(e)} required/>
                            <h2>EMAIL</h2>
                            <input placeholder="info@late-developers.com" value={form.email} style={{height:"40px",width:"98%",border:"1px solid #ccc"}} name="email" onChange={(e) => inputValue(e)} />
                        </fieldset>
                        <p>{fillRooms ? "How many bedrooms do you want? Select below" : "No. of bedrooms"}</p>
                        <fieldset className="flex flex-row">
                            <button onClick={() => setRoom(1)} type="button" className={activeRoom[0] ? "m-[1%] h-[40px] w-[18%] bg-[#fff] text-black border-[1px]":"m-[1%] h-[40px] w-[18%] bg-[#000] text-white"}>1</button>
                            <button onClick={() => setRoom(2)} type="button" className={activeRoom[1] ? "m-[1%] h-[40px] w-[18%] bg-[#fff] text-black border-[1px]":"m-[1%] h-[40px] w-[18%] bg-[#000] text-white"}>2</button>
                            <button onClick={() => setRoom(3)} type="button" className={activeRoom[2] ? "m-[1%] h-[40px] w-[18%] bg-[#fff] text-black border-[1px]":"m-[1%] h-[40px] w-[18%] bg-[#000] text-white"}>3</button>
                            <button onClick={() => setRoom(4)} type="button" className={activeRoom[3] ? "m-[1%] h-[40px] w-[18%] bg-[#fff] text-black border-[1px]":"m-[1%] h-[40px] w-[18%] bg-[#000] text-white"}>4</button>
                            <button onClick={() => setRoom(5)} type="button" className={activeRoom[4] ? "m-[1%] h-[40px] w-[18%] bg-[#fff] text-black border-[1px]":"m-[1%] h-[40px] w-[18%] bg-[#000] text-white"}>5</button>
                        </fieldset>
                        <fieldset>
                            <button
                             className={windowWidth > 800 ? "w-[40%] h-[40px] bg-[#000] m-[1%] text-center text-white" : "w-[100%] h-[40px] bg-[#000] m-[1%] text-center text-white"}
                            >
                                { loading ? "booking..." : "BOOK" }
                            </button>
                        </fieldset>

                    </form>
                </div>
                <div id="home-content" className={windowWidth > 800 ? "w-[50%] h-[450px] flex flex-col overflow-x-auto flex-wrap" : "w-[100%] h-[300px] overflow-x-auto flex flex-col flex-wrap"}>
                    {
                        homeImg.map((i,index) => 
                            <Image alt = "late developers homes" src={i} key={index} width={400} height={400} className="m-[1%] h-[100%] w-[auto] object-contain"/>
                        )
                    }
                </div>
            </div>
            <b style={{textAlign:"center"}}>FEEDBACK</b>
            <div className="w-[100%] h-[40%] flex flex-row flex-wrap">
                    {
                        feedbackHome.map(({img, name, description,contact},index) => 
                            <div className={windowWidth > 800 ? "w-[23%] h-[60%] m-[1%]" : "w-[98%] h-[100%] m-[1%]"} style={{color:"#fff",backgroundImage:"linear-gradient( #900C3F , #900c85bd, #900c85bd)"}} key={index}>
                                <Image alt = "late developers homes" src={img} width={400} height={400} className="m-[1%] h-[100%] w-[60%] rounded-[50%] object-contain"/>
                                <strong>{name}</strong><FontAwesomeIcon icon={faStar} style={{margin:"1%",color:"#ffd800"}} /> <FontAwesomeIcon icon={faStar} style={{margin:"1%",color:"#ffd800"}} /> <FontAwesomeIcon icon={faStar} style={{margin:"1%",color:"#ffd800"}} /> <FontAwesomeIcon icon={faStar} style={{margin:"1%",color:"#ffd800"}} /> <FontAwesomeIcon icon={faStar} style={{margin:"1%",color:"#ffd800"}} />
                                <article style={{textAlign:"justify"}}>{description}</article>
                                {contact}
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default HOMES