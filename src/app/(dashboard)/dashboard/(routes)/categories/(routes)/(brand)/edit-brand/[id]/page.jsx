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
export default function EditBrand({ params }) {
    const router = useRouter();
    const [brandData, setBrandData] = useState({});

    
    const { data: apiData, isLoading: isApiLoading, isError: isApiError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    const { data: brand, isLoading: isBrandLoading, isError: isBrandError } = useQuery({
        queryKey: ["cateegory"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/${params.id}`),
    });
    
    if (isBrandError || isApiError) return "An error has occurred.";
    //console.log(brand);

    const handleChange = (e) => {
        setBrandData({ ...brandData, [e.target.name]: e.target.value });
        //console.log(productData);
    }

    const handleChangeType = (value) => {
        setBrandData({ ...brandData, typeId: value });
    }

    const handleChangeImage = (e) => {
        setBrandData({ ...brandData, image: e.target.files[0] });
    }

    const handleEditBrand = (e) => {
        e.preventDefault();
        if (!brandData.name || !brandData.typeId) {
            toast.error("Name and type are required");
            return;
        }
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/update/${params.id}`, brandData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                
                if (brandData.image) {
                    const formData = new FormData();
                    formData.append("image", brandData.image, brandData.image.name);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/add/brand/${params.id}`, formData)
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
                else {
                    router.push("/dashboard/categories");
                }
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
            <h1 className="text-2xl font-semi">Edit brand</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/dashboard/categories">Brand</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Edit Brand
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => handleCancel()}><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleEditBrand}>Save Brand</Button> 
                </div>
            </div>
            {isBrandLoading || isApiLoading ? (
                <Skeleton className="h-96 w-full aspect-auto" />
                ) : (
            <form className="w-full h-full flex gap-4" onSubmit={handleEditBrand}>
                
                <div className="w-full h-full max-w-xs flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Brand Type
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Type</Label>
                                <Select defaultValue={brand.data.data.typeId._id} onValueChange={(value) => handleChangeType(value)} required>
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
                                {brand.data.data.mediaId || brandData.image ? (
                                    <>
                                        {brandData.image ? (
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200">
                                                <Image
                                                    src={URL.createObjectURL(brandData.image)}
                                                    alt="product image"
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                        ):(
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200">
                                                <Image
                                                    src={brand.data.data.mediaId.url}
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
                            Brand Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input name="name" defaultValue={brand.data.data?.name} onChange={handleChange} placeholder="Type product name here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea name="description" defaultValue={brand.data.data?.description} onChange={handleChange} placeholder="Type product description here..." />
                                </div>
                        </CardContent>
                    </Card>
                    
                </div>
            </form>
        )}
        </div>
    );
}