import { useEffect, useState } from "react"
import LAYOUT from "./layout"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { BarChart } from '@mui/x-charts/BarChart';
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
            const res = await fetch(api_url + "/reports/get")
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
                    
                    temp_month[Number(month)].count = temp_month[Number(month)].count + 1
                    setMonths(() => [...temp_month])
                })
            })
            setUsers(() => [...users])
        }
        runReport()

        return () => setShow(true)
        
    },[])
    return (
        <div className="with-full  with-row" style={{height:"100%",backgroundColor:"#FCFCFA"}}>
            <div style={{width:"20%",height:"100%",background:"linear-gradient(#411342, #000, #000)"}}>
                <LAYOUT/>
            </div>
            <div className="admin-components">
                <h2>REPORT</h2>
                <p>{howMany}</p>
                <div style={{width:"90%",marginLeft:"5%"}}>
                    <h2 style={{textDecoration:"bold",color:""}}>MONTHS AGAINST VISITORS</h2>
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
                    <p>{liveUsers.length > 1 ? `${liveUsers.length} users` : "1 user"}</p>
                    <h2>locations</h2>
                    {liveUsers.map(({location},index) => 
                        <div key={index} style={{background:index%2?"#fff":"#ccc"}}>
                            <span style={{margin:"1%"}}>{index + 1}</span>
                            <FontAwesomeIcon icon={faUser}/>
                            <span style={{margin:"1%"}}>{location?.calling_code}</span>
                            <span style={{margin:"1%"}}>{location?.city}</span>
                            <span style={{margin:"1%"}}>{location?.continent_name}</span>
                            <span style={{margin:"1%"}}>{location?.country_code2}</span>
                            {
                                location.hasOwnProperty("country_flag")?
                                <img src={location?.country_flag}/>
                                :
                                ""
                            }
                            <span style={{margin:"1%"}}>{location?.country_name}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default REPORTS