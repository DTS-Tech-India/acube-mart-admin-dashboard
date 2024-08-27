"use client"

import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  ShoppingCart,
  Box,
  ReceiptIndianRupee,
  ScanLineIcon,
  Wallet,
  User
} from "lucide-react"
import { cn } from "@/lib/utils";
import { RadialChartComponent } from "@/components/radial-chart";
import { AreaChartComponent } from "@/components/area-chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "@/components/ui/data-table";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./(routes)/orders/orders-columns";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter()

  const {data: products, isLoadingProducts, isErrorProducts} = useQuery({
    queryKey: ["productsCount"],
    queryFn: async() => await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/count`)
    .then((res) => res.data),
  });

  const {data: orders, isLoadingOrders, isErrorOrders} = useQuery({
    queryKey: ["ordersCount"],
    queryFn: async() => await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/count`)
    .then((res) => res.data),
  });
  const {data: customers, isLoadingCustomers, isErrorCustomers} = useQuery({
    queryKey: ["customersCount"],
    queryFn: async() => await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/count`)
    .then((res) => res.data),
  });
  
  const {data: ordersList, isLoadingOrdersList, isErrorOrdersList} = useQuery({
    queryKey: ["ordersList"],
    queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/all`)
    .then((res) => res.data),
  })
  //console.log(ordersList)
  
  const modifiedData = useMemo(() => {
        
    return ordersList?.data.map((order) => {
      return {
        id: order._id,
        orderId: order._id,
        total: order.total,
        date: order.createdAt,
        status: order.status,
        image: order.products[0].productId.featuredImage.url,
        product: order.products.map((product) => product.productId.name),
        payment: order?.transactionId?.paymentMode || "N/A",
        customer: order?.userId?.name,
      }
    })
  }, [ordersList])

  if(isErrorProducts || isErrorOrders || isErrorCustomers) {
    return <div>Error while fetching data</div>
  }

  if(isLoadingProducts || isLoadingOrders || isLoadingCustomers) {
    return <div>Loading...</div>
  }
  const quickCards = [
    {
      title: "Total Revenue",
      value: modifiedData?.reduce((acc, curr) => acc + curr.total, 0) || 0,
      icon: ReceiptIndianRupee,
      percentage: 36,
      color: "text-green-800",
      bg: "bg-green-200",
      valueCurrency: "₹",
    },
    {
      title: "Total Sales",
      value: orders?.data || 0,
      icon: ShoppingCart,
      percentage: 10,
      color: "text-indigo-800",
      bg: "bg-indigo-200",
    },
    {
      title: "Total Products",
      value: products?.data || 0,
      icon: Box,
      percentage: 5,
      color: "text-red-800",
      bg: "bg-red-200",
    },
    {
      title: "Total Customers",
      value: customers?.data || 0,
      icon: User,
      percentage: 8,
      color: "text-orange-800",
      bg: "bg-orange-200",
      /* valueCurrency: "₹", */
    },
  ]


  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center gap-4">
      {/* Header Menu */}
      <header className="flex flex-wrap items-center justify-between  w-full">
        <Tabs defaultValue="all time" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all time">All Time</TabsTrigger>
            <TabsTrigger value="12 months">12 Months</TabsTrigger>
            <TabsTrigger value="30 days">30 Days</TabsTrigger>
            <TabsTrigger value="7 days">7 Days</TabsTrigger>
            <TabsTrigger value="24 hours">24 Hours</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap items-center gap-2">
          <DatePickerWithRange />
          <Button onClick={() => router.push("/products/add-product")} className="bg-violet-500">+ Add Products</Button>
        </div>
      </header>
      {/* Quick Details Cards */}
      <div className="w-full flex flex-wrap justify-between gap-4">
      {quickCards.map((card) => (
        <Card key={card.title} className="aspect-[16/9] w-full max-w-64">
          <CardHeader>
            <card.icon className={cn("w-10 h-10 p-2 rounded-full", card.bg, card.color)} />
          </CardHeader>
          <CardContent className="flex flex-col">
            <h2 className="text-sm text-muted-foreground">{card.title}</h2>
            <div className="flex gap-1">
              <p className="text-2xl font-bold">{card?.valueCurrency}{card.value}</p>
              {/* <span className={cn("text-xs p-1 rounded-full mb-auto", card.color, card.bg)}>+ {card.percentage}%</span> */}
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <RadialChartComponent />
        <AreaChartComponent />
      </div>
      <div className="w-full h-full">
      {isLoadingOrdersList ? (
        <Skeleton className="h-96 w-full aspect-auto" />
          ): (
            <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Recent Orders</h1>
            {modifiedData &&
            <DataTable
                data={modifiedData}
                columns={columns}
            /> }
            </div>
        )}
      </div>
    </main>
  );
}
