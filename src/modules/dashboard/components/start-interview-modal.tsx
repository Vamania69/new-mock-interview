import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import InterviewForm from "./job-form"

export function StartInerviewModal({ isOpen, setIsopen, interviewId }: any) {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/interview/${interviewId}`)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsopen} modal>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <InterviewForm />
                </div>
                <Button onClick={handleClick} className="">Start your Interview.</Button>
            </DialogContent>
        </Dialog>
    )
}
