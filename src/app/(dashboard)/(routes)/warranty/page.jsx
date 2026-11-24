"use client"

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { KeyRound } from "lucide-react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import WarrantyKeyGate from "@/components/warranty/warranty-key-gate";
import { STATUS_OPTIONS, clearWarrantyKey, errorMessage, fetchWarranties, isKeyError } from "@/lib/warranty-api";
import { columns } from "./warranty-columns";

const LIMIT = 200;

function WarrantyList() {
    const [status, setStatus] = useState("all");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["warranties", status],
        queryFn: () => fetchWarranties({ status, limit: LIMIT }),
        retry: false,
    });

    const modifiedData = useMemo(() => data?.warranties.map((w) => ({
        id: w._id,
        registrationId: w.registrationId,
        name: w.name,
        phone: w.phone,
        vehicleNumber: w.vehicleNumber,
        type: w.type,
        vehicleModel: w.vehicleModel,
        itemCount: w.items.length,
        status: w.effectiveStatus,
        created: w.createdAt,
    })), [data]);

    const forgetKey = () => {
        clearWarrantyKey();
        window.location.reload();
    };

    if (isError) {
        return (
            <div className="flex flex-col gap-2">
                <p>Error while fetching warranty registrations: {errorMessage(error)}</p>
                {isKeyError(error) && <Button variant="outline" className="w-fit" onClick={forgetKey}>Enter key again</Button>}
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                    {data ? `${data.total} registration${data.total === 1 ? "" : "s"}` : ""}
                    {data && data.total > LIMIT ? ` (showing the newest ${LIMIT})` : ""}
                </p>
                <div className="flex items-center gap-2">
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-48 bg-white">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            {STATUS_OPTIONS.map((s) => (
                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={forgetKey}>
                        <KeyRound className="w-8 h-8 p-2" /> Forget key
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <Skeleton className="w-full h-96" />
            ) : (
                modifiedData && <DataTable data={modifiedData} columns={columns} />
            )}
        </>
    );
}

export default function Warranty() {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Warranty</h1>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Warranty</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <WarrantyKeyGate>
                <WarrantyList />
            </WarrantyKeyGate>
        </div>
    );
}
