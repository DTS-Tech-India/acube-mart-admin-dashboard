

import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
    return (
        <div className="h-screen w-full flex flex-col items-center">
            <h1 className="text-3xl font-bold">Acube Mart</h1>
           <Link href="/dashboard" className="p-2 outline rounded-full hover:bg-muted">Go To Dashboard</Link>
        </div>
    )
}