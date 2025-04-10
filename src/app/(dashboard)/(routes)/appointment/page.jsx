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
import { columns } from "./appointment-columns";

import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
export default function Appointment() {
    const router = useRouter();

    const { data: appointment, isLoading: isAppointmentLoading, isError: isAppointmentError } = useQuery({
        queryKey: ["appointments"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointment/all`).then((res) => {
            //console.log(res);
            return res?.data?.data?.map((appointment) => {
                return {
                    id: appointment?._id,
                    service: appointment?.serviceId?.name,
                    vehicleType: appointment?.vehicleTypeId?.name,
                    serviceProvider: appointment?.serviceProviderId?.name,
                    duration: appointment?.duration,
                    price: appointment?.price,
                    created: appointment?.createdAt,
                    date: appointment?.date,
                    startTime: appointment?.startTime,
                    endTime: appointment?.endTime, 
                    user: appointment?.name,
                    email: appointment?.email,
                    phone: appointment?.phone,
                    totalAmount: appointment?.totalAmount,
                    advancePayment: appointment?.advancePayment,
                    pendingPayment: appointment?.pendingPayment,
                    status: appointment?.status,
                    transactionId: appointment?.transactionId,
                }
            })
        }),
    });
    //console.log(serviceProvider);

    if(isAppointmentError) return <div>Error while fetching Appointments</div>;
    if(isAppointmentLoading) return <div>Loading...</div>;
    /* console.log(adminData?.data.admins); */
    //console.log(modifiedData);
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Appointments</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                        Appointments
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                {/* <Button onClick={() => {router.push("/appointment/add-appointment")}}>Add Appointment</Button> */} 
            </div>
        </header>
        {isAppointmentLoading? (
            <Skeleton className="w-full h-full" />
        ) : (
            <>
                {appointment &&
                <DataTable
                    data={appointment}
                    columns={columns}
                /> }
            </>
        )}
    </div>
);
}