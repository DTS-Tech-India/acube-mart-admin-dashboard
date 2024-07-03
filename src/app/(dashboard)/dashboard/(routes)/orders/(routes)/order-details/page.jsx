"use client"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
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
  
import { 
    BadgeCheckIcon, 
    CalendarCheck, 
    Check, 
    CreditCard, 
    Gift, 
    Mail, 
    MapPin, 
    RefreshCcw, 
    ScrollText, 
    ShoppingCart, 
    Truck, 
    Upload, 
    User, 
    X 
} from "lucide-react";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MobileIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function AddProduct() {
    const [status, setStatus] = useState("");

    const orderList = [
        {
            id: 1,
            name: "Product 1",
            imageUrl: "https://picsum.photos/200",
            sku: "123456",
            price: 800,
            quantity: 1,
            total: 800,
        },
        {
            id: 2,
            name: "Product 2",
            imageUrl: "https://picsum.photos/201",
            sku: "853456",
            price: 100,
            quantity: 3,
            total: 300,
        },
        {
            id: 3,
            name: "Product 3",
            imageUrl: "https://picsum.photos/202",
            sku: "341956",
            price: 400,
            quantity: 2,
            total: 800,
        },
    ]
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Order Details</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/dashboard/orders">Orders</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Order Details
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Select onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="placed">Placed</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                    <Button onClick={() => {}}><ScrollText className="w-8 h-8 p-2" /> Invoice</Button> 
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full flex gap-4 ">
                        <Card className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <h2 className=" font-semibold">Order #3467293492</h2>
                                <span 
                                    className={cn(
                                        " px-4 py-1 text-sm rounded-full",
                                        status === "processing" && "bg-orange-100 text-orange-600",
                                        status === "pending" && "bg-yellow-100 text-yellow-600",
                                        status === "placed" && "bg-sky-100 text-sky-600",
                                        status === "shipped" && "bg-purple-100 text-purple-600",
                                        status === "delivered" && "bg-green-100 text-green-600",
                                        status === "cancelled" && "bg-red-100 text-red-600",
                                    )}
                                >
                                    {status}
                                </span>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <CalendarCheck className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Added</p>
                                    </div>
                                    <p>12 Dec 2024</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <CreditCard className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Payment Method</p>
                                    </div>
                                    <p>Visa</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Truck className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Shiping Method</p>
                                    </div>
                                    <p>Flat Shiping</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <h2 className=" font-semibold">Customer</h2>
                                
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <User className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Customer</p>
                                    </div>
                                    <p>John Doe</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Mail className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Email</p>
                                    </div>
                                    <p>jonedoe123@gmail.com</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <MobileIcon className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Phone</p>
                                    </div>
                                    <p>8946302546</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <h2 className=" font-semibold">Document</h2>
                                
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <ScrollText className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Invoice</p>
                                    </div>
                                    <p>INV-32547</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Truck className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Shipping</p>
                                    </div>
                                    <p>SHP-2011REG</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <BadgeCheckIcon className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Rewards</p>
                                    </div>
                                    <p>480 points</p>
                                </div>
                            </CardContent>
                        </Card>
                </div>   
                <div className="flex gap-4">
                    <div className="w-full flex flex-col gap-4">
                        <Card className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <h2 className=" font-semibold">Order List</h2>
                                
                            </CardHeader>
                            <CardContent className="">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>QTY</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orderList.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    <Image
                                                        src={order?.imageUrl}
                                                        alt={order.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-md"
                                                    />
                                                </TableCell>
                                                <TableCell>{order.name}</TableCell>
                                                <TableCell>{order.sku}</TableCell>
                                                <TableCell>{order.quantity}</TableCell>
                                                <TableCell>${order.price}</TableCell>
                                                <TableCell>${order.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={5}>Sub Total</TableCell>
                                            <TableCell>$2,495.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={5}>VAT (0%)</TableCell>
                                            <TableCell>$0</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={5}>Shipping Rate</TableCell>
                                            <TableCell>$5.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={5}>Grand Total</TableCell>
                                            <TableCell>$2,500.00</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full max-w-sm flex flex-col gap-4">
                        <Card className="w-full">
                            <CardHeader>
                                <h2 className=" font-semibold">Address</h2>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 text-sm ">
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <MapPin className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Billing</h2>
                                            <p>1544 Baker Street, San Francisco, USA</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <MapPin className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Shipping</h2>
                                            <p>1544 Baker Street, San Francisco, USA</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <h2 className=" font-semibold">Order Status</h2>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 text-sm">
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <ShoppingCart className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Order Placed</h2>
                                            <p>An order has been placed</p>
                                            <span>12/05/2022, 10:00 AM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <RefreshCcw className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Processing</h2>
                                            <p>An order has been processed</p>
                                            <span>12/05/2022, 06:00 PM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Gift className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Packed</h2>
                                            <p>An order has been packed</p>
                                            <span>13/05/2022, 11:00 AM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Truck className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Shipping</h2>
                                            <p>An order has been shipped</p>
                                            <span>14/05/2022, 09:00 PM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <h2 className="font-semibold">Delivered</h2>
                                            <p>An order has been delivered</p>
                                            <span>15/05/2022, 06:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div> 
            </div>
            
        </div>
    );
}