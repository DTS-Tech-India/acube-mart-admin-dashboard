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
import { columns } from "./services-columns";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
export default function Services() {
    const router = useRouter();

    const { data: serviceData, isLoading, isError } = useQuery({
        queryKey: ["serviceData"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/all`).then((res) => res.data),
    });
    //console.log(serviceData);
    const modifiedData = useMemo(() => {
       
        return serviceData?.data?.map((service) => {
          return {
            id: service?._id,
            name: service?.name,
            duration: service?.duration,
            price: service?.price,
            created: service.createdAt,
          }
        })
      }, [serviceData])

    if(isError) return <div>Error while fetching Admins</div>;
    if(isLoading) return <div>Loading...</div>;
    /* console.log(adminData?.data.admins); */

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Services</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Services
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button onClick={() => {router.push("/services/add-service")}}>Add Service</Button> 
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