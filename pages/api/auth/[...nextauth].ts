import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email: {label:"email", type:"email"},
                password:{label:"password", type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("this input information doesn't exist")
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })
                if(!user || !user?.hashedPassword){
                    throw new Error("can't find user matching this email")
                }

                const isCorrectPassword = await bcryptjs.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if(!isCorrectPassword){
                    throw new Error("wrong password")
                }

                return user
            }
        })
    ],
    pages:{
        signIn:"/"
    },
    session:{
        strategy:"jwt"
    },
    debug: process.env.NODE_ENV == "development",
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)