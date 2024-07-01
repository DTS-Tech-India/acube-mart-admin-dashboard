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
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./orders-columns";

//import ProductsList from "./get-products";
//import { useMemo } from "react";
//import { Skeleton } from "@/components/ui/skeleton";

export default function Orders() {
    const router = useRouter()
    /* const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async() => await ProductsList(),
    });

    const modifiedData = useMemo(() => {
        
        const sortedData = data?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedData?.map((product) => {
          return {
            id: product._id,
            slug: product.slug,
            name: product.name,
            category: product.category.name,
            stock: product.stock,
            price: product.price,
            date: product.createdAt,
            status: product.status,
            
          }
        })
      }, [data])

    if (isLoading) return (
        <Skeleton
            className="h-96 w-full aspect-auto" 
        />
    );
    if (isError) return "An error has occurred while fetching products."; */

   /*  console.log(data)
    console.log(modifiedData) */

    const data = [
        {
            id: 1,
            orderId: "123456789",
            product: "Product 1",
            date: "2022-01-01",
            customer: "John Doe",
            total: "$10.00",
            payment: "Mastercard",
            status: "pending",
        },
        {
            id: 2,
            orderId: "567896789",
            product: "Product 2",
            date: "2024-03-01",
            customer: "Jane Doe",
            total: "$12.00",
            payment: "Visa",
            status: "shipped",
        },
        {
            id: 3,
            orderId: "687896789",
            product: "Product 3",
            date: "2023-05-09",
            customer: "Lily",
            total: "$46.00",
            payment: "Mastercard",
            status: "delivered",
        },
        {
            id: 4,
            orderId: "987896789",
            product: "Product 4",
            date: "2024-07-01",
            customer: "Jony",
            total: "$23.00",
            payment: "American Express",
            status: "processing",
        },
        {
            id: 5,
            orderId: "567896789",
            product: "Product 5",
            date: "2023-12-15",
            customer: "Sarah",
            total: "$29.00",
            payment: "Visa",
            status: "cancelled",
        },
        {
            id: 6,
            orderId: "895596789",
            product: "Product 6",
            date: "2024-06-25",
            customer: "Rohit",
            total: "$88.00",
            payment: "Rupay",
            status: "placed",
        },
    ]

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Orders</h1>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Orders
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                    <Button onClick={() => {router.push("#")}}>Add Orders</Button> 
                </div>
            </header>
            {/* <DataTable
                data={products}
                columns={columns}
            />  */} 
            <DataTable
                data={data}
                columns={columns}
            /> 
        </div>
    );
}