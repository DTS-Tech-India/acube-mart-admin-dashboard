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

export default function AddCustomer() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        image: null,
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        
    })
//console.log(formData);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleChangeImage = (e) => {
        setFormData({ ...formData, image: e.target.files[0] })
    }

    const handleChangeRole = (value) => {
        setFormData({ ...formData, role: value })
    }

    const handleAddAdmin = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.image) {
            toast.error("All fields are required");
            return;
        }
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`, formData)
            .then((res) => {
                //console.log(res);
                if (res.data.success) {
                    toast.success(res.data.message);

                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address/add`, {
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        pincode: formData.pincode,
                        userId: res.data.data._id
                    })
                    .then((res) => {
                        //console.log(res);
                        if (res.data.success) {
                            toast.success(res.data.message);
                        }
                    })
                    .catch((err) => {
                        //console.log(err);
                        toast.error(err.message);
                    })

                    const imageData = new FormData();
                    imageData.append("image", formData.image, formData.image.name);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/add/user/${res.data.data._id}`, imageData)
                    .then((res) => {
                        //console.log(res);
                        if (res.data.success) {
                            toast.success(res.data.message);
                            router.push("/dashboard/customers");
                        }
                    })
                    .catch((err) => {
                        //console.log(err);
                        toast.error(err.message);
                    })
                    
                }
            })
            .catch((err) => {
                //console.log(err);
                toast.error(err.message);
            });
    }

    const handleCancel = () => {
        router.push("/dashboard/customers");
    }
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Add Admins</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/dashboard">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                            <Link href="/dashboard/admins">Admins</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Add Admins
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button onClick={handleCancel} variant="outline">Cancel</Button>
                <Button onClick={handleAddAdmin} >Add Admin</Button> 
            </div>
        </header>
        <div className="w-full h-full flex gap-4" >
                
                <div className="w-full h-full max-w-xs ">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Media
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="image">Avatar</Label>
                                    <Input name="image" onChange={handleChangeImage} type="file" required />
                                </div>
                                {formData.image ? (
                                    <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200">
                                        <Image
                                            src={URL.createObjectURL(formData.image)}
                                            alt="product image"
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                            ):(
                                <button className="flex aspect-square w-full max-w-xs items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </span>
                            </button>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Customer Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input name="name" onChange={handleChange} placeholder="Type name here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" type="email" onChange={handleChange} placeholder="aE4qB@example.com" required />
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" type="password" onChange={handleChange} placeholder="Type password here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="role">Phone</Label>
                                    <Input name="phone" type="text" onChange={handleChange} placeholder="Type phone here..."  />
                                </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Address
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="street">Street</Label>
                                <Input name="street" type="text" onChange={handleChange} placeholder="Type address here..." />
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input name="city" type="text" onChange={handleChange} placeholder="Type city here..." />
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input name="state" type="text" onChange={handleChange} placeholder="Type state here..." />
                            </div>
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Input name="country" type="text" onChange={handleChange} placeholder="Type country here..." />
                            </div>
                            <div>
                                <Label htmlFor="pincode">Pin Code</Label>
                                <Input name="pincode" type="text" onChange={handleChange} placeholder="Type zip here..." />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
);
}