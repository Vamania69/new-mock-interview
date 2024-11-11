import { api } from "@/utils/axios-instance";

export const useGetInterviewQuestions = async ({ interviewId }: any) => {

    try {
        const response = await api.get(`/interviews/${interviewId}/question`);
        console.log(response, '---------------response interview chat questions');
        return response.data
    } catch (error) {
        console.error('Error fetching initial question:', error);
    }
};