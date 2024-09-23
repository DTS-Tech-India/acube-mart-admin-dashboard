"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="w-full h-screen flex flex-col items-center justify-center">
                <div className="p-8 flex flex-col items-center gap-4">
                    <h2 className="text-4xl font-bold">Something went wrong!</h2>
                    {/* <p className="text-lg">{error.message}</p> */}
                    <Button  onClick={() => reset()} className="text-xl">Try again</Button>
                </div>
            </body>
        </html>
    )
}