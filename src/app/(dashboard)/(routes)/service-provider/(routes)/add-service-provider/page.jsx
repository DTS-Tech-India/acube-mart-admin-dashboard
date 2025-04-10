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
import { ImageIcon, Phone, Trash2, Trash2Icon, Upload } from "lucide-react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/datepicker";
import { useQuery } from "@tanstack/react-query";

export default function AddAdmin() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        
        serviceId: "",
        vehicleTypeId: "",
        duration: "",
        price: "",
        dayWisePrice: [],
    })
    const [dayWisePrice, setDayWisePrice] = useState({
        day: "",
        price: "",
    });
    const [loading, setLoading] = useState(false);

    const { data: services, isLoading: servicesLoading, isError: servicesError } = useQuery({
        queryKey: ["serviceData"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/all`).then((res) => res?.data?.data),
    });

    const { data: vehicleTypes, isLoading: vehicleTypesLoading, isError: vehicleTypesError } = useQuery({
        queryKey: ["vehicleTypes"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicletype/all`).then((res) => res?.data?.data),
    });

    if(servicesError || vehicleTypesError) return <div>Something went wrong</div>;

    if(servicesLoading || vehicleTypesLoading) return <div>Loading...</div>;

    console.log(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleChangeDay = (value) => {
        setDayWisePrice({ ...dayWisePrice, day: value });
    }
    const handleChangeDayPrice = (e) => {
        setDayWisePrice({ ...dayWisePrice, price: e.target.value })
    }
    const handleAddDayWisePrice = () => {
        //check if dayWisePrice already exists if formdata
        if (formData.dayWisePrice.some((item) => item.day === dayWisePrice.day)) {
            toast.error("Day already exists");
            return;
        }
        
        setFormData({ ...formData, dayWisePrice: [...formData.dayWisePrice, dayWisePrice] });
    }

    const handleRemoveDayWisePrice = (index) => {
        const updatedDayWisePrice = [...formData.dayWisePrice];
        updatedDayWisePrice.splice(index, 1);
        setFormData({ ...formData, dayWisePrice: updatedDayWisePrice });
    }

    const handleAddServiceProvider = (e) => {
        e.preventDefault();
        if ( !formData.price || !formData.duration || !formData.dayWisePrice.length === 0 || !formData.serviceId || !formData.vehicleTypeId) {
            toast.error("All fields are required");
            return;
        }
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/serviceprovider/add`, formData)
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    toast.success(res.data.message);
                    //router.push("/services");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    }
//console.log(formData)
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Add Service Provider</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                            <Link href="/services-provider">Service Provider</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Add Service Provider
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button type="submit" onClick={handleAddServiceProvider} >Add Service Provider</Button> 
            </div>
        </header>
        <div className="w-full h-full flex gap-4" >
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Add Service Provider
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddServiceProvider} className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Select Service</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, serviceId: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            
                                            {services?.map((service) => (
                                                <SelectItem key={service._id} value={service._id}>{service.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div >
                                    <Label htmlFor="name">Select Vehicle Type</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, vehicleTypeId: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            
                                            {vehicleTypes?.map((vehicleType) => (
                                                <SelectItem key={vehicleType._id} value={vehicleType._id}>{vehicleType.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <Label htmlFor="date">Add Day Wise Price</Label>
                                    <div className="w-full flex flex-col gap-2">
                                        {formData.dayWisePrice.map((dayWisePrice, index) => (
                                            <div key={index} className="w-full flex items-center justify-between gap-2 p-2 bg-muted rounded-md">
                                                <span className="w-full">{dayWisePrice.day}</span>
                                                <span className="w-full">{dayWisePrice.price}</span>
                                                <Button variant="ghost" className="hover:text-red-600" type="button" onClick={() => handleRemoveDayWisePrice(index)}><Trash2Icon className="w-4 h-4" /></Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex gap-2">
                                        <Select onValueChange={handleChangeDay}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a day" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="monday">Monday</SelectItem>
                                                <SelectItem value="tuesday">Tuesday</SelectItem>
                                                <SelectItem value="wednesday">Wednesday</SelectItem>
                                                <SelectItem value="thursday">Thursday</SelectItem>
                                                <SelectItem value="friday">Friday</SelectItem>
                                                <SelectItem value="saturday">Saturday</SelectItem>
                                                <SelectItem value="sunday">Sunday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input name="price" type="number" onChange={handleChangeDayPrice} placeholder="Type price here..." required />
                                        <Button onClick={handleAddDayWisePrice} type="button">Add</Button>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="price">Base Price</Label>
                                    <Input name="price" type="number" onChange={handleChange} placeholder="Type price here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duration(hrs)</Label>
                                    <Input name="duration" type="number" onChange={handleChange} placeholder="Type duration here..." required />
                                </div>
                                <Button type="submit">Submit</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
);
}