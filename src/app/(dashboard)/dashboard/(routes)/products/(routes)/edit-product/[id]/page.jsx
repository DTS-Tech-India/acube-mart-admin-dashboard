"use client"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"; 
import { toast } from "sonner"
import { TagInput } from 'emblor';
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
import { ImageIcon, Upload, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { getApiData, getApiDataByQuery } from "@/lib/get-api-data";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


export default function Page({ params }) {

  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: async() => await getApiDataByQuery(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${params.id}`),
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  console.log(data);
    return <div>
      My product: {params.id}
    </div>
  }