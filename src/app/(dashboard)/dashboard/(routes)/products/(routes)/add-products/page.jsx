"use client"

import Link from "next/link"

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
import Image from "next/image";
import { useState } from "react";
export default function AddProducts() {
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
                                Add Products
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
                                <Input id="name" placeholder="Type product name here..." />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Type product description here..." />
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
                                <Input id="images" type="file" multiple placeholder="Type product name here..." />
                            </div>
                            <button className="flex aspect-square w-full max-w-xs items-center justify-center rounded-md border border-dashed">
                                <span className="p-4 rounded-full hover:bg-muted">
                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                </span>
                            </button>
                        </CardContent>
                    </Card>
                   
                </div>
                <div className="w-full h-full max-w-xs flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className=" flex flex-row items-center justify-between">
                            <span className="text-semibold">Status</span>
                            <span className="p-1 px-3 rounded-full bg-slate-200 text-base">Draft</span>
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
        </div>
    );
}