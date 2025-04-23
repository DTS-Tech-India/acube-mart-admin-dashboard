"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Eye, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";



export const columns = [
    {
        accessorKey: "id",
        header: ({ table }) => (
            <Checkbox
              checked={table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => {
            const user = row.original;
            return (
              <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
            )
          }
    },
    {
        accessorKey: "user",
        header: "User",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "service",
        header: "Service",
    },
    {
        accessorKey: "vehicleType",
        header: "Vehicle Type",
    },
    {
        accessorKey: "duration",
        header: "Duration(hrs)",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "paymentMode",
        header: "Payment Mode",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className={cn(
                    "font-medium p-1 px-3 flex items-center justify-center rounded-full",
                     status === "completed" && "text-green-600 bg-green-100",
                     status === "booked" &&  "text-indigo-600 bg-indigo-100",
                     //status === "shipped" && "text-sky-600 bg-sky-100",
                     status === "pending" &&  "text-gray-600 bg-gray-100",
                     status === "cancelled" && "text-red-600 bg-red-100",
                     //status === "processing" && "text-orange-600 bg-orange-100",
                     )}>
                    {status}
                </div>
            )
        }
    },
    {
        accessorKey: "date",
        header: "Date of Appointment",
        cell: ({ row }) => {
            const date = row.getValue("date");
            return (
                <div suppressHydrationWarning>
                    {new Date(date).toLocaleDateString()}
                </div>
            )
        }
    },
    {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => {
            const date = row.getValue("startTime");
            return (
                <div suppressHydrationWarning>
                    {new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
                </div>
            )
        }
    },
    {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => {
            const date = row.getValue("endTime");
            return (
                <div suppressHydrationWarning>
                    {new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
                </div>
            )
        }
    },
    {
        accessorKey: "created",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
          cell: ({ row }) => {
            const date = row.getValue("created");
            return (
                <div suppressHydrationWarning>
                    {new Date(date).toLocaleDateString()}
                </div>
            )
        }
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const appointment = row.original;
            const handleDeleteAppointment = () => {
                // delete user by user id
                

                // Delete user from database
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointment/delete/${appointment.id}`, {
                    method: "DELETE",
                })
                .then((res) => res.json())
                .then((data) => {
                    //console.log(data);
                    toast.success(data.message);
                })
                .catch((err) => {
                    //console.log(err);
                    toast.error(err.message);
                })
            }
            return (
              <div className="flex gap-0.5">
                {/* <Link 
                    href={`#`} 
                    variant="ghost" 
                    className="p-2 hover:text-green-500 hover:bg-muted rounded-md"
                    >
                        <Eye className="w-6 h-6 p-0.5" />
                </Link> */}
                <Link 
                    href={`/appointment/edit-appointment/${appointment.id}`} 
                    className="p-2 hover:text-indigo-500 hover:bg-muted rounded-md"
                >
                    <Pen className="w-6 h-6 p-0.5" />
                </Link>
                <Button 
                    variant="ghost"
                    className="p-2 hover:text-red-500 hover:bg-muted rounded-md"
                    onClick={handleDeleteAppointment}
                    >
                        <Trash2 className="w-6 h-6 p-0.5" />
                </Button>
              </div>
            )
        }
    }
]