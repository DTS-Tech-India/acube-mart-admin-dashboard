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
import { columns } from "./transactions-columns";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
export default function Transactions() {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["transaction"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/all`).then((res) => res.data),
    });

    const modifiedData = useMemo(() => {
        
        return data?.data.map((transaction) => {
          return {
            id: transaction._id,
            transactionId: transaction._id,
            orderId: transaction.orderId._id,
            userId: transaction.userId._id,
            paymentMode: transaction.paymentMode,
            amount: transaction.amount,
            date: transaction.createdAt,
            status: transaction.status,
            created: transaction.createdAt
          }
        })
      }, [data])

    if(isError) return <div>Error while fetching transactions</div>;
    //console.log(data)

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Transactions</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            transactions
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button onClick={() => {router.push("/transactions/add-transaction")}}>Add transaction</Button> 
            </div>
        </header>
        {isLoading ? (
            <Skeleton className="w-full h-full" />
        ) : (
            <DataTable
                data={modifiedData}
                columns={columns}
            /> 
        )}
    </div>
);
}