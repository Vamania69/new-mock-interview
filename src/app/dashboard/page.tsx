'use client'
import { CreateUserResponse } from '@/interfaces/api';
import { User } from '@/interfaces/user';
import InterviewForm from '@/modules/dashboard/components/job-form';
import SetupUserProfileWrapper from '@/modules/dashboard/components/setup-user-profile-wrapper';
import UploadUserResumeWrapper from '@/modules/dashboard/components/upload-user-resume-wrapper';
import { api } from '@/utils/axios-instance';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { isSignedIn } = useAuth();
    const { user, isLoaded } = useUser()
    const [userDetails, setUserDetails] = useState<User | undefined>()
    const [userId, setUserId] = useState<number | undefined>(); // State to store user ID

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
                } catch (error) {
                    console.error('Error saving user:', error);
                }
            };

            storeUserDetails();
        }
    }, [isLoaded, isSignedIn, user]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Dashboard</h1>
            {userDetails && (
                <div>
                    <p>Email: {userDetails.email}</p>
                    <p>Name: {userDetails.name}</p>
                    <p>Profile Setup: {userDetails.profileSetup ? 'Yes' : 'No'}</p>
                    <p>Resume Uploaded: {userDetails.resumeUploaded ? 'Yes' : 'No'}</p>
                </div>
            )}

            {userId && <SetupUserProfileWrapper userId={userId} userDetails={userDetails} />} {/* Pass userId to the wrapper */}

            {userId && <UploadUserResumeWrapper userId={userId} />}

            {userId && <InterviewForm userId={userId} />}

        </div>
    );
};

export default Dashboard;
