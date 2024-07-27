"use client"

import { DropdownMultiSelect } from "@/components/dropdown-multi-select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiData, orders } from "@/lib/get-api-data";
import { useQuery } from "@tanstack/react-query";

export default function Coupons() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    if (isLoading) return (
        <Skeleton
            className="h-96 w-full aspect-auto" 
        />
    );

    if (isError) return (
        <div>Error while fetching orders</div>
    );
    
  return (
    <div className="w-full h-full flex flex-col gap-4">
        <h1>Coupons</h1>
    </div>
  )
}
