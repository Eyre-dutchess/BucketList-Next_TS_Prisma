import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import prisma from "@/app/libs/prismadb";

export const getSession = async () =>{
    return await getServerSession(authOptions)
}

export const getCurrentUser = async() =>{
    try {
        const session = await getSession()
        if(!session?.user?.email){
            throw new Error("can't get verification")
        }
        const currentUser = await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        })
        if(!currentUser){
            throw new Error("can't find user to this email")
        }
        return {
            ...currentUser,
            emailVerified: currentUser.emailVerified?.toISOString() || null,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString()
        }
    } catch (error: any) {
        return null
    }
}