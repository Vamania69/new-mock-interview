"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
    return (
        <div className="h-max h-52 rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const testimonials = [
    {
        "quote": "The only limit to our realization of tomorrow is our doubts of today.",
        "name": "Franklin D. Roosevelt",
        "title": "32nd President of the United States"
    },
    {
        "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "name": "Winston Churchill",
        "title": "Prime Minister of the United Kingdom"
    },
    {
        "quote": "The future belongs to those who believe in the beauty of their dreams.",
        "name": "Eleanor Roosevelt",
        "title": "First Lady of the United States"
    },
    {
        "quote": "Innovation distinguishes between a leader and a follower.",
        "name": "Steve Jobs",
        "title": "Co-founder of Apple Inc."
    },
    {
        "quote": "The only way to do great work is to love what you do.",
        "name": "Mahatma Gandhi",
        "title": "Leader of Indian Independence Movement"
    },
    {
        "quote": "Believe you can and you're halfway there.",
        "name": "Theodore Roosevelt",
        "title": "26th President of the United States"
    },
    {
        "quote": "I have learned over the years that when one's mind is made up, this diminishes fear.",
        "name": "Rosa Parks",
        "title": "Civil Rights Activist"
    },
    {
        "quote": "The best way to predict the future is to create it.",
        "name": "Peter Drucker",
        "title": "Management Consultant and Author"
    },
    {
        "quote": "Your time is limited, don't waste it living someone else's life.",
        "name": "Nelson Mandela",
        "title": "President of South Africa"
    },
    {
        "quote": "The biggest adventure you can ever take is to live the life of your dreams.",
        "name": "Oprah Winfrey",
        "title": "Media Executive and Philanthropist"
    }

];

