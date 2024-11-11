import { Button } from "@/components/ui/button"
import { User } from "@/interfaces/user"
import { useState } from "react"


import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { UserProfileForm } from "./user-profile-form"

interface ISetupUserProfileWrapperProps {
    userDetails: User | undefined
    userId: number
}

const SetupUserProfileWrapper = ({ userDetails, userId }: ISetupUserProfileWrapperProps) => {
    const [isOpen, setIsOpen] = useState(false); // State to manage drawer open/close

    const handleDrawerClose = () => {
        setIsOpen(false); // Close the drawer
    };


    console.log(userDetails?.profileSetup)

    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}> {/* Control drawer open state */}
                <DrawerTrigger>
                    <Button
                        disabled={!!userDetails?.profileSetup}
                        onClick={() => setIsOpen(true)} // Open the drawer
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
                        <div className="w-1/2 mx-auto py-12 max-h-max h-full overflow-y-auto">
                            <UserProfileForm userId={userId} onProfileUpdate={handleDrawerClose} /> {/* Pass the handler */}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default SetupUserProfileWrapper
