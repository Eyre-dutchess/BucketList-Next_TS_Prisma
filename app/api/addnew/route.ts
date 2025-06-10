import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/action/getCurrentUser";

export const POST =async (request:Request) =>{
    const resp = await request.json()
    const {title, detail, status} = resp;

    const curUser = await getCurrentUser()

    if(!curUser) return null;
    const result = await prisma.task.create({
        data:{
            title, detail, status,
            userId: curUser.id
        }
    })

    return NextResponse.json(result)
}