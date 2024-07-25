"use client"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"; 
import { toast } from "sonner"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Upload, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

import { useRouter } from "next/navigation";
import { getApiData, types } from "@/lib/get-api-data";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
export default function AddBrand() {
    const router = useRouter();
    const [brandData, setBrandData] = useState({
        name: "",
        description: "",
        typeId: "",
    });

    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    
    if (isError) return "An error has occurred.";
    console.log(data);

    const handleChange = (e) => {
        setBrandData({ ...brandData, [e.target.name]: e.target.value });
        //console.log(productData);
    }

    const handleChangeType = (value) => {
        setBrandData({ ...brandData, typeId: value });
    }

    const handleAddBrand = (e) => {
        e.preventDefault();
        if (!brandData.name || !brandData.typeId) {
            toast.error("All fields are required");
            return;
        }
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/add`, brandData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                router.push("/dashboard/categories");
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }

    const handleCancel = () => {
        router.push("/dashboard/categories");
    }
    
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Add Brand</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/dashboard/categories">Categories</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Add Brand
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => handleCancel()}><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleAddBrand}>Add Brand</Button> 
                </div>
            </div>
            {isLoading ? (
                <Skeleton className="h-96 w-full aspect-auto" />
                ) : (
            <form className="w-full h-full flex gap-4" onSubmit={handleAddBrand}>
                
                <div className="w-full h-full max-w-xs flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Type
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Type</Label>
                                <Select onValueChange={(value) => handleChangeType(value)} required>
                                    <SelectTrigger>
                                    
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.types.map((type) => (
                                            <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
                                        ))}
                                        
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Brand Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input name="name" onChange={handleChange} placeholder="Type product name here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea name="description" onChange={handleChange} placeholder="Type product description here..." />
                                </div>
                        </CardContent>
                    </Card>
                    
                </div>
            </form>
        )}
        </div>
    );
}