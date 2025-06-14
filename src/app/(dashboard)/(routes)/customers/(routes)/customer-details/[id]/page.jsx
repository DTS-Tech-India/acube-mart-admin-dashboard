"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowLeftCircle, CircleCheck, LockKeyhole, Mail, MapPin, Phone, ShoppingCart, Upload, Wallet2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./transaction-columns"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"


export default function CustomerDetails({ params }) {
    const router = useRouter();
    const { data: customer, isLoading: isLoadingCustomer, isError: isErrorCustomer } = useQuery({
        queryKey: ["customer"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${params.id}`)
        .then((res) => res.data),
    })

    const { data: orders, isLoading: isLoadingOrders, isError: isErrorOrders } = useQuery({
        queryKey: ["orders"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/user/${params.id}`)
        .then((res) => res.data),
    })

    const modifiedData = useMemo(() => {
        const sortedData = orders?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedData?.map((order) => {
          return {
            id: order._id,
            orderId: order._id,
            total: order.total,
            date: order.createdAt,
            status: order.status,
            image: order?.products[0]?.productId?.featuredImage?.url,
            product: order?.products?.map((product) => product?.productId?.name),
            orderNumber: order?.orderNumber,
          }
        })
      }, [orders])

    if(isErrorCustomer) {
        return <div>Error while fetching customer</div>
    }

    if(isErrorOrders) {
        return <div>Error while fetching orders</div>
    }
    //console.log(orders)
    //console.log(customer)
    const quickCards = [
        {
          title: "Total Spend",
          value: customer?.data?.orders.reduce((total, order) => total + order.total, 0),
          icon: Wallet2,
          percentage: 10,
          color: "text-green-800",
          bg: "bg-green-200",
          valueCurrency: "₹",
        },
        {
          title: "Total Orders",
          value: customer?.data?.orders.length,
          icon: ShoppingCart,
          percentage: 10,
          color: "text-indigo-800",
          bg: "bg-indigo-200",
        },
        {
          title: "Rewards Point",
          value: 1400,
          icon: CircleCheck,
          percentage: 10,
          color: "text-red-800",
          bg: "bg-red-200",
        },
      ]

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Customer Details</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/customers">Customers</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Customer Details
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => {router.push("/customers")}}><ArrowLeft className="w-8 h-8 p-2" /> Back</Button>
                </div>
            </div>
            {isLoadingCustomer || isLoadingOrders ? (
                <Skeleton className="h-96 w-full aspect-auto" />
                ) : (
                  <div className="w-full h-full flex gap-4">
                    <div className="w-full max-w-xs h-full flex flex-col gap-4">
                        <Card className="w-full h-full">
                            <CardHeader className="font-semibold">
                                <div className="flex flex-col w-full h-full">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image 
                                            src={customer?.data?.avatar?.url || 'https://picsum.photos/450'}
                                            alt="customer" 
                                            width={200} 
                                            height={200} 
                                            className="w-40 h-40 object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="w-full h-full flex flex-col items-center p-6 border-b gap-2">
                                        <div className="flex items-center gap-2">
                                        <h1 className="text-md font-semibold">{customer?.data?.name}</h1> 
                                        <span className="bg-indigo-100 text-indigo-600 text-xs p-1 px-3 rounded-full">Premium</span>
                                        </div>
                                        
                                        <p className="text-xs text-muted-foreground">{customer?.data?.email}</p>
                                    </div>
                            </div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 text-sm">
                                    <div className="flex flex-col items-center gap-4 w-full">
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                <LockKeyhole className="w-8 h-8" />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <h2 className="font-semibold">User ID</h2>
                                                <p>{customer?.data?._id}</p>
                                                
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                <Mail className="w-8 h-8" />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <h2 className="font-semibold">Billing Email</h2>
                                                <p>{customer?.data?.email}</p>
                                                
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                <Phone className="w-8 h-8" />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <h2 className="font-semibold">Phone Number</h2>
                                                <p>+91 {customer?.data?.phone}</p>
                                                
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="flex items-center mb-auto w-10 h-10 p-2 bg-muted rounded-full">
                                                <MapPin className="w-8 h-8" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {customer?.data?.address && (
                                                    customer?.data?.address?.map((address) => (
                                                        <div key={address?._id} className="flex flex-col text-sm">
                                                            <h2 className="font-semibold">Delivery Address</h2>
                                                            <p>{address?.street}, {address?.city}, {address?.state}, {address?.country}, {address?.pincode}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                <ShoppingCart className="w-8 h-8" />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <h2 className="font-semibold">Last Transaction</h2>
                                                <p>12 April, 2024</p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                        </Card>
                    </div>
                    <div className="w-full h-full flex flex-col gap-4">
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
                                    <span className={cn("text-xs p-1 rounded-full mb-auto", card.color, card.bg)}>+ {card.percentage}%</span>
                                    </div>
                                </CardContent>
                                </Card>
                            ))}
                        </div>
                        <DataTable
                            columns={columns}
                            data={modifiedData}
                            initialState={{ pageSize: 10 }}
                            />
                    </div>
                </div>  
                )}
            
        </div>
    )
}