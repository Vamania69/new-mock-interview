import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";
import prisma from "../../../prisma-client";


export async function POST(req: Request, { params }: { params: { id: string } }) {
    const schema = {
        description: "Feedback response object",
        type: SchemaType.OBJECT,
        properties: {
            COMMUNICATION: {
                type: SchemaType.INTEGER,
                description: "Rating for communication, between 1 and 10",
                minimum: 1,
                maximum: 10,
                nullable: false,
            },
            TECHNICAL: {
                type: SchemaType.INTEGER,
                description: "Rating for technical skills, between 1 and 10",
                minimum: 1,
                maximum: 10,
                nullable: false,
            },
            OVERALL: {
                type: SchemaType.INTEGER,
                description: "Overall rating, between 1 and 10",
                minimum: 1,
                maximum: 10,
                nullable: false,
            },
        },
        required: ["COMMUNICATION", "TECHNICAL", "OVERALL"],
    };
    const { id } = params;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ success: false, error: 'API key not found.' }, { status: 401 });
    }


    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        }
    });

    try {
        // Fetch questions for the interview directly from the database
        const questions = await prisma.question.findMany({
            where: { interviewId: parseInt(id) },
            select: { content: true, userAnswers: true },
        });

        if (!questions || questions.length === 0) {
            return NextResponse.json({ success: false, error: "No questions found for this interview." }, { status: 404 });
        }

        // Prepare data for summary
        const feedbackData = questions.map(question => ({
            question: question.content,
            userAnswer: question.userAnswers || "No answer provided" // Use the stored user answer or a default message
        }));


        console.log(feedbackData)
        // Generate summary using Gemini API
        const summary = await generateFeedbackSummary(model, feedbackData);

        return NextResponse.json({ success: true, summary });
    } catch (error) {
        console.error("Error generating feedback:", error);
        return NextResponse.json({ success: false, error: "Failed to generate feedback.", details: error.message }, { status: 500 });
    }
}



async function generateFeedbackSummary(model: any, feedbackData: any[]) {
    const prompt = `
        You are an AI assistant providing feedback on an interview.

        Here are the questions and answers:
        ${feedbackData.map(item => `Q: ${item.question}\nA: ${item.userAnswer}`).join('\n\n')}
        
        You have to analyze all the answers and questions and find how specific a answer is to a particular question and read the overall answers in a single object not for a particular question.

        Please provide feedback response in the following format only:
        {
            "COMMUNICATION": <value>,
            "TECHNICAL": <value>,
            "OVERALL": <value>
        }
        Each value should be a rating from 0 to 10 based on the quality of the answer provided.
    `;

    const aiResponse = await model.generateContent(prompt);
    return aiResponse.response?.text() || "No summary generated.";
}
