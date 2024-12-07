'use client'

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { FileUpload } from "@/components/ui/file-upload";
import { data } from "@/constants/data";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface IUploadUserResumeWrapperProps {
    userId: number;
    userDetails: any
}

const UploadUserResumeWrapper: React.FC<IUploadUserResumeWrapperProps> = ({ userId, userDetails }) => {
    const [isOpen, setIsOpen] = useState(false)

    const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
        setFiles(files);
    };
    const handleSubmit = () => {
        setIsOpen(false)
        toast({
            title: "File upload success",
        })
        console.log(data)
    }
    console.log(userDetails)
    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}> {/* Control drawer open state */}
                <DrawerTrigger>
                    <Button disabled={!!userDetails?.profileSetup && userDetails?.resumeUploaded} onClick={() => setIsOpen(true)}>Upload Resume</Button> {/* Open the drawer */}
                </DrawerTrigger>
                <DrawerContent className="overflow-y-auto h-[80%] !py-10">
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader className="text-center">
                            <DrawerTitle className="text-center">Upload Your Resume</DrawerTitle>
                            <DrawerDescription className="text-center">Please upload your resume in PDF format.</DrawerDescription>
                        </DrawerHeader>
                        <div className="w-full mx-auto py-12 ">
                            <FileUpload onChange={handleFileUpload} />
                            <div className="mt-4">
                                <Button onClick={handleSubmit} className="w-full" id="uploadBtn" variant="outline">Upload</Button> {/* Upload button */}
                            </div>
                            <p id="statusMessage"></p>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default UploadUserResumeWrapper;
