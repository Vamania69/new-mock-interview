import { DEFAULT_VALUES, INDUSTRY_QUESTIONS } from "@/constants/pompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from '../../../prisma-client';

// Define types for better type safety
interface InterviewData {
    jobPosition: string;
    jobDescription: string;
    userId: number;
}

interface UserProfile {
    techStack: string[];
    yearsOfExperience: number;
    achievements: string[];
}

interface Question {
    content: string;
    createdAt: Date;
    userAnswers?: string;
}



export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API key not found.' }), { status: 401 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        // Fetch and validate interview data
        const interview: any = await fetchAndValidateInterview(parseInt(id));
        if (!interview.success) {
            return new Response(JSON.stringify(interview), { status: interview.status });
        }

        // Fetch and validate user data
        const user = await fetchAndValidateUser(interview.data.userId);
        if (!user.success) {
            return new Response(JSON.stringify(user), { status: user.status });
        }

        // Get existing questions
        const existingQuestions = await prisma.question.findMany({
            where: { interviewId: parseInt(id) },
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: {
                content: true,
                userAnswers: true,
                createdAt: true
            }
        });

        // Generate the next question
        const generatedQuestion = await generateNextQuestion(
            model,
            interview.data,
            user.data,
            existingQuestions
        );

        // Save the question
        const savedQuestion = await prisma.question.create({
            data: {
                interviewId: parseInt(id),
                content: generatedQuestion,
            },
        });

        return new Response(JSON.stringify({ success: true, question: savedQuestion }), { status: 200 });
    } catch (error: any) {
        console.error('Error generating question:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: 'Failed to generate question.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }),
            { status: 500 }
        );
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Fetch interview details from the database
        const interview = await prisma.interview.findUnique({
            where: { id: parseInt(id) },
            include: {
                questions: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        if (!interview) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Interview not found.'
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                questions: interview.questions
            }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching questions:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: 'Failed to fetch questions.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }),
            { status: 500 }
        );
    }
}

async function fetchAndValidateInterview(id: number) {
    const interview = await prisma.interview.findUnique({
        where: { id },
        select: {
            jobPosition: true,
            jobDescription: true,
            userId: true,
        },
    });

    if (!interview) {
        return { success: false, error: 'Interview not found.', status: 404 };
    }

    // Sanitize and validate interview data
    const sanitizedInterview = {
        jobPosition: interview.jobPosition?.trim() || DEFAULT_VALUES.jobPosition,
        jobDescription: interview.jobDescription?.trim() || DEFAULT_VALUES.jobDescription,
        userId: interview.userId
    };

    return { success: true, data: sanitizedInterview, status: 200 };
}

async function fetchAndValidateUser(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            techStack: true,
            yearsOfExperience: true,
            achievements: true,
        },
    });

    if (!user) {
        return { success: false, error: 'User not found.', status: 404 };
    }

    // Sanitize and validate user data
    const sanitizedUser = {
        techStack: Array.isArray(user.techStack) && user.techStack.length > 0
            ? user.techStack
            : DEFAULT_VALUES.techStack,
        yearsOfExperience: typeof user.yearsOfExperience === 'number'
            ? user.yearsOfExperience
            : DEFAULT_VALUES.yearsOfExperience,
        achievements: Array.isArray(user.achievements) && user.achievements.length > 0
            ? user.achievements
            : DEFAULT_VALUES.achievements
    };

    return { success: true, data: sanitizedUser, status: 200 };
}

async function generateNextQuestion(
    model: any,
    interview: InterviewData,
    user: UserProfile,
    existingQuestions: Question[]
) {
    try {
        let prompt;

        if (existingQuestions.length === 0) {
            prompt = generateInitialPrompt(interview, user);
        } else {
            prompt = generateFollowUpPrompt(interview, existingQuestions);
        }

        const aiResponse = await model.generateContent(prompt);
        const generatedQuestion = aiResponse.response?.text();

        // Validate AI response
        if (!generatedQuestion || generatedQuestion.length < 10) {
            return getFallbackQuestion(interview.jobPosition, existingQuestions.length);
        }

        return generatedQuestion;
    } catch (error) {
        console.error('AI generation error:', error);
        return getFallbackQuestion(interview.jobPosition, existingQuestions.length);
    }
}

function generateInitialPrompt(interview: InterviewData, user: UserProfile) {
    return `
        You are an interviewer conducting an interview for the "${interview.jobPosition}" position.

        Candidate Profile:
        - Years of Experience: ${user.yearsOfExperience} years
        - Skills: ${user.techStack.join(', ')}
        - Achievements: ${user.achievements.join(', ')}

        Job Description: ${interview.jobDescription}

        Generate a professional, focused first interview question that:
        1. Is relevant to the position and candidate's background
        2. Is open-ended but specific
        3. Focuses on practical experience
        4. Does not include any explanatory text or context
        5. Is direct and concise
    `;
}

function generateFollowUpPrompt(interview: InterviewData, existingQuestions: Question[]) {
    const recentContext = existingQuestions
        .map(q => `Q: ${q.content}${q.userAnswers ? `\nA: ${q.userAnswers}` : ''}`)
        .join('\n\n');

    return `
        You are continuing an interview for the "${interview.jobPosition}" position.

        Previous conversation:
        ${recentContext}

        Generate the next interview question that:
        1. Builds on the previous conversation
        2. Explores a new relevant aspect of the candidate's experience
        3. Is specific and focused
        4. Does not include any explanatory text
        5. Is direct and concise
    `;
}

function getFallbackQuestion(jobPosition: string, questionCount: number): string {
    const isSoftwareRole = jobPosition.toLowerCase().includes('software') ||
        jobPosition.toLowerCase().includes('developer') ||
        jobPosition.toLowerCase().includes('engineer');

    const questions = isSoftwareRole ? INDUSTRY_QUESTIONS.software : INDUSTRY_QUESTIONS.general;
    return questions[questionCount % questions.length] || DEFAULT_VALUES.defaultQuestion;
}