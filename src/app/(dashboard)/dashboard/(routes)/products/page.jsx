"use client"
import { useQuery } from "@tanstack/react-query";

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
import { useEffect } from "react";
import ProductsList from "./get-products";
export default function Products() {
    const router = useRouter()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async() => await ProductsList(),
    });

    if (isLoading) return "Loading...";
    if (isError) return "An error has occurred while fetching products.";
    console.log(data)
    const products = [
        {
            id: 1,
            name: "Product 1",
            category: "Category 1",
            stock: 10,
            price: 100,
            status: "Available",
            date: new Date(2024, 0, 20),
        },
        {
            id: 2,
            name: "Product 2",
            category: "Category 2",
            stock: 20,
            price: 200,
            status: "Available",
            date: new Date(2024, 1, 20),
        },
        {
            id: 3,
            name: "Product 3",
            category: "Category 3",
            stock: 30,
            price: 300,
            status: "Available",
            date: new Date(2024, 2, 2),
        },
        {
            id: 4,
            name: "Product 4",
            category: "Category 4",
            stock: 40,
            price: 400,
            status: "Available",
            date: new Date(2024, 3, 15),
        },
        {
            id: 5,
            name: "Product 5",
            category: "Category 5",
            stock: 50,
            price: 500,
            status: "Available",
            date: new Date(2024, 4, 30),
        },
        {
            id: 6,
            name: "Black pant",
            category: "Pants",
            stock: 60,
            price: 600,
            status: "Available",
            date: new Date(2024, 5, 10),
        },
        {
            id: 7,
            name: "Black shirt",
            category: "Shirts",
            stock: 70,
            price: 700,
            status: "Available",
            date: new Date(2024, 6, 20),
        },
        {
            id: 8,
            name: "Black shoes",
            category: "Shoes",
            stock: 80,
            price: 800,
            status: "Available",
            date: new Date(2024, 7, 5),
        },
        {
            id: 9,
            name: "Black watch",
            category: "Watches",
            stock: 90,
            price: 900,
            status: "Available",
            date: new Date(2024, 8, 15),
        },
        {
            id: 10,
            name: "Black bag",
            category: "Bags",
            stock: 100,
            price: 1000,
            status: "Available",
            date: new Date(2024, 9, 25),
        },  
        {
            id: 11,
            name: "Black jacket",
            category: "Jackets",
            stock: 110,
            price: 1100,
            status: "Available",
            date: new Date(2024, 10, 5),
        },
        {
            id: 12,
            name: "Black jacket",
            category: "Jackets",
            stock: 120,
            price: 1200,
            status: "Available",
            date: new Date(2024, 11, 15),
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