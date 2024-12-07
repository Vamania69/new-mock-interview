'use client'
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCardsDemo } from "@/modules/landing/card-scroll-wrapper";
import { StickyScrollRevealDemo } from "@/modules/landing/sticky-benefits-wrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/dashboard')
  }
  return (
    <main className="bg-[#EEE]">
      <div className="flex gap-x-5 justify-between items-center">
        <div className="w-1/2 text-center text-muted">
          <h2 className="text-2xl font-bold mb-4">Land Your Dream Job with 100% Confidence</h2>
          <p className="text-lg font-semibold">Every day, 500 candidates level up with us.</p>
          <Button size={'xxl'} className="mt-4" onClick={handleClick}>Level Up!! Get Started</Button>
        </div>
        <div className="w-1/2 my-5">
          <Image
            className="w-1/2 mx-auto h-full"
            src="/assets/hero-interview.svg"
            alt="Next.js logo"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <InfiniteMovingCardsDemo />
        <StickyScrollRevealDemo />
      </div>

    </main>
  );
}
