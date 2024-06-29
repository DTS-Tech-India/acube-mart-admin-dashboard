"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Eye, Pen, Trash2 } from "lucide-react";



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
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className={cn(
                    "font-medium p-1 px-3 flex items-center justify-center rounded-full",
                     status === "published" && "text-green-600 bg-green-100",
                     status === "draft" &&  "text-gray-600 bg-gray-100",
                     status === "out of stock" && "text-red-600 bg-red-100",
                     status === "low stock" && "text-yellow-600 bg-yellow-100",
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
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const user = row.original;
            return (
              <div className="flex gap-0.5">
                <Button variant="ghost" className="p-1 hover:text-green-500"><Eye className="w-6 h-6 p-0.5" /></Button>
                <Button variant="ghost" className="p-1 hover:text-indigo-500"><Pen className="w-6 h-6 p-0.5" /></Button>
                <Button variant="ghost" className="p-1 hover:text-red-500"><Trash2 className="w-6 h-6 p-0.5" /></Button>
              </div>
            )
        }
    }
]