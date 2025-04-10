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

export default function AddAdmin({ params }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        id: "",
        status: "",
        serviceId: "",
        vehicleTypeId: "",
        serviceProviderId: "",
        name: "",
        email: "",
        phone: "",
        duration: "",
        totalAmount: "",
        advancePayment: "",
        pendingPayment: "",
        date: "",
        startTime: "",
        endTime: "",
        transactionId: "",
    })
    const [loading, setLoading] = useState(false);

    const { data: appointment, isLoading: isAppointmentLoading, isError: isAppointmentError } = useQuery({
        queryKey: ["appointment"],
        queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointment/${params.id}`).then((res) => {
            setFormData(res?.data?.data);
            return res?.data?.data
        }),
    });
    //console.log(appointment);
    

    if(isAppointmentError) return <div>Something went wrong</div>;

    if(isAppointmentLoading) return <div>Loading...</div>;

    //console.log(formData);

    const handleChangeStatus = (e) => {
        setFormData({ ...formData, status: e });
    }

    const handleUpdateAppointment = (e) => {
        e.preventDefault();

        setLoading(true);

        if ( !formData.status ) {
            toast.error("All fields are required");
            return;
        }
        const appointmentData = {
            status: formData.status,
        }
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointment/update/${params.id}`, appointmentData)
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    toast.success(res.data.message);
                    setLoading(false);
                    //router.push("/services");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
                setLoading(false);
            });
    }
//console.log(formData)
    return (
        <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-2xl font-semi">Edit Appointment</h1>
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
                            Edit Appointment
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button type="submit" disabled={loading} onClick={handleUpdateAppointment} >Update Appointment</Button> 
            </div>
        </header>
        <div className="w-full h-full flex gap-4" >
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Edit Appointment
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="name">Status</Label>
                                    {/* <Input name="name" type="text" value={appointment.status}  placeholder="Type status here..." readOnly /> */}
                                    <Select value={formData.status} onValueChange={handleChangeStatus} className="w-[180px]">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="booked">Booked</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="name">Select Service</Label>
                                    <Input name="name" type="text" value={appointment.serviceId.name}  placeholder="Type service name here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Vehicle Type</Label>
                                    <Input name="name" type="text" value={appointment.vehicleTypeId.name}  placeholder="Type vehicle type here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">User</Label>
                                    <Input name="name" type="text" value={appointment.name}  placeholder="Type user name here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Email</Label>
                                    <Input name="name" type="text" value={appointment.email}  placeholder="Type email here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Phone</Label>
                                    <Input name="name" type="text" value={appointment.phone}  placeholder="Type phone here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Appointment Date</Label>
                                    <Input name="name" type="text" value={new Date(appointment.date).toLocaleDateString('en-GB')}  placeholder="Type appointment date here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Start Time</Label>
                                    <Input name="name" type="text" value={new Date(appointment.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}  placeholder="Type start time here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">End Time</Label>
                                    <Input name="name" type="text" value={new Date(appointment.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}  placeholder="Type end time here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duration(hrs)</Label>
                                    <Input name="duration" type="number" value={formData.duration} placeholder="Type duration here..." required />
                                </div>
                                <div>
                                    <Label htmlFor="name">Total Amount</Label>
                                    <Input name="name" type="number" value={appointment.totalAmount}  placeholder="Type total amount here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Advance Payment</Label>
                                    <Input name="name" type="number" value={appointment.advancePayment}  placeholder="Type advance payment here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Pending Payment</Label>
                                    <Input name="name" type="number" value={appointment.pendingPayment}  placeholder="Type pending payment here..." readOnly />
                                </div>
                                <div>
                                    <Label htmlFor="name">Transaction ID</Label>
                                    <Input name="name" type="text" value={appointment.transactionId}  placeholder="Type transaction ID here..." readOnly />
                                </div> 
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
    </div>
);
}