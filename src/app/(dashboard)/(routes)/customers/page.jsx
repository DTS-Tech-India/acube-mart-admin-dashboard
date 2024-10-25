"use client"

import { useQuery } from "@tanstack/react-query";

import Link from "next/link"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"; 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Phone, Upload } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./customers-columns";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
export default function Customers() {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all`)
        .then((res) => res.data),
    });
    const modifiedData = useMemo(() => {
       
        return data?.data.map((user) => {
            return {
                id: user._id,
                name: user?.name,
                avatar: user?.avatar?.url || `https://picsum.photos/${200 + Math.floor(Math.random() * 100) + 1}`,
                email: user?.email,
                phone: user?.phone ,
                created: user.createdAt,
                orders: user?.orders?.length || 0,
                balance: user?.balance || 0,
                status: user?.status,
            }
        })
    }, [data])
    if(isError) {
        return <div>Error while fetching customers</div>
    }
    //console.log(data);

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Customers</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Customers
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button onClick={() => {router.push("/customers/add-customer")}}>Add Customer</Button> 
            </div>
        </header>
        {isLoading ? (
            <Skeleton className="h-96 w-full aspect-auto" />
        ) : (
            <>
            {modifiedData &&
                <DataTable
                    data={modifiedData}
                    columns={columns}
                /> }
            </>
        )}
        
    </div>
);
}