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
import { columns } from "./products-columns";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { products } from "@/lib/get-api-data";
import axios from "axios";

export default function Products() {
    const router = useRouter()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/all`).then((res) => res.data),
    });

    const modifiedData = useMemo(() => {
        return data?.data.map((product) => {
          return {
            id: product._id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            date: product.createdAt,
            status: product.status,
            image: product.featuredImage?.url,
            stock: product.stock,
            variants: product.variants
          }
        })
      }, [data])
    if (isError) return "An error has occurred while fetching products.";

    /* console.log(data)
    console.log(modifiedData) */

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Products</h1>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
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
                    <Button onClick={() => {router.push("/products/add-product")}}>Add Products</Button> 
                </div>
            </header>
            {isLoading ? (
                <Skeleton
                    className="h-96 w-full aspect-auto" 
                />
            ): (
                <>
                    {modifiedData &&
                    <DataTable
                        data={modifiedData}
                        columns={columns}
                    />
                    }
                </>
            )}
            
        </div>
    );
}