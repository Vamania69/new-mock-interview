'use cleint'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { useState } from 'react'
import InterviewForm from './job-form'
const JobFormDetailsWrapper = ({ userId }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawerClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger>
                    <Button
                        onClick={() => setIsOpen(true)}
                    >
                        Setup your profile
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="overflow-y-auto h-[80%] !py-10">
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Setup Your Profile</DrawerTitle>
                            <DrawerDescription>Fill in your details below.</DrawerDescription>
                        </DrawerHeader>
                        <div className="w-full mx-auto py-12 max-h-max h-full overflow-y-auto">
                            <InterviewForm userId={userId} handleDrawer={handleDrawerClose} /></div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default JobFormDetailsWrapper



