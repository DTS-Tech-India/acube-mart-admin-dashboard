"use client"

import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Copy, ImageIcon, Loader2, Search, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { productRelationshipSources } from "@/lib/get-api-data"

const RELATIONSHIP_GROUPS = [
  { key: "type", label: "Type" },
  { key: "category", label: "Category" },
  { key: "element", label: "Subcategory" },
  { key: "brand", label: "Brand" },
  { key: "model", label: "Model" },
]

const createGroupSelection = (selected) =>
  Object.fromEntries(
    RELATIONSHIP_GROUPS.map(({ key }) => [key, selected])
  )

const relationshipNames = (relationships) => {
  const names = (Array.isArray(relationships) ? relationships : [])
    .map((relationship) => relationship?.name || relationship?._id || relationship)
    .filter(Boolean)

  if (names.length === 0) return "None assigned"
  if (names.length <= 3) return names.join(", ")
  return `${names.slice(0, 3).join(", ")} +${names.length - 3} more`
}

const productImageUrl = (product) =>
  product?.featuredImage?.url ||
  product?.image?.find((image) => image?.isFeatured)?.url ||
  product?.image?.[0]?.url

const ProductThumbnail = ({ product }) => {
  const imageUrl = productImageUrl(product)

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded border bg-white">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${product.name} featured image`}
          width={48}
          height={48}
          className="h-full w-full object-contain"
        />
      ) : (
        <ImageIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      )}
    </span>
  )
}

export default function ProductRelationshipImporter({
  currentProductId,
  onImport,
}) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedGroups, setSelectedGroups] = useState(() =>
    createGroupSelection(true)
  )

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query.trim())
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [query])

  const canSearch =
    debouncedQuery.length >= 2 &&
    !selectedProduct
  const {
    data: productOptions = [],
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "relationship-import-products",
      debouncedQuery,
      currentProductId,
    ],
    queryFn: () =>
      productRelationshipSources(debouncedQuery, currentProductId),
    enabled: canSearch,
    gcTime: 1000 * 60 * 10,
  })

  const selectedGroupKeys = useMemo(
    () =>
      RELATIONSHIP_GROUPS
        .filter(({ key }) => selectedGroups[key])
        .map(({ key }) => key),
    [selectedGroups]
  )

  const selectProduct = (product) => {
    setSelectedProduct(product)
    setQuery(product.name)
    setSelectedGroups(createGroupSelection(true))
  }

  const clearSelectedProduct = () => {
    setSelectedProduct(null)
    setQuery("")
    setDebouncedQuery("")
  }

  const importSelectedGroups = () => {
    const relationships = Object.fromEntries(
      selectedGroupKeys.map((key) => [
        key,
        Array.isArray(selectedProduct[key]) ? selectedProduct[key] : [],
      ])
    )
    onImport(selectedProduct, relationships)
  }

  return (
    <div className="space-y-4 border-b pb-5">
      <div>
        <p className="text-sm font-medium">Import from another product</p>
        <p className="text-xs text-muted-foreground">
          Search by product name or full product ID, then choose which
          relationships to copy.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            if (selectedProduct) setSelectedProduct(null)
          }}
          className="pl-9 pr-10"
          placeholder="Search product name or product ID"
        />
        {isFetching && (
          <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {!selectedProduct && canSearch && (
        <div className="max-h-64 overflow-y-auto rounded-md border">
          {isError && (
            <p className="px-3 py-4 text-sm text-red-600">
              {error?.message || "Unable to search products. Please try again."}
            </p>
          )}
          {!isError && !isFetching && productOptions.length === 0 && (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              No product matched that name or ID.
            </p>
          )}
          {productOptions.map((product) => (
            <button
              key={product._id}
              type="button"
              className="flex w-full items-start gap-3 border-b px-3 py-3 text-left last:border-b-0 hover:bg-muted"
              onClick={() => selectProduct(product)}
            >
              <ProductThumbnail product={product} />
              <span className="min-w-0 flex-1">
                <span className="block whitespace-normal break-words text-sm font-medium leading-5">
                  {product.name}
                </span>
                <span className="mt-1 block break-all font-mono text-[11px] leading-4 text-muted-foreground">
                  ID: {product._id}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {!selectedProduct && query.trim().length > 0 && query.trim().length < 2 && (
        <p className="text-xs text-muted-foreground">
          Enter at least two characters to search.
        </p>
      )}

      {selectedProduct && (
        <div className="space-y-4 rounded-md border p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <ProductThumbnail product={selectedProduct} />
              <div className="min-w-0 flex-1">
                <p className="whitespace-normal break-words text-sm font-medium leading-5">
                  {selectedProduct.name}
                </p>
                <p className="mt-1 break-all font-mono text-[11px] leading-4 text-muted-foreground">
                  ID: {selectedProduct._id}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSelectedProduct}
              title="Choose a different source product"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between border-y py-2">
            <p className="text-xs font-medium text-muted-foreground">
              Relationships to import
            </p>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGroups(createGroupSelection(true))}
              >
                Select all
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGroups(createGroupSelection(false))}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="divide-y">
            {RELATIONSHIP_GROUPS.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-start gap-3 py-3"
              >
                <Checkbox
                  className="mt-0.5"
                  checked={selectedGroups[key]}
                  onCheckedChange={(checked) =>
                    setSelectedGroups((current) => ({
                      ...current,
                      [key]: Boolean(checked),
                    }))
                  }
                  aria-label={`Import ${label}`}
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block break-words text-xs text-muted-foreground">
                    {relationshipNames(selectedProduct[key])}
                  </span>
                </span>
              </label>
            ))}
          </div>

          <Button
            type="button"
            className="w-full"
            disabled={selectedGroupKeys.length === 0}
            onClick={importSelectedGroups}
          >
            <Copy className="mr-2 h-4 w-4" />
            Import {selectedGroupKeys.length} selected{" "}
            {selectedGroupKeys.length === 1 ? "group" : "groups"}
          </Button>
        </div>
      )}
    </div>
  )
}
