import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label:"username",type: 'text'},
        password: {label:"password", type: 'password'}
      },
      async authorize(credentials: Record<"email" | "password", string> | any) {
      
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
          if (!apiUrl) {
            throw new Error("API URL is not defined");
          }
          const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password }),
          });

          const user = await res.json();
          
          if (!res.ok) {
            throw new Error(user.message || "Invalid credentials");
          }

          return user;

        } catch (error) {
          console.error("Error during authentication ", error);
          throw new Error("Invalid credentials");
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.access_token = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
  }
};

export default auth;
