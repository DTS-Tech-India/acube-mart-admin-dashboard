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
            const transaction = row.original;
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
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => {
            const transactionId = row.getValue("id");
            return (
                <Link 
                    /* className="text-blue-600 hover:underline" */ 
                    href={`#`}
                >
                    {transactionId}
                </Link>
            )
        }
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
                     status === "SUCCESS" && "text-green-600 bg-green-100",
                     status === "FAILED" && "text-red-600 bg-red-100",
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
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ row }) => {
            const orderId = row.getValue("orderId");
            return (
                <Link 
                    className="text-blue-600 hover:underline" 
                    href={`/orders/order-details/${orderId}`}
                >
                    {orderId}
                </Link>
            )
        }
    },
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({ row }) => {
            const userId = row.getValue("userId");
            return (
                <Link 
                    className="text-blue-600 hover:underline" 
                    href={`/customers/customer-details/${userId}`}
                >
                    {userId}
                </Link>
            )
        }
    }
    /* {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const user = row.original;
            return (
              <div className="flex gap-0.5">
                <Link 
                    href={`#`} 
                    variant="ghost" 
                    className="p-2 hover:text-green-500 hover:bg-muted rounded-md"
                    >
                        <Eye className="w-6 h-6 p-0.5" />
                </Link>
              </div>
            )
        }
    } */
]