"use client"
import Link from "next/link"

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

import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SignUp() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleOnchange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        console.log(formData);
        //Authenticate Admin
        
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.success) {
                toast.success(data.message);
                //redirect to dashboard
                router.push('/signin')
            } else {
                toast.error(data.message);
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.message);
        })
    }
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
            Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">First name</Label>
                    <Input 
                        name="name" 
                        placeholder="Max Mustermann" 
                        required 
                        onChange={handleOnchange} 
                    />
                </div>
            
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
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        name="password" 
                        type="password" 
                        required 
                        onChange={handleOnchange} 
                    />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                    Create an account
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
                Sign in
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
