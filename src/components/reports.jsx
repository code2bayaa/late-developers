import { v4 as uuidv4 } from 'uuid';


const COLLECT = async() => {

    try{
        const api_url = process.env.NEXT_PUBLIC_API_URL

        let user = localStorage.getItem("session")
        let user_location = localStorage.getItem("location")
        const date = new Date()
        const time = date.toLocaleTimeString()

        const sendForm = async({url,options}) => {

            const response = await fetch(
                url,
                options,
                {credentials:"initial"}
            )

            
            return await response.json()

        }

        if(!user_location){
            const urls = [
                "https://ipinfo.io/json",
                // "https://apiip.net/api/check?accessKey=13ad4095-2d84-41f6-be25-df331c9e4f01",
                "https://ipapi.co/json/",
                "https://api.ipgeolocation.io/ipgeo?apiKey=02be68312fd5432fa07048f4b27b6542"
            ]

            const locations = await Promise.all(urls.map(async(url) => {
                return await sendForm({url, options : {
                    method:"GET",
                    headers : {'Content-type': 'application/json; charset=UTF-8'},
                }})
            }))

            localStorage.setItem("location",JSON.stringify(locations))
            user_location = JSON.stringify(locations)
        }

        if(!user){
            const session = uuidv4()
            localStorage.setItem("session",session)
            user = session
        }
            const browser = navigator.userAgent
    
            sendForm({
                url:api_url + "/api/Report",
                options:{
                    method : "POST",
                    headers : {'Content-type': 'application/json; charset=UTF-8'},
                    body : JSON.stringify({
                        time,
                        user,
                        date,
                        locations: user_location,
                        browser,
                    })
                }
            })        
            .then(({ status, error }) => {
                console.log(status,"status report")
            })  
            .catch(error => {
                console.log(error) 
            }) 


    }catch(error){
        console.log(error)
    }

}
export { COLLECT }