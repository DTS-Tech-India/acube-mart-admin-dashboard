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
export default function Customers() {
    const router = useRouter();

    const customerData = [
        {
            id: "1",
            name: "John Doe",
            avatar: "https://picsum.photos/200",
            email: "pLwL8@example.com",
            phone: "1234567890",
            orders: "10",
            status: "active",
            balance: "1000",
            created: "2022-01-01",
            status: "active",
        },
        {
            id: "2",
            name: "Jane Doe",
            avatar: "https://picsum.photos/204",
            email: "pLwL8@example.com",
            phone: "1234567890",
            orders: "10",
            status: "blocked",
            balance: "1000",
            created: "2022-01-01",
            status: "active",
        },
        {
            id: "3",
            name: "John Doe",
            avatar: "https://picsum.photos/202",
            email: "pLwL8@example.com",
            phone: "1234567890",
            orders: "10",
            status: "active",
            balance: "1000",
            created: "2022-01-01",
            status: "active",
        },
        {
            id: "4",
            name: "John Doe",
            avatar: "https://picsum.photos/203",
            email: "pLwL8@example.com",
            phone: "1234567890",
            orders: "10",
            status: "active",
            balance: "1000",
            created: "2022-01-01",
            status: "active",
        }

    ]

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Customers</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/dashboard">Dashboard</Link>
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
                <Button onClick={() => {router.push("/dashboard/products/add-product")}}>Add Customer</Button> 
            </div>
        </header>
        <DataTable
            data={customerData}
            columns={columns}
        /> 
    </div>
);
}