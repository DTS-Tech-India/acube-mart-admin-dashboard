"use client"

import Link from "next/link"
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
import { MobileIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetails({ params }) {
    const [status, setStatus] = useState("");
    const router = useRouter();

    const { data: order, isLoading: isLoadingOrder, isError: isErrorOrder } = useQuery({
        queryKey: ["order"],
        queryFn: async () => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/${params.id}`)
        .then(res => res.data),
    })
    //console.log(order)
    useEffect(() => {
        setStatus(order?.data.status)
    }, [setStatus, order])
   
    const orderList = useMemo(() => {
        return order?.data.products.map((product) => {
            return {
                id: product.productId._id,
                name: product.productId.name,
                imageUrl: product.productId.featuredImage.url,
                sku: product.productId.sku,
                price: product.productId.price,
                sp: product.productId.sp,
                quantity: product.quantity,
                total: product.productId.price * product.quantity,
                deliveryCharges: product.productId.deliveryCharges,
                codCharges: product.productId.codCharges,
            }
        })
    } , [order])

    if (isErrorOrder) return <div>Error occurred while fetching order</div>
    
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
                    {/* <Select value={status} onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="placed">Placed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="dispatched">Dispatched</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select> */}
                    <Button variant="outline" onClick={() => router.push("/dashboard/orders")}> <X className="h-4 w-4" /> Cancel</Button>
                    <Button > <Upload className="w-4 h-4 mr-1" /> Export</Button>
                </div>
            </div>
            {isLoadingOrder ? (
                <Skeleton className="h-96 w-full aspect-auto" />
                ) : (
                    <div className="w-full h-full flex flex-col gap-4">
                        <div className="w-full flex gap-4 ">
                                <Card className="w-full">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div className="flex flex-col gap-1">
                                            <h2 className=" font-semibold">Order </h2>
                                            <p className="text-sm">#{params.id}</p>
                                        </div>
                                        <span 
                                            className={cn(
                                                " px-4 py-1 text-sm rounded-full",
                                                status === "processing" && "bg-orange-100 text-orange-600",
                                                status === "pending" && "bg-gray-100 text-gray-600",
                                                status === "placed" && "bg-sky-100 text-sky-600",
                                                status === "dispatched" && "bg-yellow-100 text-yellow-600",
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
                                            <p>{new Date(order?.data?.createdAt).toLocaleDateString()}</p>
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
                                            <p>{order?.data?.userId?.name}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                    <Mail className="w-8 h-8" />
                                                </div>
                                                
                                                <p>Email</p>
                                            </div>
                                            <p>{order?.data?.userId?.email}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                    <MobileIcon className="w-8 h-8" />
                                                </div>
                                                
                                                <p>Phone</p>
                                            </div>
                                            <p>{order?.data?.userId?.phone}</p>
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
                                        <p className="px-4 py-1 text-sm rounded-full text-green-600 bg-green-100">{orderList.length} Products</p>
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
                                                            <div className="w-10 h-10">
                                                                <Image
                                                                    src={order?.imageUrl}
                                                                    alt={order.name}
                                                                    width={200}
                                                                    height={200}
                                                                    className="rounded-md w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{order.name}</TableCell>
                                                        <TableCell>{order.sku}</TableCell>
                                                        <TableCell>{order.quantity}</TableCell>
                                                        <TableCell>₹{order.sp}</TableCell>
                                                        <TableCell>₹{order.quantity * order.sp}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={5}>Sub Total</TableCell>
                                                    <TableCell>₹{order?.data?.total}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={5}>Shipping Rate</TableCell>
                                                    <TableCell>₹{orderList.reduce((acc, curr) => acc + curr.deliveryCharges, 0)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={5}>COD Charges</TableCell>
                                                    <TableCell>₹{orderList.reduce((acc, curr) => acc + curr.codCharges, 0)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={5}>Grand Total</TableCell>
                                                    <TableCell>₹{order?.data?.total + orderList.reduce((acc, curr) => acc + curr.deliveryCharges, 0) + orderList.reduce((acc, curr) => acc + curr.codCharges, 0)}</TableCell>
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
                                                    <p>{order?.data?.address?.street}, {order?.data?.address?.city}, {order?.data?.address?.state}, {order?.data?.address?.country}, {order?.data?.address?.pincode}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 w-full">
                                                <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                    <MapPin className="w-8 h-8" />
                                                </div>
                                                <div className="flex flex-col text-sm">
                                                    <h2 className="font-semibold">Shipping</h2>
                                                    <p>{order?.data?.address?.street}, {order?.data?.address?.city}, {order?.data?.address?.state}, {order?.data?.address?.country}, {order?.data?.address?.pincode}</p>
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
                )}
            
            
        </div>
    );
}