// /components/InterviewForm.js
'use client'

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components/ui/drawer";
import { useState } from "react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/utils/axios-instance';
import { useForm } from 'react-hook-form';
import { StartInerviewModal } from './start-interview-modal';

const InterviewForm = ({ userId, handleDrawer }: any) => {
    const form = useForm({
        defaultValues: {
            jobPosition: '',
            jobDescription: '',
            jobExperience: '',
        },
    });
    const [loading, setLoading] = useState(false);  // To track the loading state
    const [error, setError] = useState<string | null>(null); // To track any error during the request
    const [isOpen, setIsOpen] = useState(false)
    const [isStartInterviewModal, setIsStartInterviewModal] = useState(false)

    const [interviewId, setInterviewId] = useState(null)
    const createInterview = async (data: any) => {
        try {
            setLoading(true); // Set loading to true while the request is being processed
            setError(null); // Reset previous errors
            const response: any = await api.post('/interviews/create', {
                ...data,
                userId,
            });

            if (response.status === 200) {
                setIsStartInterviewModal(true)
                setInterviewId(response.data?.interview?.id)
            } else {
                alert('Failed to create interview.');
            }
        } catch (err) {
            console.error('Error creating interview:', err);
            setError('Failed to create interview. Please try again.');
        } finally {
            setLoading(false); // Set loading to false when the request is complete
        }
    };

    // Form submit handler
    const onSubmit = async (data: any) => {
        // Map form data to state before calling the API
        if (!!data.jobPosition && !!data.jobDescription && !!data.jobExperience) {

            const interviewData = {
                jobPosition: data.jobPosition,
                jobDescription: data.jobDescription,
                jobExperience: data.jobExperience,
            };

            // Call the function to hit the API
            await createInterview(interviewData);
        }
        else {
            alert("Field cannot be empty")
        }
    };

    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}> {/* Control drawer open state */}
                <DrawerTrigger>
                    <Button onClick={() => setIsOpen(true)}>Job Details </Button> {/* Open the drawer */}
                </DrawerTrigger>
                <DrawerContent className="overflow-y-auto h-[80%] !py-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5 mx-auto">
                            {/* Job Position Field */}
                            <FormField
                                control={form.control}
                                name="jobPosition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Position</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Software Engineer" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Specify the job title for the interview.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Job Description Field */}
                            <FormField
                                control={form.control}
                                name="jobDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Briefly describe the role..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief description of the job responsibilities.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Required Experience Field */}
                            <FormField
                                control={form.control}
                                name="jobExperience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Required Experience (years)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="e.g., 3"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value ? parseFloat(value) : 0); // Handle empty input
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the required years of experience for the job.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit">Create Job</Button>
                            <StartInerviewModal isOpen={isStartInterviewModal} setIsOpen={setIsStartInterviewModal} interviewId={interviewId} />
                        </form>
                    </Form>
                </DrawerContent>
            </Drawer>
        </div >


    );
};

export default InterviewForm;


