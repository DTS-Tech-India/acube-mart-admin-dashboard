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
        accessorKey: "name",
        header: "Service",
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
            const user = row.original;
            const handleDeleteUser = () => {
                // delete user by user id
                console.log(user.id);

                // Delete user from database
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/delete/${user.id}`, {
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
                    href={`/services/edit-service/${user.id}`} 
                    variant="ghost" 
                    className="p-2 hover:text-indigo-500 hover:bg-muted rounded-md"
                >
                    <Pen className="w-6 h-6 p-0.5" />
                </Link>
                <Button 
                    variant="ghost"
                    className="p-2 hover:text-red-500 hover:bg-muted rounded-md"
                    onClick={handleDeleteUser}
                    >
                        <Trash2 className="w-6 h-6 p-0.5" />
                </Button>
              </div>
            )
        }
    }
]