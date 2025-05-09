"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Eye, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
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
        cell: ({ row }) => {
            const order = row.original;
            return (
                <Link
                    href={`/orders/order-details/${order.orderId}`}
                    className="text-blue-600 hover:underline"
                >
                    {order.orderNumber}
                </Link>
            )
        }
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image");
            return (
                <div className="w-10 h-10">
                    <Image
                        src={image}
                        alt="Customer image"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "product",
        header: "Product",
    },
    {
        accessorKey: "total",
        header: "Total",
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
                     status === "processing" && "text-orange-600 bg-orange-100",
                     )}>
                    {status}
                </div>
            )
        }
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
]