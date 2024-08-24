"use client"


import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { columns } from "./coupons-columns";

export default function Coupons() {

    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["coupons"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/all`)
        .then((res) => res.data),
    });

    const modifiedData = useMemo(() => {
        
        return data?.data.map((coupon) => {
          return {
            id: coupon._id,
            code: coupon.code,
            couponType: coupon.couponType,
            amount: coupon.amount,
            usageLimit: coupon.usageLimit,
            expiry: coupon.expiry,
            created: coupon.createdAt,
            status: coupon.status

          }
        })
      }, [data])
    
    if(isError) return <div>Error while fetching coupons</div>;
    
    //console.log(data);
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
                <Button onClick={() => {router.push("/dashboard/coupons/add-coupons")} }>Add Coupons</Button> 
            </div>
        </header>
        {isLoading ? (
            <Skeleton className="w-full h-full" />
        ) : (
            <DataTable
                data={modifiedData}
                columns={columns}
            /> 
        )}                    
    </div>
  )
}
