import { getCurrentUser } from "@/app/action/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams{
    taskId?: string
}
export const DELETE  = async (
    request: Request,
    {params}:{ params: Promise<IParams>}) : Promise<NextResponse> =>{
    const curUser = await getCurrentUser()
    const {taskId} =await params
    if(!curUser || !taskId || typeof taskId !== "string"){
        return null
    }

    const result = await prisma.task.delete({
        where:{
            id: taskId,
            userId: curUser.id
        }
    })
    return NextResponse.json(result)
}

export const PUT = async(
    request: Request,
    {params}:{ params: Promise<IParams>}
) =>{
    const resp = await request.json()
    const {title, detail, status} = resp;
    const {taskId} =await params

    const result = await prisma.task.update({
        where:{
            id: taskId
        },
        data:{
            title, detail, status
        }
    })
    return NextResponse.json(result)
}
