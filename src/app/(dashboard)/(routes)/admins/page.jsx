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
import { columns } from "./admins-columns";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
export default function Admins() {
    const router = useRouter();

    const { data: adminData, isLoading, isError } = useQuery({
        queryKey: ["adminData"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/all`),
    });

    const modifiedData = useMemo(() => {
       
        return adminData?.data.admins.map((admin) => {
          return {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            avatar: admin?.avatar?.url || `https://picsum.photos/${200 + Math.floor(Math.random() * 100) + 1}`,
            created: admin.createdAt,
            role: admin.role,
          }
        })
      }, [adminData])

    if(isError) return <div>Error while fetching Admins</div>;
    /* console.log(adminData?.data.admins); */

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Admins</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Admins
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button onClick={() => {router.push("/admins/add-admin")}}>Add Admin</Button> 
            </div>
        </header>
        {isLoading ? (
            <Skeleton className="w-full h-full" />
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