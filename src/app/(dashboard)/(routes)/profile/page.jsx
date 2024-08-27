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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/lib/user-contex";
import { cn } from "@/lib/utils";

export default function AddAdmin() {
    const router = useRouter();
    const { admin } = useUser()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        newPassword: "",
        oldPassword: "",
        role: "",
        image: null,
    })

    useEffect(() => {
        if (admin) {
        setFormData((prev) =>({
            ...prev,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            avatar: admin?.avatar?.url || ""
        }))
    }
    }, [admin])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleChangeImage = (e) => {
        setFormData({ ...formData, image: e.target.files[0] })
    }
    const handleUpdateAdmin = () => {
        if (!formData.name || !formData.email ) {
            toast.error("Name and Email are required");
            return;
        }
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update/${admin._id}`, formData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                if(formData.image) {
                    const imageData = new FormData();
                    imageData.append("image", formData.image, formData.image.name);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/add/admin/${admin._id}`, imageData)
                    .then((res) => {
                        //console.log(res);
                        if (res.data.success) {
                            toast.success(res.data.message);
                            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/${admin._id}`)
                            .then((res) => {
                                //console.log(res.data);
                                if (res.data.success) {
                                    setFormData({ ...formData, 
                                        name: res.data.admin.name, 
                                        email: res.data.admin.email, 
                                        role: res.data.admin.role,
                                        avatar: res.data.admin?.avatar?.url
                                    });
                                    localStorage.setItem("admin", JSON.stringify(res.data.admin));
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
                    })
                }
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }
    const handleChangePassword = () => {
        if (!formData.oldPassword || !formData.newPassword) {
            toast.error("Old Password and New Password are required");
            return;
        }
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update/password/${admin._id}`, formData)
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
    }
//console.log(formData)
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Profile</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Profile
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                
            </div>
        </header>
        <div className="w-full h-full flex gap-4" >
                
                <div className="w-full h-full max-w-xs ">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            <div className="flex flex-col w-full h-full">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image 
                                            src={formData?.avatar || 'https://picsum.photos/450'}
                                            alt="profile image" 
                                            width={200} 
                                            height={200} 
                                            className="w-40 h-40 object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="w-full h-full flex flex-col items-center p-6 border-b gap-2">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-md font-semibold">{admin?.name}</h1> 
                                            <span 
                                                className={cn(" text-xs p-1 px-3 rounded-full", 
                                                admin?.role === "admin" ? "bg-green-100 text-green-600" : "bg-indigo-100 text-indigo-600",
                                                )}
                                                >
                                                    {admin?.role}
                                                </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{admin?.email}</p>
                                    </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="image"> Update Avatar</Label>
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
                            General Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input name="name" defaultValue={admin?.name} onChange={handleChange} placeholder="Type name here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" type="email" defaultValue={admin?.email} onChange={handleChange} placeholder="aE4qB@example.com" required />
                                </div>
                                <Button onClick={handleUpdateAdmin} >Update Profile</Button>
                        </CardContent>
                    </Card>

                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Change Password
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="oldPassword">Old Password</Label>
                                    <Input name="oldPassword" type="password" value={formData.oldPassword} onChange={handleChange} placeholder="Type old password here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="newPassword">Password</Label>
                                    <Input name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} placeholder="Type new password here..." required />
                                </div>
                                <Button onClick={handleChangePassword} >Update Password</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
);
}