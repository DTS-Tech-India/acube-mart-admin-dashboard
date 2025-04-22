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
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function AddAdmin() {
    const router = useRouter();
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        duration: "",
        description: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
        //console.log(productData.description);
    }

    const handleAddService = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.duration || !formData.description) {
            toast.error("All fields are required");
            return;
        }
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/add`, formData)
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
                            Add Service
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button onClick={handleAddService} >Add Service</Button> 
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
                                    <Input name="name" onChange={handleChange} placeholder="Type name here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duration (in hours)</Label>
                                    <Input name="duration" type="number" onChange={handleChange} placeholder="Type duration here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="price">Price as per duration</Label>
                                    <Input name="price" type="number" onChange={handleChange} placeholder="Type price here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    {/* <Textarea name="description" onChange={handleChange} placeholder="Type service description here..." required /> */}
                                    <ReactQuill theme="snow" value={formData.description} onChange={handleDescriptionChange} placeholder="Type service description here..." />
                                </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
);
}