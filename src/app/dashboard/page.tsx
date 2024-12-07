'use client'
import { CreateUserResponse } from '@/interfaces/api';
import { User } from '@/interfaces/user';
import InterviewForm from '@/modules/dashboard/components/job-form';
import SetupUserProfileWrapper from '@/modules/dashboard/components/setup-user-profile-wrapper';
import UploadUserResumeWrapper from '@/modules/dashboard/components/upload-user-resume-wrapper';
import { api } from '@/utils/axios-instance';
import { useAuth, useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { isSignedIn } = useAuth();
    const { user, isLoaded } = useUser()
    const [userDetails, setUserDetails] = useState<User | undefined>()
    const [userId, setUserId] = useState<number | undefined>(); // State to store user ID
    const [resumeState, setResumeState] = useState(false)

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const storeUserDetails = async () => {
                try {
                    const response = await api.post<CreateUserResponse>('/users/create', {
                        email: user?.emailAddresses[0].emailAddress,
                        name: user?.firstName,
                    });

                    console.log(response.data, 'user details data ')

                    console.log('User saved to database:', response.data);
                    setUserDetails(response.data.user as User); // Now TypeScript knows 'user' exists
                    setUserId(response.data.user.id); // Store the user ID
                    setResumeState(response.data.user.resumeUploaded)
                } catch (error) {
                    console.error('Error saving user:', error);
                }
            };

            storeUserDetails();
        }
    }, [isLoaded, isSignedIn, user]);

    if (!isLoaded) {
        return <div className='h-screen flex items-center justify-center'>
            <div>
                <Loader2 className='' />

                <span className='my-auto mx-auto'>Loading...</span></div>
        </div>
    }
    return (
        <div className='h-screen py-12'>
            {userDetails && (
                <div className='bg-muted-foreground w-4/5 mx-auto rounded-[10px] px-4 py-6 text-lg'>
                    <p>Email: {userDetails.email}</p>
                    <p>Name: {userDetails.name}</p>
                    <p>Profile Setup: {userDetails.profileSetup ? 'Yes' : 'No'}</p>
                    <p>Resume Uploaded: {resumeState ? 'Yes' : 'No'}</p>
                </div>
            )}

            <div className='flex gap-x-12 my-12 w-3/4 mx-auto'>
                {userId && <SetupUserProfileWrapper userId={userId} userDetails={userDetails} />} {/* Pass userId to the wrapper */}

                {userId && <UploadUserResumeWrapper userId={userId} userDetails={userDetails} />}

                {userId && <InterviewForm userId={userId} />}
            </div>
        </div>
    );
};

export default Dashboard;
