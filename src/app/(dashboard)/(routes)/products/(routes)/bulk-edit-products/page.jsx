"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Check, Plus, Search, X } from "lucide-react"
import { toast } from "sonner"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getApiData, products } from "@/lib/get-api-data"

const relationshipOptions = {
  type: { label: "Type", source: "types" },
  category: { label: "Category", source: "categories" },
  element: { label: "Sub Category", source: "elements" },
  brand: { label: "Brand", source: "brands" },
  model: { label: "Model", source: "models" },
}

export default function BulkEditProducts() {
  const router = useRouter()
  const [relationshipType, setRelationshipType] = useState("element")
  const [relationshipId, setRelationshipId] = useState("")
  const [selectedProducts, setSelectedProducts] = useState([])
  const [existingProducts, setExistingProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: apiResponse, isLoading: isApiDataLoading, isError: isApiDataError } = useQuery({
    queryKey: ["bulk-edit-products", "relationships"],
    queryFn: getApiData,
    gcTime: 1000 * 60 * 60 * 2,
  })

  const { data: productsResponse, isLoading: isProductsLoading, isError: isProductsError } = useQuery({
    queryKey: ["bulk-edit-products", "products"],
    queryFn: products,
  })

  const productsData = useMemo(() => {
    if (Array.isArray(productsResponse)) return productsResponse
    if (Array.isArray(productsResponse?.data)) return productsResponse.data
    return []
  }, [productsResponse])

  const apiData = useMemo(() => {
    const response = apiResponse?.data && !Array.isArray(apiResponse)
      ? apiResponse.data
      : apiResponse

    return Object.fromEntries(
      Object.keys(relationshipOptions).map((key) => {
        const source = relationshipOptions[key].source
        return [source, Array.isArray(response?.[source]) ? response[source] : []]
      })
    )
  }, [apiResponse])

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return productsData
    return productsData.filter((product) =>
      [product.name, product.sku, product.slug]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    )
  }, [productsData, searchQuery])

  const selectedSet = useMemo(() => new Set(selectedProducts), [selectedProducts])
  const currentRelationship = relationshipOptions[relationshipType]
  const availableRelationships = apiData[currentRelationship.source] || []
  const allVisibleSelected =
    filteredProducts.length > 0 && filteredProducts.every((product) => selectedSet.has(product._id))

  useEffect(() => {
    if (!relationshipId) {
      setExistingProducts([])
      setSelectedProducts([])
      return
    }

    const matchingProductIds = productsData
      .filter((product) => {
        const relationships = Array.isArray(product[relationshipType])
          ? product[relationshipType]
          : product[relationshipType]
            ? [product[relationshipType]]
            : []
        return relationships.some(
          (relationship) =>
            String(relationship?._id || relationship) === relationshipId
        )
      })
      .map((product) => product._id)

    setExistingProducts(matchingProductIds)
    setSelectedProducts(matchingProductIds)
  }, [productsData, relationshipId, relationshipType])

  if (isProductsError || isApiDataError) {
    return <div>An error occurred while fetching product data.</div>
  }

  const toggleProduct = (productId) => {
    setSelectedProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    )
  }

  const toggleVisibleProducts = () => {
    const visibleIds = filteredProducts.map((product) => product._id)
    setSelectedProducts((current) => {
      if (allVisibleSelected) {
        return current.filter((id) => !visibleIds.includes(id))
      }
      return Array.from(new Set([...current, ...visibleIds]))
    })
  }

  const handleBulkEditProducts = async () => {
    const removeProducts = existingProducts.filter(
      (productId) => !selectedProducts.includes(productId)
    )
    if (!relationshipId || (selectedProducts.length === 0 && removeProducts.length === 0)) {
      toast.error("Select a relationship and change at least one product")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/bulk/edit`,
        {
          categoryType: relationshipType,
          category: relationshipId,
          products: selectedProducts,
          removeProducts,
        }
      )
      toast.success(response.data.message || "Products updated successfully")
      router.push("/products")
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update the selected products")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="text-2xl font-semibold">Bulk Edit Products</h1>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><Link href="/">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><Link href="/products">Products</Link></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Bulk Edit Products</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/products")}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleBulkEditProducts} disabled={isSubmitting}>
            {isSubmitting ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isSubmitting ? "Updating..." : `Update ${selectedProducts.length || ""} Products`}
          </Button>
        </div>
      </div>

      {isProductsLoading || isApiDataLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <Card className="w-full">
          <CardHeader className="font-semibold">Assign product relationships</CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Relationship type</Label>
                <Select
                  value={relationshipType}
                  onValueChange={(value) => {
                    setRelationshipType(value)
                    setRelationshipId("")
                    setExistingProducts([])
                    setSelectedProducts([])
                  }}
                >
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(relationshipOptions).map(([value, option]) => (
                      <SelectItem key={value} value={value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{currentRelationship.label} to assign</Label>
                <Select value={relationshipId} onValueChange={setRelationshipId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${currentRelationship.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRelationships.map((item) => (
                      <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">Choose products</p>
                <p className="text-sm text-muted-foreground">
                  {selectedProducts.length} selected out of {productsData.length}
                  {relationshipId
                    ? ` · ${existingProducts.length} currently assigned`
                    : ""}
                </p>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search name, SKU, or slug"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="max-h-[520px] overflow-auto rounded-md border">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-background">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox checked={allVisibleSelected} onCheckedChange={toggleVisibleProducts} />
                    </TableHead>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product._id}
                      data-state={selectedSet.has(product._id) ? "selected" : undefined}
                      className="cursor-pointer"
                      onClick={() => toggleProduct(product._id)}
                    >
                      <TableCell onClick={(event) => event.stopPropagation()}>
                        <Checkbox
                          checked={selectedSet.has(product._id)}
                          onCheckedChange={() => toggleProduct(product._id)}
                        />
                      </TableCell>
                      <TableCell>
                        {product.featuredImage?.url ? (
                          <img src={product.featuredImage.url} alt="" className="h-10 w-10 rounded object-contain" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-muted" />
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="max-w-2xl font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.variants?.length || 0} variants</p>
                      </TableCell>
                      <TableCell>{product.sku || "-"}</TableCell>
                      <TableCell>
                        {existingProducts.includes(product._id) ? (
                          <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                            Already assigned
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell className="capitalize">{product.status || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredProducts.length === 0 && (
                <p className="p-8 text-center text-sm text-muted-foreground">No products match this search.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
