"use client"

import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchWarranties, getWarrantyKey, isKeyError, setWarrantyKey, clearWarrantyKey, errorMessage } from "@/lib/warranty-api";

/* Shows the children only once a working warranty admin key is stored in this browser. */
export default function WarrantyKeyGate({ children }) {
    const [ready, setReady] = useState(false);
    const [hasKey, setHasKey] = useState(false);
    const [key, setKey] = useState("");
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setHasKey(Boolean(getWarrantyKey()));
        setReady(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!key.trim()) return;
        setChecking(true);
        setError("");
        setWarrantyKey(key.trim());
        try {
            await fetchWarranties({ limit: 1 });
            setHasKey(true);
        } catch (err) {
            clearWarrantyKey();
            setError(isKeyError(err) ? "That key was not accepted." : errorMessage(err));
        } finally {
            setChecking(false);
        }
    };

    if (!ready) return null;
    if (hasKey) return children;

    return (
        <div className="w-full flex justify-center pt-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <KeyRound className="w-5 h-5" /> Warranty admin key
                    </CardTitle>
                    <CardDescription>
                        Warranty records need a separate key. Enter it once; it is remembered in this browser.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="warrantyKey">Key</Label>
                            <Input
                                id="warrantyKey"
                                type="password"
                                autoComplete="off"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="Paste the warranty admin key"
                            />
                            {error && <p className="text-sm text-red-600">{error}</p>}
                        </div>
                        <Button type="submit" disabled={checking}>
                            {checking ? "Checking..." : "Continue"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
