import prisma from "@/app/libs/prismadb";

interface IParams{
    taskId?: string
}
export const getCurrentTask = async (
    params: Promise<IParams>
) =>{
    const {taskId} = await params
    const curTask = await prisma.task.findUnique({
        where:{
            id: taskId
        }
    })
    if(!curTask)return null
    return {
        ...curTask,
        createdAt: curTask.createdAt.toISOString(),
        updatedAt: curTask.updatedAt.toISOString()
    }
}
