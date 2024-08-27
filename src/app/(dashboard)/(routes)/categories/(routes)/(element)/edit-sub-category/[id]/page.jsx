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
import { ImageIcon, Upload, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

import { useRouter } from "next/navigation";
import { getApiData } from "@/lib/get-api-data";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
export default function EditSubCategory({ params }) {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState({});

    
    const { data: apiData, isLoading: isApiLoading, isError: isApiError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    const { data: element, isLoading: isElementLoading, isError: isElementError } = useQuery({
        queryKey: ["element"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/element/${params.id}`),
    });
    
    if (isElementError || isApiError) return "An error has occurred.";
    //console.log(element);

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

    const handleChangeImage = (e) => {
        setCategoryData({ ...categoryData, image: e.target.files[0] });
    }

    const handleEditCategory = (e) => {
        e.preventDefault();
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/element/update/${params.id}`, categoryData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                
                if (categoryData.image) {
                    const formData = new FormData();
                    formData.append("image", categoryData.image, categoryData.image.name);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/add/element/${params.id}`, formData)
                    .then((res) => {
                        //console.log(res);
                        if (res.data.success) {
                            toast.success(res.data.message);
                            router.push("/categories");
                        }
                    })
                    .catch((err) => {
                        //console.log(err);
                        toast.error(err.message);
                    })
                }
                else {
                    router.push("/categories");
                }
                
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }

    const handleCancel = () => {
        router.push("/categories");
    }
    
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Edit Sub Category</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/categories">Categories</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Edit Sub Category
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => handleCancel()}><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleEditCategory}>Save Sub Category</Button> 
                </div>
            </div>
            {isElementLoading || isApiLoading ? (
                <Skeleton className="h-96 w-full aspect-auto" />
                ) : (
            <form className="w-full h-full flex gap-4" onSubmit={handleEditCategory}>
                
                <div className="w-full h-full max-w-xs flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Category
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Type</Label>
                                <Select value={element.data.data.typeId._id} onValueChange={(value) => handleChangeType(value)} required>
                                    <SelectTrigger>
                                    
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {apiData.types.map((type) => (
                                            <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
                                        ))}
                                        
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Category</Label>
                                <Select value={element.data.data.categoryId._id} onValueChange={(value) => handleChangeCategory(value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {apiData.categories.map((category) => (
                                            <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                                        ))}
                
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Media
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="image">Image</Label>
                                    <Input name="image" onChange={handleChangeImage} type="file" required />
                                </div>
                                {element.data.data.mediaId || categoryData.image ? (
                                    <>
                                        {categoryData.image ? (
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200">
                                                <Image
                                                    src={URL.createObjectURL(categoryData.image)}
                                                    alt="product image"
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                        ):(
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200">
                                                <Image
                                                    src={element.data.data.mediaId.url}
                                                    alt="product image"
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </>
                            ):(
                                <button className="flex aspect-square w-full max-w-xs items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </span>
                            </button>
                            )}
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
                                    <Input name="name" defaultValue={element.data.data?.name} onChange={handleChange} placeholder="Type product name here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea name="description" defaultValue={element.data.data?.description} onChange={handleChange} placeholder="Type product description here..." />
                                </div>
                        </CardContent>
                    </Card>
                    
                </div>
            </form>
        )}
        </div>
    );
}