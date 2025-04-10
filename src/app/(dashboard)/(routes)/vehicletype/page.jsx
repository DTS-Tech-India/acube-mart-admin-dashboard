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
import { columns } from "./vehicle-type-columns";

import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
export default function VehicleType() {
    const router = useRouter();

    const { data: vehicleData, isLoading, isError } = useQuery({
        queryKey: ["VehicleType"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicletype/all`).then((res) => {
            return res.data.data.map((vehicleType) => {
                return {
                    id: vehicleType?._id,
                    name: vehicleType?.name,
                    isActive: vehicleType?.isActive,
                    created: vehicleType.createdAt,
                }
            })
        }),
    });
    //console.log(serviceData);

    if(isError) return <div>Error while fetching Vehicle Types</div>;
    if(isLoading) return <div>Loading...</div>;
    /* console.log(adminData?.data.admins); */

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Vehicle Types</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Vehicle Types
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                <Button onClick={() => {router.push("/vehicletype/add-vehicle-type")}}>Add Vehicle Type</Button> 
            </div>
        </header>
        {isLoading ? (
            <Skeleton className="w-full h-full" />
        ) : (
            <>
                {vehicleData &&
                <DataTable
                    data={vehicleData}
                    columns={columns}
                /> }
            </>
        )}
    </div>
);
}