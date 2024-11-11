// src/app/api/users/update/route.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { userId, techStack, yearsOfExperience, achievements, urls } = await req.json();

    // Validate the input data
    if (!userId || !techStack || yearsOfExperience === undefined) {
        return new Response(JSON.stringify({ message: 'Invalid input data' }), { status: 400 });
    }

    try {
        // Update the user profile in the database
        await prisma.user.update({
            where: { id: userId },
            data: {
                techStack: techStack, // Ensure this matches the schema
                yearsOfExperience: yearsOfExperience,
                achievements: achievements,
                urls: urls,
                profileSetup: true,
            },
        });

        return new Response(JSON.stringify({ message: 'Profile updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
