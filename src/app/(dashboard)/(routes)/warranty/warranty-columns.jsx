"use client"

import Link from "next/link";
import { ArrowUpDown, Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate, statusLabel } from "@/lib/warranty-api";

export const statusClass = (status) => cn(
    "font-medium p-1 px-3 flex items-center justify-center rounded-full whitespace-nowrap",
    status === "active" && "text-green-600 bg-green-100",
    status === "pending" && "text-amber-700 bg-amber-100",
    status === "expired" && "text-gray-600 bg-gray-100",
);

export const columns = [
    {
        accessorKey: "registrationId",
        header: "Registration ID",
        cell: ({ row }) => (
            <Link href={`/warranty/edit-warranty/${row.original.registrationId}`} className="font-semibold hover:underline">
                {row.original.registrationId}
            </Link>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "vehicleNumber",
        header: "Vehicle No.",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span className="capitalize">{row.getValue("type")}</span>,
    },
    {
        accessorKey: "vehicleModel",
        header: "Model",
    },
    {
        accessorKey: "itemCount",
        header: "Items",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return <div className={statusClass(status)}>{statusLabel(status)}</div>;
        },
    },
    {
        accessorKey: "created",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Registered
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div suppressHydrationWarning>{formatDate(row.getValue("created"))}</div>,
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
            <Link href={`/warranty/edit-warranty/${row.original.registrationId}`} aria-label="Edit warranty">
                <Pen className="w-8 h-8 p-2 hover:bg-gray-100 rounded-md" />
            </Link>
        ),
    },
];
