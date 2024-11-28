"use client"

import React, { useState } from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { Plus, X } from "lucide-react"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { getApiData, products } from '@/lib/get-api-data'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from '@/components/ui/skeleton'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import Multiselect from "multiselect-react-dropdown";
import { toast } from 'sonner'

export default function BulkEditProducts() {
    const router = useRouter()
    const [data, setData] = useState({
        categoryType: "element",
        category: "",
        products: [],

    })

    const { data: apiData, isLoading: isApiDataLoading, isError: isApiDataError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
        gcTime:  1000 * 60 * 60 * 2, //120 minutes
    })

    const { data: productsData, isLoading: isProductsLoading, isError: isProductsError } = useQuery({
        queryKey: ["products"],
        queryFn: async() => await products(),
    })

    if (isProductsError || isApiDataError) return <div>An error has occurred while fetching products data.</div>;

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectCategory = (value) => {
        setData({
            ...data,
            categoryType: value
        });
    }
    const handleSelectCategoryToAdd = (value) => {
        setData({
            ...data,
            category: value
        });
    }

    const handleSelectAllProducts = () => {
        setData({
            ...data,
            products: productsData.map((product) => product._id)
        })
    }

    const handleDeselectAllProducts = () => {
        setData({
            ...data,
            products: []
        })
    }

    const handleAddProducts = (list, value) => {
        setData({
            ...data,
            products: [...data.products, value._id]
        })
    }

    const handleRemoveProducts = (list, value) => {
        setData({
            ...data,
            products: list.map((item) => item)
        })
    }

    const handleBulkEditProducts = () => {
        //console.log(data)

        if( !data.categoryType || data.category === "" || data.products.length < 1) {
            return toast.error("Please select category and products")
        }
        toast.success("Bulk edit started");
       axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/bulk/edit`, data)
       .then((res) => {
           console.log(res);
           if (res.data.success) {
               toast.success(res.data.message);
               router.push("/products")
           }
       })
       .catch((err) => {
           console.log(err);
           toast.error(err.message);
       }) 
    }
  return (
    <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Bulk Edit Products</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/products">Products</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Bulk Edit Products
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => {router.push("/product")}}><X className="w-8 h-8 p-2" /> Cancel</Button>
                    <Button onClick={handleBulkEditProducts} ><Plus className="w-8 h-8 p-2" /> Add</Button>
                </div>
            </div>
            {(isProductsLoading || isApiDataLoading) ? (
                <Skeleton className="h-96 w-full aspect-auto" />
                ) : (
                <div className='w-full h-full flex flex-col gap-4'>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Bulk Edit Products Information 
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                                <Label htmlFor="merchantId" className="w-full max-w-xs">Select Category Type</Label>
                                <Select value={data.categoryType} onValueChange={(value) => handleSelectCategory(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="category">Category</SelectItem>
                                        <SelectItem value="element">Sub Category</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                                <Label htmlFor="merchantId" className="w-full max-w-xs">Select Category to add</Label>
                                <Select value={data.category} onValueChange={(value) => handleSelectCategoryToAdd(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category to add" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.categoryType === "category" ? (apiData?.categories.map((category) => {
                                            return (
                                                <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                                            )
                                        })) : (apiData?.elements.map((element) => {
                                            return (
                                                <SelectItem key={element._id} value={element._id}>{element.name}</SelectItem>
                                            )
                                        }))}
                                        {/* <SelectItem value="category">Category</SelectItem>
                                        <SelectItem value="element">Sub Category</SelectItem> */}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col items-center justify-between gap-2 w-full">
                                <Label htmlFor="status" className="w-full">Select Products to add category</Label>
                                {productsData?.length > 0 &&
                                <Multiselect 
                                    options={productsData}
                                    selectedValues={data?.products}
                                    displayValue="name"
                                    onSelect={handleAddProducts}
                                    onRemove={handleRemoveProducts}
                                    placeholder="Select Products to add category"
                                    showCheckbox
                                    showArrow
                                    avoidHighlightFirstOption
    
                                /> }
                                <div className="flex items-center justify-between gap-4">
                                    <Button variant="ghost" onClick={handleSelectAllProducts}>Select All</Button>
                                    <Button variant="ghost" onClick={handleDeselectAllProducts}>Deselect All</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>   
                </div>
            )}
        </div>
  )
}
