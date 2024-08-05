"use client"


import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload } from "lucide-react";
import Link from "next/link";

export default function Coupons() {
    
  return (
    <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Coupons</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/dashboard">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Coupons
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button /* onClick={() => {router.push("/dashboard/admins/add-admin")}} */>Add Coupons</Button> 
            </div>
        </header>
        <div className="w-full h-full flex gap-4">
            Add Coupons
        </div>                    
    </div>
  )
}
