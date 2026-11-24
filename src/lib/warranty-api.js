"use client"

import axios from "axios";

// Warranty registrations are protected on the backend by the `x-admin-key` header
// (env WARRANTY_ADMIN_KEY on the API server). The key is entered once in the
// dashboard and kept in this browser only.
const KEY_STORAGE = "acubemart_warranty_admin_key";

export const getWarrantyKey = () =>
    typeof window === "undefined" ? null : window.localStorage.getItem(KEY_STORAGE);

export const setWarrantyKey = (key) => window.localStorage.setItem(KEY_STORAGE, key);

export const clearWarrantyKey = () => window.localStorage.removeItem(KEY_STORAGE);

const api = () =>
    axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/warranty`,
        headers: { "x-admin-key": getWarrantyKey() || "" },
    });

export const errorMessage = (err) =>
    err?.response?.data?.message || err?.message || "Something went wrong";

export const isKeyError = (err) => [401, 503].includes(err?.response?.status);

export async function fetchWarranties({ q = "", status = "", limit = 200 } = {}) {
    const params = { limit };
    if (q) params.q = q;
    if (status && status !== "all") params.status = status;
    const res = await api().get("/all", { params });
    return res.data.data;
}

/* The list endpoint matches AWR- IDs by prefix, so look the ID up and take the exact match. */
export async function fetchWarrantyByRegistrationId(registrationId) {
    const data = await fetchWarranties({ q: registrationId, limit: 5 });
    return data.warranties.find((w) => w.registrationId === registrationId) || null;
}

export async function updateWarranty(registrationId, update) {
    const res = await api().patch(`/${encodeURIComponent(registrationId)}`, update);
    return res.data;
}

export const STATUS_OPTIONS = [
    { value: "pending", label: "Pending verification" },
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
];

export const statusLabel = (status) =>
    STATUS_OPTIONS.find((s) => s.value === status)?.label || status;

export const TYPE_LABEL = {
    bike: "Bike PPF / Accessories",
    car: "Car PPF / Accessories",
};

export const SOURCE_LABEL = {
    social_media: "Social media",
    friends: "Friends",
    google: "Google",
    other: "Other / Random",
};

// Dates are stored as UTC midnight; show them in UTC so the day never shifts.
export const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
};

export const formatPrice = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
