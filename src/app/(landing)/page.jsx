

import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
    return (
        <div className="h-screen w-full flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold">Acube Mart</h1>
            <div className="flex gap-4 font-semibold">
                <Link href="/dashboard" className="p-2 outline rounded-md hover:bg-muted">Go To Dashboard</Link>
                <Link href="/signin" className="p-2 outline rounded-md hover:bg-muted">Sign In</Link>
                <Link href="/signup" className="p-2 outline rounded-md hover:bg-muted">Sign Up</Link>
            </div>
           
        </div>
    )
}