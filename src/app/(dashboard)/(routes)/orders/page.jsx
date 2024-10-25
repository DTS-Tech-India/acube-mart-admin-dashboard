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

//import { products } from "@/lib/get-api-data";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function Orders() {
    const router = useRouter()
    const { data: orders, isLoading: isLoadingOrders, isError: isErrorOrders } = useQuery({
        queryKey: ["orders"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/all`)
        .then((res) => res.data),
    });

    const modifiedData = useMemo(() => {
        
        return orders?.data.map((order) => {
          return {
            id: order._id,
            orderId: order._id,
            total: order?.total,
            date: order.createdAt,
            status: order?.status,
            image: order?.products[0]?.productId?.featuredImage?.url,
            product: order?.products.map((product) => product?.productId?.name),
            payment: order?.transactionId?.paymentMode || "N/A",
            customer: order?.userId?.name,
          }
        })
      }, [orders])

    if (isErrorOrders) return "An error has occurred while fetching products."; 

    //console.log(orders)
    //console.log(modifiedData)

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Orders</h1>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
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
                    {/* <Button onClick={() => {router.push("#")}}>Add Orders</Button>  */}
                </div>
            </header>
            {isLoadingOrders ? (
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