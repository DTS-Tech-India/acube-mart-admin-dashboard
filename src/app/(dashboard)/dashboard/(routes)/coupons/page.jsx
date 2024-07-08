"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { orders } from "@/lib/get-api-data";
import { useQuery } from "@tanstack/react-query";

export default function Coupons() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async() => await orders(),
    });

    if (isLoading) return (
        <Skeleton
            className="h-96 w-full aspect-auto" 
        />
    );

    if (isError) return (
        <div>Error while fetching orders</div>
    );

    console.log(data);
    
  return (
    <div>Coupons</div>
  )
}
