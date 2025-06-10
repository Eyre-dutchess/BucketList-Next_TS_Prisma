import prisma from "@/app/libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

export const getTasks = async () =>{
    try {
        const curUser = await getCurrentUser()
        if(!curUser){
            // throw new Error("can't get currentUser")
            return null
        }
        const tasks = await prisma.task.findMany({
            where:{
                userId: curUser.id
            }
        })
        if(!tasks){
            throw new Error("can't find tasks matching this user")
        }
        const safeTasks = tasks.map((task)=>{
            return {
                ...task,
                createdAt: task.createdAt.toISOString(),
                updatedAt: task.updatedAt.toISOString()
            }
        })
        return safeTasks 
    } catch (error: any) {
            return null
        }
}