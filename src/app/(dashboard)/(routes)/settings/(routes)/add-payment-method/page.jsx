"use client"

import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { Plus, X } from "lucide-react"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'




export default function AddPaymentMethod() {
    const router = useRouter()
    const [data, setData] = useState({
        name: "",
        status: "enabled",
        merchantId: "",
        saltKey: "",
        environment: "",
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeStatus = (e) => {
        setData({
            ...data,
            status: e.target.checked ? "enabled" : "disabled"
        })
    }
    console.log(data)
  return (
    <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Add Payment Method</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/settings">Settings</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Add Payment Method
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => {router.push("/settings")}}><X className="w-8 h-8 p-2" /> Cancel</Button>
                    <Button ><Plus className="w-8 h-8 p-2" /> Add</Button>
                </div>
            </div>
            <div className='w-full h-full flex flex-col gap-4'>
                <Card className="w-full h-full">
                    <CardHeader className="font-semibold">
                        Payment Method Details
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                            <Label htmlFor="status" className="w-full max-w-xs">Enable/Disable</Label>
                            <div className='w-full flex items-center gap-2 text-muted-foreground'>
                               <Checkbox name="status" checked={data.status} onCheckedChange={handleChangeStatus} /> 
                               <p>Enable Payments</p>
                            </div>
                            
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                            <Label htmlFor="merchantId" className="w-full max-w-xs">Merchant Id</Label>
                            <Input value={data.merchantId} onChange={handleChange} name="merchantId" placeholder="Enter Merchant Id" className="w-full"/>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                            <Label htmlFor="saltKey" className="w-full max-w-xs">Salt Key</Label>
                            <Input value={data.saltKey} onChange={handleChange} name="saltKey" placeholder="Enter Salt Key" className="w-full"/>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                            <Label htmlFor="environment" className="w-full max-w-xs">Environment</Label>
                            <Input value={data.environment} onChange={handleChange} name="environment" placeholder="Select Environment" className="w-full"/>
                        </div>
                    </CardContent>
                </Card>   
            </div>
        </div>
  )
}
