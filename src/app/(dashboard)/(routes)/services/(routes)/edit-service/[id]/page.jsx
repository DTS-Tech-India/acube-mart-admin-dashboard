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
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";

export default function EditService({ params }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        duration: "",
        description: "",
    })
    
    const { data: service, isLoadingService, isErrorService } = useQuery({
        queryKey: ["service"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/${params.id}`).then((res) => {
            setFormData(res?.data?.data);
            return res?.data?.data
        }),
    });
    //console.log(service);
    
    if(isErrorService) return <div>Error while fetching Service</div>;
    if(isLoadingService) return <div>Loading...</div>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEditService = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.duration) {
            toast.error("All fields are required");
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
        <h1 className="text-2xl font-semi">Add Service</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                            <Link href="/services">Services</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Edit Service
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button onClick={handleEditService} >Edit Service</Button> 
            </div>
        </header>
        <div className="w-full h-full flex gap-4" >
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Service Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Type name here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duration (in hours)</Label>
                                    <Input name="duration" value={formData.duration} type="number" onChange={handleChange} placeholder="Type duration here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="price">Price as per duration</Label>
                                    <Input name="price" value={formData.price} type="number" onChange={handleChange} placeholder="Type price here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Type service description here..." required />
                                </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
);
}