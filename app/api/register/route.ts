import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcryptjs from "bcryptjs"

export const POST =async (request:Request): Promise<NextResponse>  =>{
    const resp = await request.json()
    const {email, name, password} = resp;
    const hashedPassword = await bcryptjs.hash(password, 12)
    const result = await prisma.user.create({
        data:{
            email, name, hashedPassword
        }
    })
    return NextResponse.json(result)
}
