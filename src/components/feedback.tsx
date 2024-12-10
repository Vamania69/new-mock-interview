import React, { useState } from 'react'

const FeedbackProgressBar = ({ feedback }) => {
    const { COMMUNICATION, TECHNICAL, OVERALL } = feedback;

    const getProgressBarWidth = (value) => {
        return `${(value / 10) * 100}%`; // Convert value to percentage
    };

    return (
        <div className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Communication</label>
                <div className='relative w-full bg-gray-200 rounded-full h-4'>
                    <div
                        className='bg-blue-600 h-full rounded-full'
                        style={{ width: getProgressBarWidth(COMMUNICATION) }}
                    ></div>
                </div>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Technical Skills</label>
                <div className='relative w-full bg-gray-200 rounded-full h-4'>
                    <div
                        className='bg-green-600 h-full rounded-full'
                        style={{ width: getProgressBarWidth(TECHNICAL) }}
                    ></div>
                </div>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Overall</label>
                <div className='relative w-full bg-gray-200 rounded-full h-4'>
                    <div
                        className='bg-yellow-600 h-full rounded-full'
                        style={{ width: getProgressBarWidth(OVERALL) }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackProgressBar