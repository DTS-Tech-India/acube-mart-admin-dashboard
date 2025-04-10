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
export default function ServiceProviders() {
    const router = useRouter();

    const { data: serviceProvider, isLoading: isServiceProviderLoading, isError: isServiceProviderError } = useQuery({
        queryKey: ["serviceProvider"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/serviceprovider/all`).then((res) => {

            return res?.data?.data?.map((serviceProvider) => {
                return {
                    id: serviceProvider?._id,
                    service: serviceProvider?.serviceId?.name,
                    vehicleType: serviceProvider?.vehicleTypeId?.name,
                    duration: serviceProvider?.duration,
                    price: serviceProvider?.price,
                    created: serviceProvider?.createdAt,
                }
            })
        }),
    });
    //console.log(serviceProvider);

    if(isServiceProviderError) return <div>Error while fetching Admins</div>;
    if(isServiceProviderLoading) return <div>Loading...</div>;
    /* console.log(adminData?.data.admins); */
    //console.log(modifiedData);
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Service Providers</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                        Service Providers
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button onClick={() => {router.push("/service-provider/add-service-provider")}}>Add Service</Button> 
            </div>
        </header>
        {isServiceProviderLoading ? (
            <Skeleton className="w-full h-full" />
        ) : (
            <>
                {serviceProvider &&
                <DataTable
                    data={serviceProvider}
                    columns={columns}
                /> }
            </>
        )}
    </div>
);
}