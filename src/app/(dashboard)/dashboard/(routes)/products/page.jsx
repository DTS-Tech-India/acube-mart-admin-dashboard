"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"; 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SlidersHorizontal, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./products-columns";
export default function Products() {
    const router = useRouter()
    const products = [
        {
            id: 1,
            name: "Product 1",
            category: "Category 1",
            stock: 10,
            price: 100,
            status: "Available",
            date: "2022-01-01",
        },
        {
            id: 2,
            name: "Product 2",
            category: "Category 2",
            stock: 20,
            price: 200,
            status: "Available",
            date: "2022-01-01",
        },
        {
            id: 3,
            name: "Product 3",
            category: "Category 3",
            stock: 30,
            price: 300,
            status: "Available",
            date: "2022-01-01",
        },
        {
            id: 4,
            name: "Product 4",
            category: "Category 4",
            stock: 40,
            price: 400,
            status: "Available",
            date: "2022-01-01",
        },
        {
            id: 5,
            name: "Product 5",
            category: "Category 5",
            stock: 50,
            price: 500,
            status: "Available",
            date: "2022-01-01",
        },
    ]
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Products</h1>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                          
                                <Link href="/dashboard">Dashboard</Link>
                            
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Products
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                    <Button onClick={() => {router.push("/dashboard/products/add-products")}}>Add Products</Button> 
                </div>
            </header>
            <DataTable
                data={products}
                columns={columns}
            />  
        </div>
    );
}