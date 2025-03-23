"use client"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import swal from "sweetalert"
import { useLayoutEffect, useEffect, useState, useRef } from "react";
import { users, avatar } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@googlemaps/js-api-loader"
import { runThemes } from "@/components/themes";

export default function Dashboard() {
  const { data:session, status } = useSession();
  const [windowWidth, setWindowWidth] = useState(0)
  const [profile, setProfile] = useState({name:"",telephone:"",email:""})
  const [area, setArea] = useState({name:"",house:"",description:""})
  const router = useRouter()
  const mapRef = useRef(null)

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if(session == null || !session.hasOwnProperty("user")){
    router.push("/users/signin")
    return null
  }

  useEffect(() => {
    setWindowWidth(() => window.screen.width)
    runThemes()
    async function runProfile(){
      const response = await fetch("/api/Profile",{
        method: "POST",
        body:JSON.stringify({
          session:session?.user?.email
        }),
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
      });
      let {profile_array} = await response.json()
      setProfile(profile_array)
      setArea(JSON.parse(profile_array.verification))
    }
    runProfile()
    const loader = new Loader({
      apiKey: process.env.map,
      version: "weekly",
      // options,
    });
    

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

      let position = area?.location || {lat:-3.9968431767133388,lng:39.699020416678195}

      let map = new Map(document.getElementById("map"), {
        center: position,
        zoom: 18,
        mapId: "late_developers"
      });

      const geocoder = new google.maps.Geocoder();

      map.addListener("click", (event) => {
        const latLng = event.latLng;
    
        console.log(latLng)
        // Reverse geocode to get address details
        geocoder.geocode({ location: latLng }, async(results, status) => {
          if (status === "OK" && results[0]) {
            console.log(results)
            try{
              const response = await fetch("/api/Profile/Update", {
                method: "POST",
                body:JSON.stringify({
                  data:{...area, "location" : latLng},
                  session:session?.user?.email,
                  table:"verification"
                }),
                headers: {
                  'Content-Type': 'application/json', // Indicates the body is JSON
                },
              });
        
              if (!response.ok) {
                // throw new Error("Failed to update logout status in the database");
                swal("Oops!", "Something went wrong!", "error");
                return null;
              }
        
              const {status, data} = await response.json()
        
              if(status){
                setArea(JSON.parse(data.verification))
              }
            }catch(error){
              console.error("Error during sign-out:", error);
              swal("Oops!", error.message, "error");
            }
          } else {
            swal("oops","No address found.","error");
          }
        });
      });

      // Define the custom icon
      var customIcon = {
          url: users, // URL to your custom image
          scaledSize: new google.maps.Size(60, 60), // Desired size
          origin: new google.maps.Point(0, 0), // Origin point (0, 0)
          anchor: new google.maps.Point(25, 50) // Anchor point (center of the image)
      };

      // Create a marker with the custom icon
      var marker = new google.maps.Marker({
          position,
          map,
          icon: customIcon,
          title: 'late developers user'
      });

    });

  },[])

  const customSignOut = async() => {
    try {
      const response = await fetch("/api/SignOut", {
        method: "POST",
        body:JSON.stringify({
          id:session.user.id
        }),
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
      });
  
      if (!response.ok) {
        // throw new Error("Failed to update logout status in the database");
        swal("Oops!", "Something went wrong!", "error");
        return null;
      }
  
      
      // Call NextAuth's signOut function after updating the database
      await signOut({ callbackUrl: "/users/signin"});
      // router.push("/users/signin")
      
    } catch (error) {
      console.error("Error during sign-out:", error);
      swal("Oops!", error.message, "error");
    }
  }

  const updateProfile = async(e) => {
    e.preventDefault()
    try{

      document.getElementById(e.target.name).innerText = "updating..."
      const response = await fetch("/api/Profile/Update", {
        method: "POST",
        body:JSON.stringify({
          data:e.target.value,
          session:session?.user?.email,
          table:e.target.name
        }),
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
      });

      if (!response.ok) {
        // throw new Error("Failed to update logout status in the database");
        swal("Oops!", "Something went wrong!", "error");
        return null;
      }

      const {status, data} = await response.json()

      if(status){
        document.getElementById(e.target.name).innerText = ""
        // setProfile({...data})
      }
    }catch(error){
      console.error("Error:", error);
      swal("Oops!", error.message, "error");
    }
  }

  // const updated = (e) => {
    
  // }
  const updateArea = async(e) => {
    e.preventDefault()
    try{
      const response = await fetch("/api/Profile/Update", {
        method: "POST",
        body:JSON.stringify({
          data:{...area, [e.target.name] : e.target.value},
          session:session?.user?.email,
          table:"verification"
        }),
        headers: {
          'Content-Type': 'application/json', // Indicates the body is JSON
        },
      });

      if (!response.ok) {
        // throw new Error("Failed to update logout status in the database");
        swal("Oops!", "Something went wrong!", "error");
        return null;
      }

      const {status} = await response.json()

      if(status){
        document.getElementById(e.target.name).innerHTML = "updating..."
        // setProfile({...data})
      }
    }catch(error){
      console.error("Error during sign-out:", error);
      swal("Oops!", error.message, "error");
    }
  }

  return (
    <div className={windowWidth > 800 ? "w-[100%] h-[100%] flex flex-row" : "w-[100%] h-[100%] flex flex-col-reverse"}>
      <div className="w-[20%] h-[100%] item-center">
        <h1 className="w-[100%]">Welcome, {session.user.name}</h1>
        <Image src = {users} alt="late-developers" className="w-[40%] p-0 m-[1%] z-[2] object-contain"/>
        <button onClick={() => customSignOut()} className="underline w-[100%] h-[40px] text-left">SIGN OUT</button>
        <h2 className="w-[100%] bg-[#FAF9F6] h-[40px]">PROFILE</h2>
        <Link href="/users/orders" className="w-[100%] text-left underline">ORDERS</Link>
      </div>
      <div className="w-[80%] h-[100%] bg-[#FAF9F6]">
        <h2 style={{textAlign:"center",color:"#0047AB",fontSize:"200%"}} className="underline">PROFILE</h2>
        <div className=" flex flex-row w-[98%] m-[1%]">
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <legend>NAME</legend>
            <input
            className="w-[100%] h-[60px]"
            onChange={updateProfile}
            
            placeholder={profile?.name}
            name="name"
            // value={profile.name}
            />
            <p id="name"></p>
          </div>
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <legend>TELEPHONE</legend>
            <input
            className="w-[100%] h-[60px]"
            onChange={updateProfile}
            
            // placeholder="telephone"
            name="telephone"
            placeholder={profile?.telephone}
            />
            <p id="telephone"></p>
          </div>
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <legend>EMAIL</legend>
            <input
            className="w-[100%] h-[60px]"
            onChange={updateProfile}
            
            // placeholder="email"
            name="email"
            placeholder={profile?.email}
            readOnly
            />
            <p id="email"></p>
          </div>
        </div>
        <h2 style={{textAlign:"center",color:"#0047AB",fontSize:"200%"}} className="underline">LOCATION</h2>
        <div className=" flex flex-row w-[98%] m-[1%]">
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <legend>AREA</legend>
            <input
            className="w-[100%] h-[60px]"
            onChange={updateArea}
            
            // placeholder="area"
            name="area"
            placeholder={area?.name}
            />
            <p id="area"></p>
          </div>
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <legend>HOUSE/BUILDING/APARTMENT</legend>
            <input
              className="w-[100%] h-[60px]"
              onChange={updateArea}
              
              // placeholder="house"
              name="house"
              placeholder={area?.house}
            />
            <p id="house"></p>
          </div>
          <div className={windowWidth > 800 ? "w-[30%] m-[1%]" : "w-[48%] m-[1%]"}>
            <legend>DESCRIPTION</legend>
            <input
              className="w-[100%] h-[60px]"
              onChange={updateArea}
              
              // placeholder="description"
              name="description"
              placeholder={area?.description}
            />
            <p id="description"></p>
          </div>
        </div>
        <div className=" flex flex-row w-[98%] m-[1%]">
          <h2>Click To Customize Location</h2>
          <div id="map" style={{position:"absolute"}} ref={mapRef}></div>
        </div>
      </div>
    </div>
  );
}