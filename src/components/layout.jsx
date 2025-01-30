"use client"
import { SessionProvider } from "next-auth/react";

import NavBar from "../components/NavBar.jsx"
import FOOTER from "../components/footers.jsx"

const MAIN = ({geistSans, geistMono, children}) => {



    return (
        <>
            <SessionProvider>
                <html lang="en">
                    <head>
                    <link rel="canonical" href="https://late-developers.com/shop/" />
                    </head>
                    <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                    >
                    
                        <div id="main-body" className="component">
                        <NavBar/>
                        
                        
                        {children}
                        <FOOTER/>
                        </div>
                    </body>
                </html>
            </SessionProvider>
        </>
    )
}

export default MAIN