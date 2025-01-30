import db from "./lib/database";
// import { errorMonitor } from "events";
import {NextResponse} from "next/server"
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcrypt";

export async function POST(request){
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, {status:400});
    }
  
    try {

      const constantSalt = "$2b$10$ABCDEFGHIJKLMNOPQRSTUV";

      const hashedPassword = await hash(password, constantSalt);

      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, hashedPassword] // Ideally, use hashed passwords for security.
      );
  
      if (rows.length > 0) {
        // Update is_logged_in if required
        await db.query('UPDATE users SET is_logged_in = 1 WHERE id = ?', [rows[0].id]);
  
        return NextResponse.json({ message: 'User is logged in', status:true, user: rows[0] },{status:200});
      } else {
        return NextResponse.json({ message: 'Invalid credentials', hashedPassword },{status:401});
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