"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
    {
        title: "1. Unlock Your Potential with AI-Powered Feedback",
        description:
            "Experience detailed, personalized feedback from our AI to refine your interview skills. Identify strengths and weaknesses in your responses to target specific areas for improvement.Get instant insights into tone, clarity, and relevance to enhance communication.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/assets/step-1.webp"
                    width={400}
                    height={400}
                    property='hight'
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "2. Realistic Mock Interviews Anytime, Anywhere",
        description:
            "Simulate real-world interview scenarios with questions tailored to your field.Practice with a variety of difficulty levels: beginner, intermediate, or advanced. Schedule and conduct interviews at your convenience, right from your device.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/assets/step-2.webp"
                    width={400}
                    height={400}
                    property='hight'
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "3.Expert-Level Insights from Advanced AI Algorithms",
        description:
            "Analyze behavioral patterns and predict how well your answers align with industry expectations. Receive tips on structuring answers using proven methods like STAR (Situation, Task, Action, Result). AI evaluates and scores your confidence, persuasion skills, and problem-solving approach.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/assets/step-3.webp"
                    width={400}
                    height={400}
                    property='hight'
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "4. Visual Reports to Track Your Progress",
        description:
            "Get a comprehensive performance breakdown, including strengths and improvement areas. Compare your results across multiple mock interviews to track progress over time. Share your performance reports with mentors or career coaches for additional guidance.",
        content: (
            <div className="h-full w-full flex items-center justify-center ">
                <Image
                    src="/assets/step-4.webp"
                    width={500}
                    height={400}
                    property='high'
                    className="w-full h-auto"
                    alt="linear board demo"
                />
            </div>
        ),
    },
];
export function StickyScrollRevealDemo() {
    return (
        <div className="p-10 h-screen bg-background-secondary  w-full">
            <StickyScroll content={content} />
        </div>
    );
}
