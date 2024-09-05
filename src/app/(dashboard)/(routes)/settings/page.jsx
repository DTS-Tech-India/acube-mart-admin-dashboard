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
    //console.log(paymentMethod)
    
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
                                    <Input name="store-name" placeholder="Acube Mart" defaultValue="Acube Mart"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader  className="font-semibold">
                            <div className=" flex items-center justify-between">
                                <span>Payment Method</span>
                            <Button onClick={() => {router.push("/settings/add-payment-method")}}>Add Payment Method</Button>
                            </div>
                            
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-2 border rounded-md">
                                    <Link href={"/settings/payment-method/cash-on-delivery"} className="hover:text-blue-600 hover:bg-muted w-full p-4" > Cash On Delivery</Link>
                                    <div className="w-full flex items-center justify-center max-w-20 p-4">
                                        <Switch
                                            name="cashOnDelivery"
                                            checked={paymentMethod.cashOnDelivery}
                                            onCheckedChange={handleCODToggle}
                                        />
                                    </div>
                                    
                                </div>
                                <div className="flex items-center justify-between gap-2 border rounded-md">
                                    <Link href={"/settings/payment-method/razorpay"} className="hover:text-blue-600 hover:bg-muted w-full p-4" >Razorpay</Link>
                                    <div className="w-full flex items-center justify-center max-w-20 p-4">
                                        <Switch
                                            name="razorpay"
                                            checked={paymentMethod.rozerPay}
                                            onCheckedChange={handleRazorpayToggle}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 border rounded-md">
                                    <Link href={"/settings/payment-method/phone-pay"} className="hover:text-blue-600 hover:bg-muted w-full p-4" >Phone Pay</Link>
                                    <div className="w-full flex items-center justify-center max-w-20 p-4">
                                        <Switch
                                            name="phonePay"
                                            checked={paymentMethod.phonePay}
                                            onCheckedChange={handlePhonePayToggle}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}