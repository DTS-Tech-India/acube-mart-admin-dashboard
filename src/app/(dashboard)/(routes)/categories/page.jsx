"use client"

import { useQuery } from "@tanstack/react-query";

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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Phone, Upload } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import { elementColumns } from "./sub-categories-columns";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { brands, categories, elements, models } from "@/lib/get-api-data";
import { Label } from "@/components/ui/label";
import { categoryColumns } from "./categories-columns";
import { brandColumns } from "./brand-columns";
import { modelColumns } from "./model-columns";
import { isActive } from "@tiptap/core";
export default function CategoriesPage() {
    const router = useRouter();

    const {data, isLoading, isError} = useQuery({
        queryKey: ["elements"],
        queryFn: async() => await elements(),
    })

    const {data: category, isLoading: isLoadingCategory, isError: isErrorCategory} = useQuery({
        queryKey: ["categories"],
        queryFn: async() => await categories(),
    })

    const { data: brand, isLoading: isLoadingBrand, isError: isErrorBrand } = useQuery({
        queryKey: ["brands"],
        queryFn: async() => await brands(),
    })

    const { data: model, isLoading: isLoadingModel, isError: isErrorModel } = useQuery({
        queryKey: ["models"],
        queryFn: async() => await models(),
    })

    const modifiedData = useMemo(() => {
        
        return data?.map((element) => {
          return {
            id: element._id,
            name: element?.name,
            image: element?.mediaId?.url,
            added: element.createdAt,
            type: element?.typeId?.name,
            category: element?.categoryId?.name,
            isActive: element?.isActive
          }
        })
      }, [data]);

      const modifiedCategoryData = useMemo(() => {
        
        return category?.map((category) => {
          return {
            id: category._id,
            name: category?.name,
            image: category?.mediaId?.url,
            added: category.createdAt,
            type: category?.typeId?.name,
            isActive: category?.isActive
          }
        })
      }, [category]);

      const modifiedBrandData = useMemo(() => {
        
        return brand?.map((brand) => {
          return {
            id: brand._id,
            name: brand?.name,
            type: brand?.typeId?.name,
            added: brand.createdAt,
            image: brand?.mediaId?.url,
            isActive: brand?.isActive,
          }
        })
      }, [brand]);

      const modifiedModelData = useMemo(() => {
        
        return model?.map((model) => {
          return {
            id: model._id,
            name: model?.name,
            type: model?.typeId?.name,
            brand: model?.brandId?.name,
            added: model.createdAt,
            image: model?.mediaId?.url,
            isActive: model?.isActive
          }
        })
      }, [model]);
      
      
    if (isError || isErrorCategory || isErrorBrand || isErrorModel) return (
        <div>Error while fetching categories</div>
    );

    //console.log(data, modifiedData);

    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Categories</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Categories
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                {/* <Button onClick={() => {router.push("/categories/add-category")}}>Add Category</Button> */} 
                <DropdownMenu>
                    <DropdownMenuTrigger className=" bg-violet-600 text-white hover:bg-violet-500 p-2 px-6 rounded-md border">Add</DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Select Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {router.push("/categories/add-category")}}>Add Category</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {router.push("/categories/add-sub-category")}}>Add Sub Category</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {router.push("/categories/add-brand")}}>Add Brand</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {router.push("/categories/add-model")}}>Add Model</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        {(isLoading || isLoadingCategory || isLoadingBrand || isLoadingModel ) ? (
             <Skeleton
                className="h-96 w-full aspect-auto" 
            />
        ):(
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price" className="font-semibold text-xl">Categories</Label>
                    {modifiedCategoryData &&
                    <DataTable
                        data={modifiedCategoryData}
                        columns={categoryColumns}
                    />  }
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price" className="font-semibold text-xl">Sub Category</Label>
                    {modifiedData &&
                    <DataTable
                        data={modifiedData}
                        columns={elementColumns}
                    />  }
                </div>
                   
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price" className="font-semibold text-xl">Brands</Label>
                    {modifiedBrandData &&
                    <DataTable
                        data={modifiedBrandData}
                        columns={brandColumns}
                    />  }
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price" className="font-semibold text-xl">Models</Label>
                    {modifiedModelData &&
                    <DataTable
                        data={modifiedModelData}
                        columns={modelColumns}
                    />  }
                </div>
                
            </div>
         
        )}
        
    </div>
);
}