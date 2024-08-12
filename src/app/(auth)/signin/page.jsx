"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-contex"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axios from "axios"


export default function SignIn() {
    const router = useRouter()
    const { setAdmin } = useUser()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleOnchange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    
    const handleSubmit = () => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`, formData)
        .then((res) => {
            //console.log(res.data);
            if (res.data.success) {
                localStorage.setItem("admin", JSON.stringify(res.data.admin));
                setAdmin(res.data.admin);

                axios.post('/api/signin', res.data)
                .then((res) => {
                    //console.log(res)
                    if(res.status === 200) {
                        toast.success(res.data);
                        router.push('/dashboard')
                    }
                })
                .catch((err) => {
                    //console.log(err)
                    toast.error(err.message)
                })
                toast.success(res.data.message);
                //redirect to dashboard
                //router.push('/dashboard')
            } else {
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
            Enter your email below to sign in to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleOnchange}
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                </Link>
                </div>
                <Input 
                    name="password" 
                    type="password" 
                    required 
                    onChange={handleOnchange}
                />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
                Sign In
            </Button>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
