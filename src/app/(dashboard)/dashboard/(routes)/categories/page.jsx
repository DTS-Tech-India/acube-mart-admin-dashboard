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
import { columns } from "./categories-columns";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { elements } from "@/lib/get-api-data";
export default function Categories() {
    const router = useRouter();

    const {data, isLoading, isError} = useQuery({
        queryKey: ["elements"],
        queryFn: async() => await elements(),
    })

    const modifiedData = useMemo(() => {
        
        const sortedData = data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedData?.map((element) => {
          return {
            id: element._id,
            name: element.name,
            image: `https://picsum.photos/${200 + Math.floor(Math.random() * 100)}`,
            sales: Math.floor(Math.random() * 100),
            stock: Math.floor(Math.random() * 100),
            added: element.createdAt,
            type: element.typeId?.name,
            category: element.categoryId?.name
          }
        })
      }, [data]);

    if (isLoading) return (
        <Skeleton
            className="h-96 w-full aspect-auto" 
        />
    );

    if (isError) return (
        <div>Error while fetching categories</div>
    );

    //console.log(data, modifiedData);

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Categories</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/dashboard">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Categories
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button onClick={() => {router.push("/dashboard/categories/add-category")}}>Add Category</Button> 
            </div>
        </header>
        <DataTable
            data={modifiedData}
            columns={columns}
        /> 
    </div>
);
}