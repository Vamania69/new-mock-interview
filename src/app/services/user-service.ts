import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
    createUser: async (email: string, name?: string) => {
        return await prisma.user.create({
            data: {
                email,
                name,
                profileSetup: false,
                resumeUploaded: false,
            },
        });
    },

    getUserById: async (id: number): Promise<User | null> => {
        return await prisma.user.findUnique({
            where: { id },
        });
    },

    getAllUsers: async (): Promise<User[]> => {
        return await prisma.user.findMany();
    },

    updateUser: async (id: number, data: Partial<Omit<User, 'id'>>) => {
        return await prisma.user.update({
            where: { id },
            data,
        });
    },

    deleteUser: async (id: number) => {
        return await prisma.user.delete({
            where: { id },
        });
    },
};