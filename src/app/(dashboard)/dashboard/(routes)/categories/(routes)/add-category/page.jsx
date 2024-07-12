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
export default function AddCategory() {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState({
        name: "",
        description: "",
        typeId: "",
        categoryId: "",
        stock: 0,
    });

    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    if (isLoading) return "Loading...";
    if (isError) return "An error has occurred.";
    //console.log(data);

    const handleChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
        //console.log(productData);
    }

    const handleChangeType = (value) => {
        setCategoryData({ ...categoryData, typeId: value });
    }

    const handleChangeCategory = (value) => {
        setCategoryData({ ...categoryData, categoryId: value });
    }

    const handleAddCategory = () => {
        console.log(categoryData);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/element/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(categoryData),
        })
        .then((res) => res.json())
        .then((data) => {
            
            console.log(data);
            if (data.success) {
                toast.success(data.message);
                router.push("/dashboard/categories");
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.message);
        })
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
                                Add Category
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleAddCategory}>Add Category</Button> 
                </div>
            </div>
            <div className="w-full h-full flex gap-4">
                
                <div className="w-full h-full max-w-xs flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Category
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Type</Label>
                                <Select onValueChange={(value) => handleChangeType(value)}>
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
                                <Label htmlFor="status">Category</Label>
                                <Select onValueChange={(value) => handleChangeCategory(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.categories.map((category) => (
                                            <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
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
                            Element Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input name="name" onChange={handleChange} placeholder="Type product name here..." />
                            </div>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input name="stock" onChange={handleChange} type="number" placeholder="Type product stock here..." />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea name="description" onChange={handleChange} placeholder="Type product description here..." />
                            </div>
                        </CardContent>
                    </Card>
                    
                </div>
            </div>
        </div>
    );
}