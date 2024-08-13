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
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image");
            return (
                <div className="w-10 h-10">
                    <Image
                        src={image}
                        alt="Product image"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div
                    className="flex flex-col gap-0.5"
                >
                    <p >{product.name}</p>
                    <p className="text-xs text-muted-foreground">variants: {product.variants.length}</p>
                    
                </div>
            )
        }
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
                     status === "archived" && "text-sky-600 bg-sky-100",
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
            const product = row.original;
            const handleDeleteProduct = () => {
                // delete product by product id
                //console.log(product.id);

                // Delete product from database
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/delete/${product.id}`, {
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
                {/* link to external website */}
                <Link 
                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/product/${product.slug}`} 
                    variant="ghost" 
                    className="p-2 hover:text-green-500 hover:bg-muted rounded-md"
                    target="_blank"
                    >
                        <Eye className="w-6 h-6 p-0.5" />
                </Link>
                <Link 
                    href={`/dashboard/products/edit-product/${product.id}`} 
                    className="p-2 hover:text-indigo-500 hover:bg-muted rounded-md"
                >
                    <Pen className="w-6 h-6 p-0.5" />
                </Link>
                <Button 
                    href={`#`}
                    variant="ghost"
                    className="p-2 hover:text-red-500 hover:bg-muted rounded-md"
                    onClick={handleDeleteProduct}
                    >
                        <Trash2 className="w-6 h-6 p-0.5" />
                </Button>
              </div>
            )
        }
    }
]