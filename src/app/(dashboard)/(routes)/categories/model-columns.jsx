"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ArrowUpDown, Eye, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";



export const modelColumns = [
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
            const model = row.original;
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
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image");
            return (
                <div className="w-10 h-10">
                    {image ? (
                        <Image
                            src={image}
                            alt="Category image"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted rounded-md" />
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Model",
        cell: ({ row }) => {
            const model = row.original;
            return (
                <div suppressHydrationWarning className="flex-col gap-1">
                    
                    <p>{model.name}</p>
                    <p className="text-xs text-muted-foreground">{model.type}</p>
                    <p className="text-xs text-muted-foreground">{model.brand}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "added",
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
            const date = row.getValue("added");
            return (
                <div suppressHydrationWarning>
                    {new Date(date).toLocaleDateString()}
                </div>
            )
        }
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive");
            const handleToggleChange = () => {
                // update category by category id
                axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/model/update/${row.original.id}`, {
                    isActive: !isActive,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        toast.success(res.data.message);
                        
                    }
                })
                .catch((err) => {
                    //console.log(err);
                    toast.error(err.message);
                })
            }
            return (
                <div suppressHydrationWarning>
                    <Switch
                        checked={isActive}
                        onCheckedChange={handleToggleChange}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const model = row.original;
            const handleDeleteModel = () => {
                // delete model by model id
                //console.log(model.id);

                // Delete model from database
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/model/delete/${model.id}`, {
                    method: "DELETE",
                })
                .then((res) => res.json())
                .then((data) => {
                    toast.success(data.message);
                    //console.log(data);
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
                    href={`/categories/edit-model/${model.id}`} 
                    className="p-2 hover:text-indigo-500 hover:bg-muted rounded-md"
                >
                    <Pen className="w-6 h-6 p-0.5" />
                </Link>
                <Button 
                    href={`#`}
                    variant="ghost"
                    className="p-2 hover:text-red-500 hover:bg-muted rounded-md"
                    onClick={handleDeleteModel}
                    >
                        <Trash2 className="w-6 h-6 p-0.5" />
                </Button>
              </div>
            )
        }
    }
]