"use client"

import Link from "next/link"
import Image from "next/image";
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
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Settings() {
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState({
        cashOnDelivery: true,
        phonePay: true,
        razorPay: false,
    })
    
    const handleCODToggle = () => {
        setPaymentMethod({
            ...paymentMethod,
            cashOnDelivery: !paymentMethod.cashOnDelivery
        })
    }
    
    const handleRazorpayToggle = () => {
        setPaymentMethod({
            ...paymentMethod,
            razorPay: !paymentMethod.razorPay
        })
    }

    const handlePhonePayToggle = () => {
        setPaymentMethod({
            ...paymentMethod,
            phonePay: !paymentMethod.phonePay
        })
    }
    console.log(paymentMethod)
    
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Settings</h1>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Settings
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/* <div className="flex items-center gap-2">
                    <Button variant="outline"><Upload className="w-8 h-8 p-2" /> Export</Button>
                    <Button onClick={() => {router.push("/products/add-product")}}>Add Products</Button> 
                </div> */}
            </header>
            <div className="w-full h-full flex gap-4">
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader  className="font-semibold">
                            General Settings
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="store-name">Store Name</Label>
                                    <Input name="store-name" placeholder="Acube Mart" /* value="Acube Mart" *//>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader  className="font-semibold">
                            Payment Method
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between gap-2">
                                    <Label htmlFor="cashOnDelivery"> Cash On Delivery</Label>
                                    <Switch
                                        name="cashOnDelivery"
                                        checked={paymentMethod.cashOnDelivery}
                                        onCheckedChange={handleCODToggle}
                                    />
                                </div>
                                <div className="flex justify-between gap-2">
                                    <Label htmlFor="razorpay">Razorpay</Label>
                                    <Switch
                                        name="razorpay"
                                        checked={paymentMethod.rozerPay}
                                        onCheckedChange={handleRazorpayToggle}
                                    />
                                </div>
                                <div className="flex justify-between gap-2">
                                    <Label htmlFor="phonePay">Phone Pay</Label>
                                    <Switch
                                        name="phonePay"
                                        checked={paymentMethod.phonePay}
                                        onCheckedChange={handlePhonePayToggle}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}