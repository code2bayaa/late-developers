import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import db from "../../Signin/lib/database";
import { hash } from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        console.log(email)
        const constantSalt = "$2b$10$ABCDEFGHIJKLMNOPQRSTUV";
  
        const hashedPassword = await hash(password, constantSalt);

        const [rows] = await db.query(
          'SELECT * FROM users WHERE email = ? AND password = ? AND is_logged_in = ?',
          [email, hashedPassword, 1] // Ideally, use hashed passwords for security.
        );

        console.log(rows)
        if (rows.length === 0) {
          throw new Error("No user found with this email");
        }

        const user = rows[0];

        // Check the password
        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Return the user object
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Set this as an environment variable
});

export { handler as GET, handler as POST }