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
export default function Categories() {
    const router = useRouter();

    const categoriesData = [
        {
            id: "1",
            name: "Category 1",
            image: "https://picsum.photos/200",
            added: "2022-01-01",
            sales: "10",
            stock: "100",
        },
        {
            id: "2",
            name: "Category 2",
            image: "https://picsum.photos/201",
            added: "2022-01-01",
            sales: "30",
            stock: "50",
        },
        {
            id: "3",
            name: "Category 3",
            image: "https://picsum.photos/202",
            added: "2022-01-01",
            sales: "50",
            stock: "200",
        },

        {
            id: "4",
            name: "Category 4",
            image: "https://picsum.photos/203",
            added: "2022-01-01",
            sales: "20",
            stock: "150",
        },

    ]

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
                <Button onClick={() => {router.push("/dashboard/products/add-product")}}>Add Category</Button> 
            </div>
        </header>
        <DataTable
            data={categoriesData}
            columns={columns}
        /> 
    </div>
);
}