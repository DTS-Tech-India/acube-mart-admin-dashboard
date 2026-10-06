"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copyTextToClipboard, getProductShareUrl } from "@/lib/product-sharing";

export default function CopyProductLinkButton({ productId, productName }) {
  const [copying, setCopying] = useState(false);
  const [manualLink, setManualLink] = useState("");

  const handleCopy = async () => {
    const link = getProductShareUrl(
      productId,
      process.env.NEXT_PUBLIC_FRONTEND_URL || "https://acubemart.in"
    );
    setCopying(true);
    try {
      await copyTextToClipboard(link);
      setManualLink("");
      toast.success("Share link copied", {
        description: "Paste it into Instagram or another chat.",
      });
    } catch {
      setManualLink(link);
      toast.error("Select the share link below and copy it manually.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="gap-1.5 hover:text-blue-600"
        title="Copy short link for Instagram or another chat"
        aria-label={`Copy share link for ${productName}`}
        onClick={handleCopy}
        disabled={copying}
      >
        <Link2 className="h-4 w-4" aria-hidden="true" />
        {copying ? "Copying..." : "Copy link"}
      </Button>
      {manualLink && (
        <Input
          aria-label={`Share link for ${productName}`}
          value={manualLink}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
        />
      )}
    </div>
  );
}
