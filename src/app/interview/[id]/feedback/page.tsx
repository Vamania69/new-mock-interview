'use client'
import FeedbackProgressBar from '@/components/feedback'
import { api } from '@/utils/axios-instance'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Feedback = () => {
    const [feedback, setFeedback] = useState({})
    const params = useParams()
    const { id } = params

    const getFeedback = async () => {
        try {
            const response = await api.post(`/interviews/${id}/feedback`, {})
            console.log(JSON.parse(response.data?.summary))
            return JSON.parse(response.data?.summary)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getFeedbackResult = async () => {
            const feed_back = await getFeedback()
            if (feed_back) {
                console.log(feedback)
                setFeedback(feed_back)
            }
        }
        getFeedbackResult()
    }, [])

    return (
        <div className='h-screen'>
            <div className='bg-secondary border mx-auto mt-44 w-1/2 p-4 rounded-[10px]'>
                Feedback :
                {/* {feedback?.TECHNICAL && <div>
                    Technical Skills : {feedback?.TECHNICAL}
                    Technical Skills : {feedback?.COMMUNICATION}
                    Technical Skills : {feedback?.OVERALL}
                </div>} */}

                <FeedbackProgressBar feedback={feedback} />
            </div>
        </div>
    )
}

export default Feedback