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

export default function AddAppointment() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        serviceId: "",
        vehicleTypeId: "",
        serviceProviderId: "",
        duration: "",
        price: "",
        startTime: "",
        endTime: "",
        date: "",
        userId: "",
    })
    const [date, setDate] = useState(new Date());

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

    //console.log(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
        <h1 className="text-2xl font-semi">Add Appointment</h1>
        <header className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                            <Link href="/services-provider">Appointment</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Add Appointment
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button type="submit" onClick={handleAddServiceProvider} >Add Appointment</Button> 
            </div>
        </header>
        <div className="w-full h-full flex gap-4" >
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Add Appointment
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
                                {/* <div>
                                    <Label htmlFor="name">Select Service Provider</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, serviceProviderId: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a service provider" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {serviceProviders?.map((serviceProvider) => (
                                                <SelectItem key={serviceProvider._id} value={serviceProvider._id}>{serviceProvider.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div> */}
                                <div>
                                    <Label htmlFor="name">Select Date</Label>
                                    <DatePicker formData={date} setFormData={setDate} />
                                </div>
                                <div>
                                    <Label htmlFor="name">Select Time Slot</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, startTime: value, endTime: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a time slot" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="8am-10am">8am-10am</SelectItem>
                                            <SelectItem value="10am-12pm">10am-12pm</SelectItem>
                                            <SelectItem value="12pm-2pm">12pm-2pm</SelectItem>
                                            <SelectItem value="2pm-4pm">2pm-4pm</SelectItem>
                                            <SelectItem value="4pm-6pm">4pm-6pm</SelectItem>
                                            <SelectItem value="6pm-8pm">6pm-8pm</SelectItem>
                                        </SelectContent>
                                    </Select>
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