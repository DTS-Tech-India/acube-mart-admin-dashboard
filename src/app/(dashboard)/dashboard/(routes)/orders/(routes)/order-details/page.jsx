"use client"

import Link from "next/link"

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
import { BadgeCheckIcon, CalendarCheck, CreditCard, Mail, MapPin, ScrollText, Truck, Upload, User, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MobileIcon } from "@radix-ui/react-icons";
export default function AddProduct() {
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
                    <Select value="processing">
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
                <div className="w-full flex gap-4">
                        <Card className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <h2 className=" font-semibold">Order #3467293492</h2>
                                <span className="text-orange-600 bg-orange-100 px-2 py-1 text-sm rounded-full">Processing</span>
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
                            <CardContent className="flex flex-col gap-2 text-sm">
                                Products
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full max-w-sm flex flex-col gap-4">
                        <Card className="w-full">
                            <CardHeader>
                                <h2 className=" font-semibold">Address</h2>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 p-2 bg-muted rounded-full">
                                            <MapPin className="w-8 h-8" />
                                        </div>
                                        
                                        <p>Total</p>
                                    </div>
                                    <p>$ 200.00</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div> 
            </div>
            
        </div>
    );
}