import { api } from "@/utils/axios-instance";

interface SendAnswerParams {
    id: number;
    userAnswer: string;
    interviewId: number;
}

export const useSendUserAnswerByQuestionId = async ({
    id,
    userAnswer,
    interviewId
}: SendAnswerParams) => {
    try {
        const response: any = await api.post(`/interviews/${interviewId}/question/${id}`, {
            userAnswer
        });

        if (response?.data?.success) {
            return response.data;
        } else {
            console.error('Error updating answer:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error sending answer:', error);
        return null;
    }
};