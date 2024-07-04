"use client"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import getApiData from "../get-api-data";
export default function AddProduct() {
    
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        description: "",
        stock: "",
        price: "",
        image: "",
        status: "",
        type: "",
        category: "",
        element: "",
        brand: "",
        model: "",
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    if (isLoading) return "Loading...";
    if (isError) return "An error has occurred.";
    console.log(data);
    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
        console.log(productData);
    }
    
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Add Products</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/dashboard/products">Products</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Add Product
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={() => {}}>Add Product</Button> 
                </div>
            </div>
            <div className="w-full h-full flex gap-4">
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            General Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input name="name" onChange={handleChange} placeholder="Type product name here..." />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea name="description" onChange={handleChange} placeholder="Type product description here..." />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Media
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="images">Gallery</Label>
                                <Input name="images" type="file" multiple placeholder="Type product name here..." />
                            </div>
                            <div className="flex gap-4">
                                <button className="flex aspect-square w-full max-w-64 items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                    </span>
                                </button>
                                <button className="flex aspect-square w-full max-w-64 items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                    </span>
                                </button>
                                <button className="flex aspect-square w-full max-w-64 items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                    </span>
                                </button>
                            </div>
                            
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Pricing
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="price">Base Price</Label>
                                <Input name="price" onChange={handleChange} placeholder="Type product base price here..." />
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="description">Discount Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Discount Percentage (%)</Label>
                                    <Input id="name" placeholder="Type product base price..." />
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="description">Tax Class</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">VAT Amount (%)</Label>
                                    <Input id="name" placeholder="Type VAT amount..." />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Inventory
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <div className="w-full">
                                <Label htmlFor="name">SKU</Label>
                                <Input id="name" placeholder="Type product SKU here..." />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="description">Barcode</Label>
                                <Input id="name" placeholder="Type product Barcode here..." />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="description">Quantity</Label>
                                <Input id="name" placeholder="Type product Quantity here..." />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Shiping
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <Checkbox />
                                <Label htmlFor="name">This is a physical product</Label>
                            </div>
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Weight</Label>
                                    <Input id="name" placeholder="weight(kg)" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Height</Label>
                                    <Input id="name" placeholder="height(cm)" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Length</Label>
                                    <Input id="name" placeholder="length(cm)" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Width</Label>
                                    <Input id="name" placeholder="width(cm)" />
                                </div> 
                            </div>
                            
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Attributes
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                        <div className="flex  gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Attribute name</Label>
                                    <Input id="name" placeholder="Attribute name" />
                                </div>
                                <Button className="w-full mt-auto">+ Add attribute</Button>
                            </div>
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Attribute name</Label>
                                    <Input id="name" placeholder="Attribute name" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Attribute value</Label>
                                    <Input id="name" placeholder="Attribute value" />
                                </div>
                                <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100" ><X className="w-8 h-8 p-2" /></Button>
                            </div>
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Attribute name</Label>
                                    <Input id="name" placeholder="Attribute name" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Attribute value</Label>
                                    <Input id="name" placeholder="Attribute value" />
                                </div>
                                <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100" ><X className="w-8 h-8 p-2" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Varients
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                        <div className="flex  gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Varient name</Label>
                                    <Input id="name" placeholder="Varient name" />
                                </div>
                                <Button className="w-full mt-auto">+ Add Varient</Button>
                            </div>
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Varient name</Label>
                                    <Input id="name" placeholder="Varient name" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Varient value</Label>
                                    <Input id="name" placeholder="Varient value" />
                                </div>
                                <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100" ><X className="w-8 h-8 p-2" /></Button>
                            </div>
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Varient name</Label>
                                    <Input id="name" placeholder="Varient name" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Varient value</Label>
                                    <Input id="name" placeholder="Varient value" />
                                </div>
                                <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100" ><X className="w-8 h-8 p-2" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full max-w-xs flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className=" flex flex-row items-center justify-between">
                            <span className="font-semibold">Status</span>
                            <span className="p-1 px-3 rounded-full bg-slate-200 text-xs">Draft</span>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Product Status</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Category
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Type</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Car</SelectItem>
                                        <SelectItem value="published">Bike</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Interior</SelectItem>
                                        <SelectItem value="published">Exterior</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Element</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an element" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Handle Bars</SelectItem>
                                        <SelectItem value="published">Seat cover</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Brand
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="price">Brand</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Handle Bars</SelectItem>
                                        <SelectItem value="published">Seat cover</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="price">Model</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Handle Bars</SelectItem>
                                        <SelectItem value="published">Seat cover</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                    <h2>Product Completion</h2>
                    <p className="px-4 p-1 bg-green-50 text-green-500 rounded-full">0%</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={() => {}}>Add Product</Button> 
                </div>
            </div>
        </div>
    );
}