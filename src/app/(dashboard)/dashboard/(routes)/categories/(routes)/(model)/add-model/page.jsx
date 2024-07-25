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
import { getApiData } from "@/lib/get-api-data";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
export default function AddModel() {
    const router = useRouter();
    const [modelData, setModelData] = useState({
        name: "",
        description: "",
        typeId: "",
        brandId: "",
    });

    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    
    if (isError) return "An error has occurred.";
    //console.log(data);

    const handleChange = (e) => {
        setModelData({ ...modelData, [e.target.name]: e.target.value });
        //console.log(productData);
    }

    const handleChangeType = (value) => {
        setModelData({ ...modelData, typeId: value });
    }

    const handleChangeBrand = (value) => {
        setModelData({ ...modelData, brandId: value });
    }

    const handleAddModel = (e) => {
        e.preventDefault();
        if (!modelData.name || !modelData.typeId || !modelData.brandId) {
            toast.error("All fields are required");
            return;
        }
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/model/add`, modelData)
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
            <h1 className="text-2xl font-semi">Add Category</h1>
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
                                Add Model
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => handleCancel()}><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleAddModel}>Add Model</Button> 
                </div>
            </div>
            {isLoading ? (
                <Skeleton className="h-96 w-full aspect-auto" />
                ) : (
            <form className="w-full h-full flex gap-4" onSubmit={handleAddModel}>
                
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
                            <div>
                                <Label htmlFor="status">Brand</Label>
                                <Select onValueChange={(value) => handleChangeBrand(value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.brands.map((brand) => (
                                            <SelectItem key={brand._id} value={brand._id}>{brand.name}</SelectItem>
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
                            Model Information
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