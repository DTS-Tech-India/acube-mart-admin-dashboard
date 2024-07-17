"use client"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"; 
import { toast } from "sonner"
import { TagInput } from 'emblor';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ImageIcon, Upload, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { getApiData } from "@/lib/get-api-data";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddProduct() {
    const router = useRouter();
    const setValue = useForm();
    const [isPhysicalProduct, setIsPhysicalProduct] = useState(false);
    const [images, setImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState("");
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        description: "",
        stock: "",
        price: "",
        images: [],
        status: "draft",
        type: "",
        category: "",
        element: "",
        brand: "",
        model: "",
        barcode: "",
        sku: "",
        image: "",
        additionalInfo: {
            isPhysicalProduct: isPhysicalProduct,
            shortDescription: "",
            weight: "",
            dimension: "",
            materials: "",
            labels: "",

        },
    });
    const [tags, setTags] = useState([]);
    const [attribute, setAttribute] = useState({
        name: "",
        value: "",
    });
    const [Varient, setVarient] = useState({
        name: "",
        value: "",
    })
    
    const [attributes, setAttributes] = useState([]);
    const [Varients, setVarients] = useState([]);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
    });

    if (isLoading) return "Loading...";
    if (isError) return "An error has occurred.";
    //console.log(data);

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
        //console.log(productData);
    }

    const handleChangeAdditionalInfo = (e) => {
        setProductData({ ...productData, additionalInfo: { ...productData.additionalInfo, [e.target.name]: e.target.value } });
        //console.log(productData.additionalInfo);
    }

    const handleImagesChange = (e) => {
        setProductData({ ...productData, images: e.target.files });
        //console.log(productData.images);
        //Set Images url array
        setImages(
            Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file);
            })
        )
    }

    const handleChangeFeaturedImage = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
        console.log(productData.image);
        //Set Image url
        setFeaturedImage(
            URL.createObjectURL(e.target.files[0])
        )
    }

    const handleTypeChange = (value) => {
        setProductData({ ...productData, type: value });
        //console.log(value);

    }

    const handleStatusChange = (value) => {
        setProductData({ ...productData, status: value });
        //console.log(value);
    }

    const handleCategoryChange = (value) => {
        setProductData({ ...productData, category: value });
        //console.log(value);
    }

    const handleElementChange = (value) => {
        setProductData({ ...productData, element: value });
        //console.log(value);
    }

    const handleBrandChange = (value) => {
        setProductData({ ...productData, brand: value });
        //console.log(value);
    }

    const handleModelChange = (value) => {
        setProductData({ ...productData, model: value });
        //console.log(value);
    }
    const handleChangePhysicalProduct = () => {
        setProductData({ ...productData, additionalInfo: { ...productData.additionalInfo, isPhysicalProduct: !isPhysicalProduct } });
        setIsPhysicalProduct(!isPhysicalProduct);
        //console.log(isPhysicalProduct);
    }
    const handleAttributeChange = (e) => {
        setAttribute({ ...attribute, [e.target.name]: e.target.value });
        //console.log(attribute);
    }

    const addNewAttribute = () => {
        if (attribute.name === "" || attribute.value === "") {
            toast.error("Please fill attribute name and value");
            return;
        }
        setAttributes([...attributes, {
            id: attributes.length,
            name: attribute.name,
            value: attribute.value,
        }]);
        setAttribute({ name: "", value: "" });
        //console.log(attributes);
    }

    const handleDeleteAttribute = (id) => {
        setAttributes(attributes.filter((attribute) => attribute.id !== id));
    }

    const handleVarientChange = (e) => {
        setVarient({ ...Varient, [e.target.name]: e.target.value });
        //console.log(attribute);
    }

    const addNewVarient = () => {
        if (Varient.name === "" || Varient.value === "") {
            toast.error("Please fill variant name and value");
            return;
        }
        setVarients([...Varients, {
            id: Varients.length,
            name: Varient.name,
            value: Varient.value,
        }]);
        setVarient({ name: "", value: "" });
        //console.log(attributes);
    }

    const handleDeleteVarient = (id) => {
        setVarients(Varients.filter((Varient) => Varient.id !== id));
    }
    const handleAddProduct = () => {
        // Add product to database
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            if (data.success) {
                toast.success(data.message);

                //Add attributes to db
                for (let i = 0; i < attributes.length; i++) {
                    const attributeData = {
                        name: attributes[i].name,
                        value: [attributes[i].value],
                        productId: data.data._id,
                    };
                    //console.log(attributeData);
                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attribute/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(attributeData),
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        //console.log(data);
                        toast.success(data.message);
                    })
                    .catch((err) => {
                        //console.log(err);
                        toast.error(err.message);
                    });
                }
                
                //Add Varients to db
                for (let i = 0; i < Varients.length; i++) {
                    const varientsData = {
                        name: Varients[i].name,
                        value: Varients[i].value,
                        productId: data.data._id,
                    };
                    //console.log(varientsData);
                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variant/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(varientsData),
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        //console.log(data);
                        toast.success(data.message);
                    })
                    .catch((err) => {
                        //console.log(err);
                        toast.error(err.message);
                    });
                }

                //send featured image to db
                const imageData = new FormData();
                imageData.append("image", productData.image, productData.image.name);
                imageData.append("productId", data.data._id)
                imageData.append("isFeatured", true)
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/add`, {
                    method: "POST",
                    body: imageData,
                })
                .then((res) => res.json())
                .then((data) => {
                    //console.log(data);
                    toast.success(data.message);
                })
                .catch((err) => {
                    //console.log(err);
                    toast.error(err.message);
                });

                // send multipart formdata for images upload with productId
                const formData = new FormData();
                for (let i = 0; i < productData.images.length; i++) {
                    formData.append("images", productData.images[i], productData.images[i].name);
                }
                formData.append("productId", data.data._id)

                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/add/multiple`, {
                    method: "POST",
                    body: formData,
                })
                .then((res) => res.json())
                .then((data) => {
                    //console.log(data);
                    toast.success(data.message);
                    router.push("/dashboard/products");
                })
                .catch((err) => {
                    //console.log(err);
                    toast.error(err.message);
                });
            } 
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        });
    }

    
    
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Add Products</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/dashboard/products">Products</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Add Product
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleAddProduct}>Add Product</Button> 
                </div>
            </div>
            <div className="w-full h-full flex gap-4">
                <div className="w-full h-full flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            General Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input name="name" onChange={handleChange} placeholder="Type product name here..." />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea name="description" onChange={handleChange} placeholder="Type product description here..." />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Media
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="images">Gallery</Label>
                                <Input name="images" type="file" multiple onChange={handleImagesChange} placeholder="Type product name here..." />
                            </div>
                            {/* preview image before upload */}
                            {images.length > 0 ? (
                                    <div className="flex gap-4">
                                        {images.map((image) => (
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200" key={image}>
                                                <Image src={image} alt={image} width={400} height={400} className="w-full h-full object-cover rounded-sm" />
                                            </div>
                                        ))}
                                    </div>
                            ) : (
                            <div className="flex gap-4">
                                <button className="flex aspect-square w-full max-w-xs items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </span>
                                </button>
                                <button className="flex aspect-square w-full max-w-xs items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </span>
                                </button>
                                <button className="flex aspect-square w-full max-w-xs items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </span>
                                </button>
                            </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Pricing
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="price">Base Price</Label>
                                <Input name="price" onChange={handleChange} type="number" min={0} placeholder="Type product base price here..." />
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="description">Discount Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Discount Percentage (%)</Label>
                                    <Input id="name" placeholder="Type product base price..." />
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="description">Tax Class</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">VAT Amount (%)</Label>
                                    <Input id="name" placeholder="Type VAT amount..." />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Inventory
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <div className="w-full">
                                <Label htmlFor="name">SKU</Label>
                                <Input name="sku" placeholder="Product SKU" onChange={handleChange} />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="description">Barcode</Label>
                                <Input name="barcode" placeholder="Product Barcode" onChange={handleChange} />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="description">Quantity</Label>
                                <Input name="stock" onChange={handleChange} type="number" min={1} placeholder="Type product Quantity here..." />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Attributes
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Attribute name</Label>
                                    <Input name="name" placeholder="Attribute name" value={attribute.name} onChange={handleAttributeChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Attribute value</Label>
                                    <Input name="value" placeholder="Attribute value" value={attribute.value} onChange={handleAttributeChange} />
                                </div>
                                <Button className="mt-auto" onClick={addNewAttribute}>+ Add</Button>
                            </div>
                           {/*  <div className="flex gap-4">
                                <div className="w-full">
                                  <Label htmlFor="description">Attribute values</Label>
                                    <TagInput
                                        //placeholder="Enter a attribute"
                                        tags={tags}
                                        className=""
                                        setTags={(newTags) => {
                                            setTags(newTags);
                                            //setValue('value', newTags);
                                        }}
                                    />  
                                </div>
                                
                            
                            </div> */}
                            {attributes && attributes.map(attribute => (
                                <div key={attribute.id} className="flex gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="name">Attribute name</Label>
                                        <Input id="name" defaultValue={attribute.name} placeholder="Attribute name" />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="description">Attribute value</Label>
                                        <Input id="value" defaultValue={attribute.value} placeholder="Attribute value" />
                                    </div>
                                    <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100" onClick={() => handleDeleteAttribute(attribute.id)} ><X className="w-8 h-8 p-2" /></Button>
                                </div>
                            ))}
                            
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Varients
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Varient name</Label>
                                    <Input name="name" placeholder="Varient name" value={Varient.name} onChange={handleVarientChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Varient value</Label>
                                    <Input name="value" placeholder="Varient value" value={Varient.value} onChange={handleVarientChange} />
                                </div>
                                <Button className="mt-auto" onClick={addNewVarient}>+ Add</Button>
                            </div>
                            {Varients && Varients.map(Varient => (
                                <div key={Varient.id} className="flex gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="name">Varient name</Label>
                                        <Input name="name" defaultValue={Varient.name} placeholder="Varient name" />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="description">Varient value</Label>
                                        <Input name="value" defaultValue={Varient.value} placeholder="Varient value" />
                                    </div>
                                    <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100" onClick={() => handleDeleteVarient(Varient.id)} ><X className="w-8 h-8 p-2" /></Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Additional Information
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <Checkbox name="isPhysicalProduct" onCheckedChange={handleChangePhysicalProduct} defaultChecked={isPhysicalProduct} />
                                <Label htmlFor="physical">This is a physical product</Label>
                            </div>
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="dimension">Dimension</Label>
                                    <Input name="dimension" placeholder="12x12x12 cm" onChange={handleChangeAdditionalInfo} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="weight">Weight</Label>
                                    <Input name="weight" placeholder="weight (kg)" onChange={handleChangeAdditionalInfo} />
                                </div>
                                
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="material">Materials</Label>
                                    <Input name="materials" placeholder="materials" onChange={handleChangeAdditionalInfo} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="lable">Lables</Label>
                                    <Input name="labels" placeholder="lables" onChange={handleChangeAdditionalInfo} />
                                </div> 
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="shortDescription">Short Description</Label>
                                    <Textarea name="shortDescription" placeholder="Type short description here ..." onChange={handleChangeAdditionalInfo} />
                                </div>
                            </div>
                            
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full max-w-xs flex flex-col gap-4">
                    <Card className="w-full h-full">
                        <CardHeader className=" flex flex-row items-center justify-between">
                            <span className="font-semibold">Status</span>
                            <span className={cn("p-1 px-3 rounded-full  text-xs",
                                productData.status === "published" && "bg-green-100 text-green-600",
                                productData.status === "archived" && "bg-sky-200 text-sky-600",
                                productData.status === "draft" && "bg-gray-100 text-gray-600",
                            )}>
                                {productData.status}
                            </span>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Product Status</Label>
                                <Select onValueChange={(value) => handleStatusChange(value)} defaultValue="draft">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Category
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="status">Type</Label>
                                <Select onValueChange={(value) => handleTypeChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.types.map((type) => (
                                            <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Category</Label>
                                <Select onValueChange={(value) => handleCategoryChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.categories.map((category) => (
                                            <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Element</Label>
                                <Select onValueChange={(value) => handleElementChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an element" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.elements.map((element) => (
                                            <SelectItem key={element._id} value={element._id}>{element.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Brand
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="price">Brand</Label>
                                <Select onValueChange={(value) => handleBrandChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.brands.map((brand) => (
                                            <SelectItem key={brand._id} value={brand._id}>{brand.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="price">Model</Label>
                                <Select onValueChange={(value) => handleModelChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.models.map((model) => (
                                            <SelectItem key={model._id} value={model._id}>{model.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Featured Image
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="featuredImage">Image</Label>
                                <Input type="file" name="featuredImage" onChange={handleChangeFeaturedImage} />
                            </div>
                            {featuredImage ? (
                                <Image
                                    src={featuredImage}
                                    alt="product image"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ):(
                                <button className="flex aspect-square w-full max-w-xs items-center justify-center rounded-md border border-dashed">
                                    <span className="p-4 rounded-full hover:bg-muted">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </span>
                            </button>
                            )}
                            
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                    <h2>Product Completion</h2>
                    <p className="px-4 p-1 bg-green-50 text-green-500 rounded-full">0%</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleAddProduct}>Add Product</Button> 
                </div>
            </div>
        </div>
    );
}