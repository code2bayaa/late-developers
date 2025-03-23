// import db from "./lib/database";
// import { errorMonitor } from "events";
import {NextResponse} from "next/server"
import axios from "axios"
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { hash } from "bcrypt";

export async function POST(request){
    const body = await request.json();
    const { email, password } = body;
  
    try {

      const response = await axios.post(`${process.env.BACKEND_API}/netlify/signin`,
        {email, password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
      });
  
      if (response.data.status) {  
        return NextResponse.json({ message: 'User is logged in', status:true, user: response.data.user[0] },{status:200});
      } else {
        return NextResponse.json({ message: 'Invalid credentials', hashedPassword:response.data.hashedPassword },{status:401});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' + ' : ' + error.message }, {status:500});
    }
}

// export default NextAuth({
//     providers: [
//       CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           email: { label: "Email", type: "email", placeholder: "user@example.com" },
//           password: { label: "Password", type: "password" },
//         },
//         async authorize(credentials) {
//           const { email, password } = credentials;
  
//           try {
//             // Query database to verify user credentials
//             const [rows] = await db.query(
//               "SELECT * FROM users WHERE email = ? AND password = ? AND is_logged_in = ?",
//               [email, password, 1] // Make sure you hash and verify passwords in production
//             );
  
//             if (rows.length > 0) {
//               const user = rows[0];
//               return {
//                 id: user.id,
//                 name: user.email,
//                 email: user.email,
//               };
//             } else {
//               return null;
//             }
//           } catch (error) {
//             console.error(error);
//             return null;
//           }
//         },
//       }),
//     ],
//     session: {
//       strategy: "jwt",
//     },
//     pages: {
//       signIn: "/signin", // Redirect users to the login page
//     },
//     callbacks: {
//       async jwt({ token, user }) {
//         if (user) {
//           token.id = user.id;
//         }
//         return token;
//       },
//       async session({ session, token }) {
//         if (token) {
//           session.user.id = token.id;
//         }
//         return session;
//       },
//     },
//   });