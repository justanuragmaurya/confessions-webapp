import prisma from './db';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
         name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          //@ts-ignore
          async authorize(credentials: any) {

            const email = credentials.username;
            const password = credentials.password;

            if(!email || !password){
                return new Error("Please fill all the fields")
            }

            const user = await prisma.user.findUnique({
                where:{
                    email:email
                }
            })

            if(!user){
                return null;
            }   

            const isValid = await bcrypt.compare(password,user.password)

            if(isValid){
                console.log("user logged in ")
                return user
            }else{
                console.log("invalid pass")
                return null
            }
            
          },
        },
        
    ),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
        }
        return token;
        },
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid
          }
          return session
      }
    },
  }satisfies NextAuthOptions
