import { Task, User } from "../generated/prisma";

export type SafeUser = Omit<
    User,
    "emailVerified" | "createdAt" | "updatedAt"
>&{
    emailVerified: string | null,
    createdAt: string,
    updatedAt: string
}

export type SafeTask = Omit<
    Task,
    "createdAt" | "updatedAt"
> & {
    createdAt: string,
    updatedAt: string
}
