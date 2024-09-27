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
    AlertCircle,
    AlertOctagon,
    BadgeCheckIcon, 
    CalendarCheck, 
    Check, 
    CheckCircle2, 
    Container, 
    CreditCard, 
    Gift, 
    Mail, 
    MapPin, 
    ReceiptIndianRupeeIcon, 
    RefreshCcw, 
    ScrollText, 
    ShoppingCart, 
    Truck, 
    Upload, 
    User, 
    X, 
    XCircle
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
import _ from 'lodash';

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
                                <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/orders">Orders</Link>
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
                    <Button variant="outline" onClick={() => router.push("/orders")}> <X className="h-4 w-4" /> Cancel</Button>
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
                                            <p>{order?.data?.transactionId?.filter((item) => item.status === "SUCCESS")[0]?.paymentMode || "N/A"}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                    <ReceiptIndianRupeeIcon className="w-8 h-8" />
                                                </div>
                                                
                                                <p>Transaction ID</p>
                                            </div>
                                            <p className="text-blue-600 hover:underline" >{order?.data?.transactionId?.filter((item) => item.status === "SUCCESS")[0]?._id || "N/A"}</p>
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
                                            <p>{order?.data?.phone}</p>
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
                                                    <TableCell colSpan={4}>Shipping Rate</TableCell>
                                                    <TableCell colSpan={1}>+</TableCell>
                                                    <TableCell>₹{orderList.reduce((acc, curr) => acc + curr.deliveryCharges, 0)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={4}>COD Charges</TableCell>
                                                    <TableCell colSpan={1}>+</TableCell>
                                                    <TableCell>₹{orderList.reduce((acc, curr) => acc + curr.codCharges, 0)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={2}>Coupon Discount</TableCell>
                                                    <TableCell colSpan={1}>{order?.data?.couponId?.code}</TableCell>
                                                    <TableCell colSpan={1}>{order?.data?.couponId?.couponType}</TableCell>
                                                    <TableCell colSpan={1}>-</TableCell>
                                                    <TableCell>₹{order?.data?.couponId?.amount || 0}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={5}>Grand Total</TableCell>
                                                    <TableCell>₹{order?.data?.total + orderList.reduce((acc, curr) => acc + curr.deliveryCharges, 0) + orderList.reduce((acc, curr) => acc + curr.codCharges, 0) - (order?.data?.couponId?.amount || 0)}</TableCell>
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
                                            {order?.data?.statusUpdateTime?.map((status, index) => {
                                                const date = new Date(status?.time);
                                                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
                                                let icon = null;
                                                let message = "";
                                                switch (status?.status) {
                                                    case 'pending':
                                                        icon = <AlertCircle className="w-8 h-8" />;
                                                        message = "An order has been pending for confirmation";
                                                        break;
                                                    case 'processing':
                                                        icon = <Gift className="w-8 h-8" />;
                                                        message = "An order has been processed";
                                                        break;
                                                    case 'placed':
                                                        icon = <ShoppingCart className="w-8 h-8" />;
                                                        message = "An order has been placed";
                                                        break;
                                                    case 'dispatched':
                                                        icon = <Truck className="w-8 h-8" />;
                                                        message = "An order has been dispatched";
                                                        break;
                                                    case 'shipped':
                                                        icon = <Container className="w-8 h-8" />;
                                                        message = "An order has been shipped";
                                                        break;
                                                    case 'delivered':
                                                        icon = <BadgeCheckIcon className="w-8 h-8" />;
                                                        message = "An order has been delivered";
                                                        break;
                                                    case 'cancelled':
                                                        icon = <XCircle className="w-8 h-8" />;
                                                        message = "An order has been cancelled";
                                                        break;
                                                    default:
                                                        icon = <AlertOctagon className="w-8 h-8" />;
                                                }
                                                return (
                                                    <div key={index} className="flex items-center gap-4 w-full">
                                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                                            {icon}
                                                        </div>
                                                        <div className="flex flex-col text-sm">
                                                            <h2 className="font-semibold">{_.capitalize(status?.status)}</h2>
                                                            <p>{message}</p>
                                                            <span>{formattedDate}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
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