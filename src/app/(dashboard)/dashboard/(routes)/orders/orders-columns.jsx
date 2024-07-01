"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Eye, Pen, Trash2 } from "lucide-react";
import Link from "next/link";



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
        accessorKey: "orderId",
        header: "Order ID",
    },
    {
        accessorKey: "product",
        header: "Product",
    },
    {
        accessorKey: "date",
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
            const date = row.getValue("date");
            return (
                <div suppressHydrationWarning>
                    {new Date(date).toLocaleDateString()}
                </div>
            )
        }
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "total",
        header: "Total",
    },
    {
        accessorKey: "payment",
        header: "Payment",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className={cn(
                    "font-medium p-1 px-3 flex items-center justify-center rounded-full",
                     status === "delivered" && "text-green-600 bg-green-100",
                     status === "placed" &&  "text-indigo-600 bg-indigo-100",
                     status === "shipped" && "text-sky-600 bg-sky-100",
                     status === "pending" &&  "text-gray-600 bg-gray-100",
                     status === "cancelled" && "text-red-600 bg-red-100",
                     status === "processing" && "text-yellow-600 bg-yellow-100",
                     )}>
                    {status}
                </div>
            )
        }
    },
    
    {
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
                <Link 
                    href={`#`} 
                    className="p-2 hover:text-indigo-500 hover:bg-muted rounded-md"
                >
                    <Pen className="w-6 h-6 p-0.5" />
                </Link>
                
              </div>
            )
        }
    }
]