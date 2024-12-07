"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { api } from '@/utils/axios-instance'; // Adjust the path as necessary
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"


const profileFormSchema = z.object({
    techStack: z
        .array(
            z.string().min(2, {
                message: "Tech stack must be at least 2 characters.",
            })
        )
        .min(1, {
            message: "At least one tech stack is required.",
        }),
    yearsOfExperience: z
        .number()
        .min(0, {
            message: "Years of experience must be a positive number.",
        })
        .max(50, {
            message: "Years of experience must not exceed 50.",
        }),
    achievements: z.string().max(500).optional(),
    urls: z
        .array(z.string().url({ message: "Please enter a valid URL." })) // Change to an array of strings
        .optional(),
})

type UserProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<UserProfileFormValues> = {
    urls: [
        "https://shadcn.com", // Change to string
        "http://twitter.com", // Change to string
    ],
}

export function UserProfileForm({ onProfileUpdate, userId }: { onProfileUpdate: () => void; userId: number }) {
    const form = useForm<UserProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields: urlFields, append: appendUrl } = useFieldArray({
        name: "urls", // This should match the schema
        control: form.control,
    })

    const [techStackInput, setTechStackInput] = useState(""); // State for the tech stack input
    const { watch } = form; // Watch the tech stack field

    const techStack = watch("techStack") || []; // Get the current tech stack values

    const onSubmit = async (data: UserProfileFormValues) => {
        console.log(data, 'form data');
        try {
            const result = await api.post('/users/update', {
                sessionDetails: {
                    userId: userId, // Pass the user ID
                    techStack: data.techStack,
                    yearsOfExperience: data.yearsOfExperience,
                    achievements: data.achievements,
                    urls: data.urls || [], //
                }
                //  Directly use the array of strings
            });

            if (result && result.data) {
                console.log(result.data);
                onProfileUpdate(); // Call the function to close the drawer or update UI // Handle success message
            } else {
                console.error('Error updating profile:', result.data ? result.data : result);
            }


        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error (e.g., show a notification)
        }
    }

    const addTechStack = () => {
        if (techStackInput.trim() && techStackInput.length >= 2) {
            form.setValue("techStack", [...techStack, techStackInput.trim()]); // Add the new tech stack
            setTechStackInput(""); // Clear the input
        }
    };

    const removeTechStack = (index: number) => {
        const updatedTechStack = techStack.filter((_, i) => i !== index);
        form.setValue("techStack", updatedTechStack); // Update the tech stack
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <FormLabel>Tech Stack</FormLabel>
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="e.g., React"
                            value={techStackInput}
                            onChange={(e) => setTechStackInput(e.target.value)}
                        />
                        <Button type="button" variant="outline" onClick={addTechStack}>
                            Add
                        </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                            <div key={index} className="flex items-center rounded-full bg-[#eee] border px-2 py-2">
                                <span className="px-2">{tech}</span>
                                <span className="px-4 text-white hover:bg-white hover:text-black" onClick={() => { removeTechStack(index) }}>X</span>
                            </div>
                        ))}
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="e.g., 5"
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Convert the string input to a number
                                        field.onChange(value ? parseFloat(value) : 0); // Handle empty input
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter the number of years you have worked in your field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="achievements"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Achievements</FormLabel>
                            <FormControl>
                                <Input placeholder="Describe your achievements..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Share your notable achievements or projects.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    {urlFields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}`} // This should match the schema
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        URLs
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        Add links to your website, blog, or social media profiles.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => appendUrl("")} // Append an empty string for new URL
                    >
                        Add URL
                    </Button>
                </div>
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}
