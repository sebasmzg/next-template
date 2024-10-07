import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: {
        access_token: string
        exp: number;
        iat: number;
        jti: string
      };
      userlogin: {
        _id: string;
        email: string;
        username: string;
        name: string;
        phone: string;
        __v: number;
      };
    };
  }
}
