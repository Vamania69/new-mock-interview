'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useSendUserAnswerByQuestionId } from './hooks/use-send-user-answer-by-ques-id'
import { useGetInterviewQuestions } from './hooks/use-get-interview-questions'

export interface Question {
    id: number;
    interviewId: number;
    content: string;
    userAnswers: string;
}
interface UserInputWrapperProps {
    question?: Question;
    onAnswerSubmitted: () => Promise<void>;
}

const UserInputWrapper = ({ question, onAnswerSubmitted }: UserInputWrapperProps) => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };



    const handleSubmit = async () => {
        if (!userInput.trim() || !question) {
            alert('Please enter an answer before submitting');
            return;
        }

        try {
            console.log(question, '----------------------//////////question andsewer')
            setIsSubmitting(true);
            const response = await useSendUserAnswerByQuestionId({
                id: question.id,
                userAnswer: userInput.trim(),
                interviewId: question.interviewId
            });

            if (response?.success) {
                setUserInput('');
                await onAnswerSubmitted();  // Generate follow-up question
            }
        } catch (error) {
            console.error('Failed to submit answer:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto h-auto flex gap-x-4 justify-center items-center'>
            <Textarea
                value={userInput}
                name='userInput'
                placeholder='Write your answer.'
                onChange={handleInputChange}
                className='bg-[#999] max-h-32 text-gray-700 w-1/2 h-20 border mx-4'
                disabled={isSubmitting || !question}
            />
            <Button
                onClick={handleSubmit}
                className='ml-4'
                disabled={isSubmitting || !userInput.trim() || !question}
            >
                <Send />
            </Button>
        </div>
    );
};

export default UserInputWrapper