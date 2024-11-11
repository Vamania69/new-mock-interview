import { NextResponse } from 'next/server';
import prisma from '../../../../prisma-client';

interface RouteParams {
    params: {
        id: string;
        interviewId: string;
    }
}
export async function POST(
    request: Request,
    { params }: { params: { id: string; quesId: string } }
) {
    const { id, quesId } = params
    try {
        const body = await request.json();
        const { userAnswer } = body;

        if (!userAnswer?.trim()) {
            return NextResponse.json(
                { success: false, error: 'The answer cannot be an empty string.' },
                { status: 400 }
            );
        }

        const question = await prisma.question.update({
            where: {
                id: parseInt(quesId),
            },
            data: {
                userAnswers: userAnswer.trim()
            }
        });

        return NextResponse.json({
            success: true,
            question
        });
    } catch (error) {
        console.error('Error Updating Question:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update the question.' },
            { status: 500 }
        );
    }
}