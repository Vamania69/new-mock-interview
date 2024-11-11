// /api/interviews/create/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../prisma-client';
import { stringify } from 'querystring';

// Define the POST handler function for the route
export async function POST(req: Request) {
    try {
        const { jobPosition, jobDescription, jobExperience, userId } = await req.json();

        const interview = await prisma.interview.create({
            data: {
                jobPosition,
                jobDescription,
                jobExperience: stringify(jobExperience),
                userId,
                questions: {
                    create: [], // Initialize with empty questions array
                },
            },
        });

        return NextResponse.json({ success: true, interview });
    } catch (error) {
        console.error('Error creating interview:', error);
        return NextResponse.json({ success: false, error: 'Failed to create interview.' }, { status: 500 });
    }
}
