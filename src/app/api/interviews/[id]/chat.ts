// /app/api/interviews/chat/initialQuestion/route.ts

import prisma from "@/prisma-client";
import { NextResponse } from "next/server";

// Mock function to generate the initial question; replace with actual AI logic if available
async function generateInitialQuestion(jobPosition: string, jobDescription: string): Promise<string> {
    return `As a ${jobPosition}, can you describe your experience that aligns with the role, especially considering ${jobDescription}?`;
}

export async function POST(req: Request) {
    try {
        const { interviewId } = await req.json();

        if (!interviewId) {
            return NextResponse.json({ success: false, error: "Interview ID is required." }, { status: 400 });
        }

        // Fetch interview details from the database
        const interview = await prisma.interview.findUnique({
            where: { id: interviewId },
            select: { jobPosition: true, jobDescription: true },
        });

        if (!interview) {
            return NextResponse.json({ success: false, error: "Interview not found." }, { status: 404 });
        }

        const { jobPosition, jobDescription } = interview;

        // Generate the initial question based on job details
        const initialQuestion = await generateInitialQuestion(jobPosition, jobDescription);

        // Save the generated question to the database
        const savedQuestion = await prisma.question.create({
            data: {
                content: initialQuestion,
                interviewId: interviewId,
            },
        });

        return NextResponse.json({ success: true, question: savedQuestion });
    } catch (error) {
        console.error("Error generating initial question:", error);
        return NextResponse.json({ success: false, error: "Failed to generate initial question." }, { status: 500 });
    }
}
