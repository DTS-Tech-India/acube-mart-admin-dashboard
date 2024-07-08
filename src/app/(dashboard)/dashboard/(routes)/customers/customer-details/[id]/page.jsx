"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function CustomerDetails({ params }) {
    const router = useRouter();
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Customer Details</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/dashboard/products">Customers</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Customer Details
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                    <Button onClick={() => {router.push("/dashboard/products/add-customer")}}>Add Products</Button> 
                </div>
            </div>
            <div className="w-full h-full flex gap-4">
                <div className="w-full max-w-xs h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardContent className="flex flex-col gap-4">
                           <div className="flex flex-col w-full h-full min-h-[70dvh]">
                            <div className="w-full h-full bg-indigo-700 rounded-md relative">
                                <Image 
                                    src="https://picsum.photos/400" 
                                    alt="customer" 
                                    width={200} 
                                    height={200} 
                                    className="w-40 h-40 object-cover rounded-full absolute top-1/2 left-2 "
                                />
                            </div>
                            <div className="w-full h-full flex flex-col items-center ">
                                <h1 className="text-xl font-semibold">John Doe</h1>
                                <p className="text-sm text-muted-foreground">jodndoe123@gmail.com</p>
                            </div>
                           </div>
                           <div></div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Details
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            hye!
                        </CardContent>
                    </Card>
                </div>
            </div>
            Customer Details: {params.id}
        </div>
    )
}