// InterviewChatPage.tsx
'use client';
import { Button } from '@/components/ui/button';
import { useGetInterviewQuestions } from '@/modules/interview/[chat-id]/hooks/use-get-interview-questions';
import UserInputWrapper from '@/modules/interview/[chat-id]/user-input-wrapper';
import { api } from '@/utils/axios-instance';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Question {
    id: number;
    interviewId: number;
    content: string;
    userAnswers: string;
}

const InterviewChatPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const router = useRouter()
    const getFollowUpQuestion = async () => {
        setLoading(true);
        try {
            const response = await api.post(`/interviews/${id}/question`, {});
            if (response?.data) {
                await getUserInterviewQuestions(id);
            }
        } catch (error) {
            console.error('Error fetching follow-up question:', error);
        } finally {
            setLoading(false);
        }
    };

    const getUserInterviewQuestions = async (id: string) => {
        try {
            const data: any = await useGetInterviewQuestions({ interviewId: id });
            setQuestions(data?.questions || []);
            setCurrentQuestion(data?.questions[data?.questions?.length - 1]);
            return data;
        } catch (error) {
            console.error('Error fetching interview questions:', error);
        }
    };


    const handleSubmit = () => {
        router.push(`/interview/feedback/${id}`)
    }

    useEffect(() => {
        getFollowUpQuestion()
        getUserInterviewQuestions(id);
    }, [id]);

    return (
        <div className='min-h-screen max-h-screen flex flex-col w-4/5 bg-[#ddd] text-[#1b1b1b] px-4 py-8 mx-auto'>
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    <div className='overflow-y-auto max-h-3/4 border h-screen mb-4'>
                        {questions?.length > 0 && (
                            <div>
                                {questions.map((ques: Question, index: number) => (
                                    <div key={ques.id} className='w-full flex flex-col'>
                                        <div className='bg-[#AAA] rounded-[10px] px-4 py-6 m-4 w-3/4'>
                                            {ques.content}
                                        </div>
                                        {ques.userAnswers && (
                                            <div className='bg-[#AAA] rounded-[10px] px-4 py-6 m-4 max-w-3/4 ml-auto'>
                                                {ques.userAnswers}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='mt-auto pb-4 self-center w-4/5'>
                        <UserInputWrapper
                            question={currentQuestion}
                            onAnswerSubmitted={getFollowUpQuestion}
                        />
                        {
                            questions?.length > 8 && <Button className='mx-auto' onClick={handleSubmit}>Submit</Button>
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default InterviewChatPage;