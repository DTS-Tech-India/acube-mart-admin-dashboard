"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import WarrantyKeyGate from "@/components/warranty/warranty-key-gate";
import {
    SOURCE_LABEL,
    STATUS_OPTIONS,
    TYPE_LABEL,
    errorMessage,
    fetchWarrantyByRegistrationId,
    formatDate,
    formatPeriod,
    formatPrice,
    statusLabel,
    updateWarranty,
} from "@/lib/warranty-api";
import { statusClass } from "../../../warranty-columns";

const today = () => new Date().toISOString().slice(0, 10);

/* The period is entered as a number + unit (months or years) and saved as months.
   Whole years load back as years. */
const toDraft = (items = []) => items.map((item) => {
    const months = Number(item.warrantyMonths) || 0;
    const inYears = months > 0 && months % 12 === 0;
    return {
        name: item.name,
        period: String(inYears ? months / 12 : months),
        unit: inYears ? "years" : "months",
        price: String(item.price),
        startDate: item.startDate ? item.startDate.slice(0, 10) : "",
    };
});

const periodToMonths = (item) => {
    const n = Number(item.period);
    return item.unit === "years" ? n * 12 : n;
};

function Info({ label, value }) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium break-words">{value || "-"}</p>
        </div>
    );
}

function EditWarrantyForm({ registrationId }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("pending");
    const [saving, setSaving] = useState(false);

    const { data: warranty, isLoading, isError, error } = useQuery({
        queryKey: ["warranty", registrationId],
        queryFn: () => fetchWarrantyByRegistrationId(registrationId),
        retry: false,
    });

    useEffect(() => {
        if (warranty) {
            setItems(toDraft(warranty.items));
            setStatus(warranty.status);
        }
    }, [warranty]);

    const updateItem = (index, field, value) =>
        setItems((current) => current.map((item, i) => (i === index ? { ...item, [field]: value } : item)));

    const addItem = () =>
        setItems((current) => [...current, { name: "", period: "1", unit: "years", price: "", startDate: today() }]);

    const removeItem = (index) => setItems((current) => current.filter((_, i) => i !== index));

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await updateWarranty(registrationId, {
                status,
                items: items.map((item) => ({
                    name: item.name.trim(),
                    warrantyMonths: periodToMonths(item),
                    price: Number(item.price),
                    startDate: item.startDate,
                })),
            });
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["warranties"] });
            queryClient.setQueryData(["warranty", registrationId], res.data);
        } catch (err) {
            toast.error(errorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    if (isError) return <div>Error while fetching warranty: {errorMessage(error)}</div>;
    if (isLoading) return <Skeleton className="w-full h-96" />;
    if (!warranty) return <div>Warranty registration {registrationId} not found.</div>;

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => router.push("/warranty")}>Back</Button>
                <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            </div>
            <div className="w-full h-full flex flex-col lg:flex-row gap-4">
                <div className="w-full flex flex-col gap-4">
                    <Card>
                        <CardHeader className="font-semibold">Customer & Vehicle</CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Info label="Name" value={warranty.name} />
                            <Info label="Phone" value={warranty.phone} />
                            <Info label="Type" value={TYPE_LABEL[warranty.type]} />
                            <Info label="Vehicle number" value={warranty.vehicleNumber} />
                            <Info label={warranty.type === "bike" ? "Bike model" : "Car model"} value={warranty.vehicleModel} />
                            <Info label="Registered" value={formatDate(warranty.createdAt)} />
                            <Info label="Heard about us" value={warranty.source.map((s) => SOURCE_LABEL[s] || s).join(", ")} />
                            <Info label="Terms accepted" value={warranty.termsAccepted ? formatDate(warranty.termsAcceptedAt) : "No"} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="font-semibold flex flex-row items-center justify-between space-y-0">
                            <span>Items (warranty period, price: price is internal, customers don't see it)</span>
                            <Button variant="outline" size="sm" onClick={addItem}>
                                <Plus className="w-4 h-4 mr-1" /> Add Item
                            </Button>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {items.length === 0 && (
                                <p className="text-sm text-muted-foreground">No items yet. Add the products fitted and their warranty period.</p>
                            )}
                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-2 md:grid-cols-[auto_8rem_10rem_auto] gap-2 items-end border-b last:border-0 pb-4 last:pb-0">
                                    <div className="col-span-full">
                                        <Label>Item name</Label>
                                        <Input value={item.name} onChange={(e) => updateItem(index, "name", e.target.value)} placeholder="e.g. Full body PPF" />
                                    </div>
                                    <div>
                                        <Label>Warranty</Label>
                                        <div className="flex gap-1">
                                            <Input
                                                type="number"
                                                min={1}
                                                max={item.unit === "years" ? 20 : 240}
                                                step={1}
                                                className="w-20"
                                                value={item.period}
                                                onChange={(e) => updateItem(index, "period", e.target.value)}
                                            />
                                            <Select value={item.unit} onValueChange={(value) => updateItem(index, "unit", value)}>
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="months">Months</SelectItem>
                                                    <SelectItem value="years">Years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Price (₹, internal)</Label>
                                        <Input type="number" min={0} step="0.01" value={item.price} onChange={(e) => updateItem(index, "price", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Start date</Label>
                                        <Input type="date" value={item.startDate} onChange={(e) => updateItem(index, "startDate", e.target.value)} />
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeItem(index)} aria-label={`Remove item ${index + 1}`}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:max-w-sm flex flex-col gap-4">
                    <Card>
                        <CardHeader className="font-semibold">Status</CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label>Current (as the customer sees it)</Label>
                                <div className={`${statusClass(warranty.effectiveStatus)} w-fit mt-1`}>{statusLabel(warranty.effectiveStatus)}</div>
                            </div>
                            <div>
                                <Label>Set status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUS_OPTIONS.map((s) => (
                                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground mt-1">Active needs at least one item. Active registrations show as Expired once every item has run out.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="font-semibold">Saved items</CardHeader>
                        <CardContent className="flex flex-col gap-3 text-sm">
                            {warranty.items.length === 0 && <p className="text-muted-foreground">None saved yet.</p>}
                            {warranty.items.map((item) => (
                                <div key={item._id} className="border-b last:border-0 pb-2">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-muted-foreground">
                                        {formatPeriod(item.warrantyMonths)} · {formatPrice(item.price)}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {formatDate(item.startDate)} to {formatDate(item.expiryDate)}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default function EditWarranty({ params }) {
    const registrationId = decodeURIComponent(params.id).toUpperCase();
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Warranty {registrationId}</h1>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/warranty">Warranty</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{registrationId}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <WarrantyKeyGate>
                <EditWarrantyForm registrationId={registrationId} />
            </WarrantyKeyGate>
        </div>
    );
}
