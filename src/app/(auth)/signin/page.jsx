"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
        //console.log(formData);
        //Authenticate Admin
        
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            axios.post('/api/signin', data)
            .then((res) => {
                //console.log(res);
                toast.success(res.data);
                //redirect to dashboard
                router.push("/dashboard")
            })
            .catch((err) => {
                //console.log(err);
                toast.error(err.message);
            })
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
            <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
                Sign up
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
