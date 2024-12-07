'use client'
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
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const feed_back = getFeedback()
        if (feed_back)
            setFeedback(feed_back)

    }, [])
    return (
        <div className='h-screen'>
            <div className='bg-secondary border h-20 mx-auto mt-44 w-1/2 p-4 rounded-[10px]'>
                Feedback :
            </div>
        </div>
    )
}

export default Feedback