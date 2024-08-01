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
import { CircleCheck, LockKeyhole, Mail, MapPin, Phone, ShoppingCart, Upload, Wallet2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./transaction-columns"


export default function CustomerDetails({ params }) {
    const router = useRouter();
    const quickCards = [
        {
          title: "Total Spend",
          value: 723,
          icon: Wallet2,
          percentage: 10,
          color: "text-green-800",
          bg: "bg-green-200",
          valueCurrency: "$",
        },
        {
          title: "Total Orders",
          value: 1296,
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
      const transactions = [
          {
              id: 1,
              orderId: "123456",
              image: "https://picsum.photos/204",
              product: "Product 1",
              total: 800,
              status: "pending",
              date: "2022-01-01",
          },
          {
              id: 2,
              orderId: "853456",
              image: "https://picsum.photos/205",
              product: "Product 2",
              total: 100,
              status: "delivered",
              date: "2022-01-02",
          },
          {
              id: 3,
              orderId: "341956",
              image: "https://picsum.photos/206",
              product: "Product 3",
              total: 400,
              status: "cancelled",
              date: "2022-01-03",
          },
      ]
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Customer Details</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/dashboard/customers">Customers</Link>
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
                    <Button variant="outline" onClick={() => {router.push("/dashboard/customers")}}><X className="w-8 h-8 p-2" /> Cancel</Button>
                    <Button /* onClick={() => {router.push("/dashboard/customers/edit")}} */>Update Customer</Button> 
                </div>
            </div>
            <div className="w-full h-full flex gap-4">
                <div className="w-full max-w-xs h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            <div className="flex flex-col w-full h-full">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image 
                                        src="https://picsum.photos/400" 
                                        alt="customer" 
                                        width={200} 
                                        height={200} 
                                        className="w-40 h-40 object-cover rounded-full"
                                    />
                                </div>
                                <div className="w-full h-full flex flex-col items-center p-6 border-b gap-2">
                                    <div className="flex items-center gap-2">
                                       <h1 className="text-md font-semibold">John Doe</h1> 
                                       <span className="bg-indigo-100 text-indigo-600 text-xs p-1 px-3 rounded-full">Premium</span>
                                    </div>
                                    
                                    <p className="text-xs text-muted-foreground">johndoe123@gmail.com</p>
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
                                            <p>ID-0112245</p>
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Mail className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Billing Email</h2>
                                            <p>An order has been processed</p>
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Phone className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Phone Number</h2>
                                            <p>+91 9876543210</p>
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center mb-auto w-10 h-10 p-2 bg-muted rounded-full">
                                            <MapPin className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col text-sm">
                                                <h2 className="font-semibold">Delivery Address</h2>
                                                <p>Shastri Nagar, Delhi, India, 123456</p>
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <h2 className="font-semibold">Delivery Address</h2>
                                                <p>Shastri Nagar, Delhi, India, 123456</p>
                                            </div>
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
                        data={transactions}
                        initialState={{ pageSize: 10 }}
                        />
                </div>
            </div>
        </div>
    )
}