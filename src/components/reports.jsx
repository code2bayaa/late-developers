import { v4 as uuidv4 } from 'uuid';


const COLLECT = async() => {

    try{
        const api_url = process.env.NEXT_PUBLIC_API_URL

        const user = localStorage.getItem("session")
        const date = new Date()
    
        const time = date.toLocaleTimeString()
        // const date = new Date()

        const sendForm = async({url,options}) => {

            const response = await fetch(
                url,
                options
            )

            
            return await response.json()

        }

        if(user){

            sendForm({
                url:api_url + "/api/Report/Update",
                options:{
                    method : "POST",
                    headers : {'Content-type': 'application/json; charset=UTF-8'},
                    body : JSON.stringify({
                        time,
                        user,
                        date : `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                    })
                }
            })        
            .then(res => res.json())
            .then(({ status, error }) => {
    
            })
            .catch(error => {
                console.log(error) 
            })

        }else{  


            const urls = [
                "https://ipinfo.io/json",
                // "https://apiip.net/api/check?accessKey=13ad4095-2d84-41f6-be25-df331c9e4f01",
                "https://ipapi.co/json/",
                "https://api.ipgeolocation.io/ipgeo?apiKey=02be68312fd5432fa07048f4b27b6542"
            ]

            const locations = await Promise.all(urls.map( async(url) => {
                return await sendForm({url, options : {
                    method:"GET",
                    headers : {'Content-type': 'application/json; charset=UTF-8'},
                }})
            }))
    
            const browser = navigator.userAgent
    
            console.log(locations)

            
            const session = uuidv4()
            sendForm({
                url:api_url + "/api/Report/Insert",
                options:{
                    method : "POST",
                    headers : {'Content-type': 'application/json; charset=UTF-8'},
                    body : JSON.stringify({
                        locations,
                        time : [time],
                        date : [`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`],
                        browser,
                        user:session
                    })
                }
            })        
            // .then(res => res.json())
            .then(({ status, error }) => {
                console.log(status)
                localStorage.setItem("session",session)
            })
            .catch(error => {
                console.log(error)
            })
        }


    }catch(error){
        console.log(error)
    }

}
export { COLLECT }