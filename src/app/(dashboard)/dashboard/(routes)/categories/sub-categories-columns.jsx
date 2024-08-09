"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Eye, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";



export const elementColumns = [
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
            const category = row.original;
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
        header: "Category",
        cell: ({ row }) => {
            const category = row.original;
            return (
                <div suppressHydrationWarning className="flex-col gap-1">
                    
                    <p>{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.type}</p>
                    <p className="text-xs text-muted-foreground">{category.category}</p>
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
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const category = row.original;
            const handleDeleteCategory = () => {
                // delete category by category id
                //console.log(category.id);

                // Delete category from database
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/element/delete/${category.id}`, {
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
                    href={`/dashboard/categories/edit-sub-category/${category.id}`} 
                    className="p-2 hover:text-indigo-500 hover:bg-muted rounded-md"
                >
                    <Pen className="w-6 h-6 p-0.5" />
                </Link>
                <Button 
                    href={`#`}
                    variant="ghost"
                    className="p-2 hover:text-red-500 hover:bg-muted rounded-md"
                    onClick={handleDeleteCategory}
                    >
                        <Trash2 className="w-6 h-6 p-0.5" />
                </Button>
              </div>
            )
        }
    }
]