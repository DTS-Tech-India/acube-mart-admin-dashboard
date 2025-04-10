"use client"

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
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { ImageIcon, Phone, Upload } from "lucide-react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { useQuery } from "@tanstack/react-query";

export default function EditVehicleType({ params }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
    })
    
    const { data: vehicle, isLoadingVehicleType, isErrorVehicleType } = useQuery({
        queryKey: ["service"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicletype/${params.id}`).then((res) => {
            setFormData(res?.data?.data);
            return res?.data?.data
        }),
    });
    console.log(vehicle);
    
    if(isErrorVehicleType) return <div>Error while fetching Vehicle Type</div>;
    if(isLoadingVehicleType) return <div>Loading...</div>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEditVehicleType = (e) => {
        e.preventDefault();
        if (!formData.name) {
            toast.error("Name is required");
            return;
        }
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/update/${params.id}`, formData)
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    toast.success(res.data.message);
                    router.push("/services");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    }
//console.log(formData)
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Edit Vehicle Type</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                            <Link href="/services">Vehicle Types</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Edit Vehicle Type
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button onClick={handleEditVehicleType} >Edit Vehicle Type</Button> 
            </div>
        </header>
        <div className="w-full h-full flex gap-4" >
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Vehicle Type Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Type name here..." required />
                                </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
);
}