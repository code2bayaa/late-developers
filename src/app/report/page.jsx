"use client"
import { useEffect, useState } from "react"
import swal from "sweetalert"
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('@mui/x-charts/BarChart').then(mod => mod.BarChart), {
  ssr: false,
});
// import { BarChart } from '@mui/x-charts/BarChart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const api_url = process.env.NEXT_PUBLIC_API_URL

const REPORTS = () => {

    const [liveUsers,setUsers] = useState([])
    const [show,setShow] = useState(false)
    const [howMany,setHowMany] = useState(0)
    const [months, setMonths] = useState([])

    useEffect(() => {

        async function runReport(){
            const res = await fetch(api_url + "/api/Report/Read")
            const {data, status, users, error} = await res.json()

            if(!status){
                swal("oops",error,"error")
                return
            }
            const temp_month = [
                {"name":"Jan",count:0},
                {"name":"Feb",count:0},
                {"name":"Mar",count:0},
                {"name":"Apr",count:0},
                {"name":"May",count:0},
                {"name":"Jun",count:0},
                {"name":"Jul",count:0},
                {"name":"Aug",count:0},
                {"name":"Sep",count:0},
                {"name":"Oct",count:0},
                {"name":"Nov",count:0},
                {"name":"Dec",count:0}
            ]
            data.map(({date},number) => {
                JSON.parse(date).map((dateValue,index) => {
                    const aDate = new Date(dateValue)
                    const month = aDate.getMonth()
                    // console.log(month,"month")
                    
                    temp_month[Number(month)].count = temp_month[Number(month)].count + 1
                    console.log(temp_month,"temp_month")
                    
                })
            })
            setMonths(() => [...temp_month])
            // console.log(months)
            setUsers(() => [...users])
            setShow(true)
        }
        runReport()

        // return () => 
        
    },[])
    return (
        <div className="w-[100%]" style={{height:"100%",backgroundColor:"#FCFCFA"}}>
            <strong style={{textAlign:"center"}}>REPORT</strong>
            {/* <p>{howMany}</p> */}
            <div style={{width:"90%",marginLeft:"5%"}}>
                <h2 style={{textDecoration:"bold",textAlign:"center"}}>MONTHS AGAINST VISITORS</h2>
                {
                    show && <BarChart skipAnimation 
                        xAxis={[{ scaleType: 'band', data:  months.map(({name}) => name)}]}
                        series={[{data:months.map(({count}) => {
                            return Number(count)
                        })}]}
                        width={500}
                        height={400}
                        style={{width:"100%"}}
                    />
                }
            </div>
            <div style={{width:"90%",marginLeft:"5%"}}>
                <h2>LIVE USERS</h2>
                <p>{liveUsers.length > 1 ? `${liveUsers.length} users` : liveUsers.length == 0 ?  "no users" : "1 user"}</p>
                {/* <h2>locations</h2> */}
                {liveUsers.map(({location,device,time},index) => 
                    <div key={index} style={{background:index%2?"#fff":"#ccc",textAlign:"center",height:"40px",width:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{index + 1}</div>
                        <FontAwesomeIcon icon={faUser}/>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{location.find(({calling_code}) => calling_code)?.calling_code}</div>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{location.find(({city}) => city)?.city}</div>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{location.find(({continent_name}) => continent_name)?.continent_name}</div>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{location.find(({country_code2}) => country_code2)?.country_code2}</div>
                        {
                            location.find(({country_flag}) => country_flag)?
                            <img src={location.find(({country_flag}) => country_flag)?.country_flag}/>
                            :
                            ""
                        }
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{location.find(({country_name}) => country_name)?.country_name}</div>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{device["deviceType"]}</div>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{device["browser"]}</div>
                        <div style={{margin:"1%",textAlign:"center",height:"40px",width:"15%",border:"1px solid #000"}}>{time}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default REPORTS