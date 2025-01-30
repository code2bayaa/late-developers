"use client"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import swal from "sweetalert"
import { useLayoutEffect, useEffect } from "react";

export default function Dashboard() {
  const { data:session, status } = useSession();
  const router = useRouter()

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    if(!session){
      router.push("/users/signin")
    }
    // setWindowWidth(() => window.screen.width)
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
      await signOut();
      router.push("/users/signin")
    } catch (error) {
      console.error("Error during sign-out:", error);
      swal("Oops!", error.message, "error");
    }
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <button onClick={() => customSignOut()}>Sign Out</button>
    </div>
  );
}