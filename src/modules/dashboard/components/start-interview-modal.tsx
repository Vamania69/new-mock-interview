import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export function StartInerviewModal({ isOpen, setIsopen, interviewId }: any) {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/interview/${interviewId}`)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsopen} modal>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Interview Call</DialogTitle>
                    <DialogDescription>
                        Get Ready to start the interview, Best of Luck!!.
                    </DialogDescription>
                </DialogHeader>
                <div>
                </div>
                <Button onClick={handleClick} className="">Start your Interview.</Button>
            </DialogContent>
        </Dialog>
    )
}
