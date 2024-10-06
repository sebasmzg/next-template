import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label:"email",type: 'text', placeholder: "email"},
        password: {label:"password", type: 'password', placeholder: "password"}
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
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
            body: JSON.stringify({ email, password }),
          });

          const user = await res.json();
          console.log(user);
          
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
};

export default auth;
