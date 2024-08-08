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
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "couponType",
        header: "Coupon Type",
    },
    
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "usageLimit",
        header: "Usage Limit",
    },
    {
        accessorKey: "expiry",
        header: "Expiry",
        cell: ({ row }) => {
            const date = row.getValue("expiry");
            return (
                <div suppressHydrationWarning>
                    {new Date(date).toLocaleDateString()}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className={cn(
                    "font-medium p-1 px-3 flex items-center justify-center rounded-full",
                     status === "active" && "text-green-600 bg-green-100",
                     status === "inactive" && "text-red-600 bg-red-100",
                     )}>
                    {status}
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
            const coupon = row.original;
            const handleDeleteCoupon = () => {
                // Delete coupon from database
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/delete/${coupon.id}`, {
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
                    href={`/dashboard/customers/customer-details/${coupon.id}`} 
                    variant="ghost" 
                    className="p-2 hover:text-green-500 hover:bg-muted rounded-md"
                    >
                        <Eye className="w-6 h-6 p-0.5" />
                </Link> */}
                <Link 
                    href={`/dashboard/coupons/edit-coupons/${coupon.id}`} 
                    className="p-2 hover:text-indigo-500 hover:bg-muted rounded-md"
                >
                    <Pen className="w-6 h-6 p-0.5" />
                </Link>
                <Button 
                    href={`#`}
                    variant="ghost"
                    className="p-2 hover:text-red-500 hover:bg-muted rounded-md"
                    onClick={handleDeleteCoupon}
                    >
                        <Trash2 className="w-6 h-6 p-0.5" />
                </Button>
              </div>
            )
        }
    }
]