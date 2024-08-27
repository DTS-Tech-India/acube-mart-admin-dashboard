"use client"

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
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { ImageIcon, Phone, Upload } from "lucide-react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditCoupon({ params }) {
    const router = useRouter();

    const [formData, setFormData] = useState({})
const { data, isLoading, isError } = useQuery({
    queryKey: ["coupon"],
    queryFn: async () => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/${params.id}`)
    .then(res => res.data),
})

if(isError) return <div>Error while fetching coupon</div>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleChangeCouponType = (value) => {
        setFormData({ ...formData, couponType: value })
    }

    const handleStatusChange = (value) => {
        setFormData({ ...formData, status: value });
        //console.log(value);
    }

    const handleUpdateCoupon = (e) => {
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/update/${params.id}`, formData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                router.push("/coupons");
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }

    const handleCancel = () => {
        router.push("/coupons");
    }
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Add Coupons</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                            <Link href="/admins">Coupons</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Add Coupons
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button onClick={handleCancel} variant="outline">Cancel</Button>
                <Button onClick={handleUpdateCoupon} >Update Coupon</Button> 
            </div>
        </header>
        {isLoading ? (
            <Skeleton className="w-full h-full" />
        ):(
            <div className="w-full h-full flex gap-4" >
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Coupon Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="code">Code</Label>
                                    <Input name="code" defaultValue={data?.data.code} onChange={handleChange} placeholder="Type code here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea name="description" defaultValue={data?.data.description} onChange={handleChange} placeholder="Type description here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="couponType">Coupon Type</Label>
                                    <Select defaultValue={data?.data.couponType} onValueChange={(value) => handleChangeCouponType(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Coupon Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="fixed_amount" >Fixed Amount</SelectItem>
                                            <SelectItem value="percent_discount">Percent Discount</SelectItem>
                                            <SelectItem value="free_shipping">Free Shipping</SelectItem>
                                            <SelectItem value="buy_one_get_one">Buy One Get One</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input name="amount" type="number" defaultValue={data?.data.amount} onChange={handleChange} placeholder="Type amount here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="expiry">Expiary Date</Label>
                                    <DatePicker formData={formData} setFormData={setFormData} />
                                </div>
                            </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full max-w-sm ">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Status & Usage
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue={data?.data.status} onValueChange={(value) => handleStatusChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active" >Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="usageLimit">Usage Limit</Label>
                                <Input name="usageLimit" type="number" defaultValue={data?.data.usageLimit} onChange={handleChange} placeholder="Type limit here..." required />
                            </div>
                                
                        </CardContent>
                    </Card>
                </div>
            </div>
        )}
    </div>
);
}