"use client"

import Link from "next/link"
import Image from "next/image";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"; 
import { toast } from "sonner"
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
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ImageIcon, Upload, X } from "lucide-react";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { getApiData } from "@/lib/get-api-data";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
/* import ReactQuill from 'react-quill';
 */
import 'react-quill/dist/quill.snow.css';
import Multiselect from 'multiselect-react-dropdown';
import { Skeleton } from "@/components/ui/skeleton";
//import TiptapEditor from "@/components/tiptap";

export default function AddProduct() {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const router = useRouter();
    const [isPhysicalProduct, setIsPhysicalProduct] = useState(false);
    const [images, setImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState("");
    const [variantImage, setVariantImage] = useState([]);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        stock: "",
        price: "",
        images: [],
        status: "draft",
        type: [],
        category: [],
        element: [],
        brand: [],
        model: [],
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
        isSimpleProduct: true,
    });
    const [attribute, setAttribute] = useState({
        name: "",
        value: [],
    });
    const [Varient, setVarient] = useState({
        name: "",
        image: [],
        variantAttributes: [],
        mrp: "",
        sp: "",
        discount: "",
        codCharges: "",
        deliveryCharges: "",
        video: "",
        description: "",
        sku: "",
        stock: "",
        barcode: "",
    });
    const [attributes, setAttributes] = useState([]);
    const [Varients, setVarients] = useState([]);
    const [tempVarientAttributes, setTempVarientAttributes] = useState({
        name: "",
        value: "",
    });
    const [varientAttributes, setVarientAttributes] = useState([]);
    const [multiselectAll, setMultiselectAll] = useState({
        type: [],
        category: [],
        element: [],
        brand: [],
        model: [],
    });
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
        gcTime: 1000 * 60 * 60 * 2, //120 minutes
    });

    if (isError) return "An error has occurred.";
    //console.log(data); 

    const handleSelectAllTypes = () => {
            setMultiselectAll({ ...multiselectAll, type: data.types }); 
            setProductData({ ...productData, type: data.types.map((item) => item._id) });     
    }
    const handleDeselectAllTypes = () => {
        setMultiselectAll({ ...multiselectAll, type: [] });
        setProductData({ ...productData, type: [] });
    }

    const handleSelectAllCategories = () => {
        setMultiselectAll({ ...multiselectAll, category: data.categories }); 
        setProductData({ ...productData, category: data.categories.map((item) => item._id) });     
    }
    const handleDeselectAllCategories = () => {
        setMultiselectAll({ ...multiselectAll, category: [] });
        setProductData({ ...productData, category: [] });
    }

    const handleSelectAllElements = () => {
        setMultiselectAll({ ...multiselectAll, element: data.elements }); 
        setProductData({ ...productData, element: data.elements.map((item) => item._id) });     
    }
    const handleDeselectAllElements = () => {
        setMultiselectAll({ ...multiselectAll, element: [] });
        setProductData({ ...productData, element: [] });
    }

    const handleSelectAllBrands = () => {
        setMultiselectAll({ ...multiselectAll, brand: data.brands });  
        setProductData({ ...productData, brand: data.brands.map((item) => item._id) });    
    }
    const handleDeselectAllBrands = () => {
        setMultiselectAll({ ...multiselectAll, brand: [] });
        setProductData({ ...productData, brand: [] });
    }

    const handleSelectAllModels = () => {
        setMultiselectAll({ ...multiselectAll, model: data.models });  
        setProductData({ ...productData, model: data.models.map((item) => item._id) });    
    }
    const handleDeselectAllModels = () => {
        setMultiselectAll({ ...multiselectAll, model: [] });
        setProductData({ ...productData, model: [] });
    }

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
        //console.log(productData.image);
        //Set Image url
        setFeaturedImage(
            URL.createObjectURL(e.target.files[0])
        )
    }

    const handleChangeIsSimpleProduct = (value) => {
        setProductData({ ...productData, isSimpleProduct: value });
    }

    const handleAddType = (list, value) => {
        setProductData({ ...productData, type: [...productData.type, value._id] });
    }

    const handleRemoveType = (list, value) => {
        setProductData({ ...productData, type: list.map((item) => item._id) });
    }

    const handleAddCategory = (list, value) => {
        setProductData({ ...productData, category: [...productData.category, value._id] });
    }

    const handleRemoveCategory = (list, value) => {
        setProductData({ ...productData, category: list.map((item) => item._id) });
    }

    const handleAddElement = (list, value) => {
        setProductData({ ...productData, element: [...productData.element, value._id] });
    }

    const handleRemoveElement = (list, value) => {
        setProductData({ ...productData, element: list.map((item) => item._id) });
    }

    const handleAddBrand = (list, value) => {
        setProductData({ ...productData, brand: [...productData.brand, value._id] });
    }

    const handleRemoveBrand = (list, value) => {
        setProductData({ ...productData, brand: list.map((item) => item._id) });
    }

    const handleAddModel = (list, value) => {
        setProductData({ ...productData, model: [...productData.model, value._id] });
    }

    const handleRemoveModel = (list, value) => {
        setProductData({ ...productData, model: list.map((item) => item._id) });
    }

    const handleStatusChange = (value) => {
        setProductData({ ...productData, status: value });
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
            value: attribute.value.split(",").map((value) => value.trim()),
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

    const addTepmoraryAttributeName = (value) => {
        setTempVarientAttributes({ ...tempVarientAttributes, name: value });
    }
    const addTepmoraryAttributeValue = (value) => {
        setTempVarientAttributes({...tempVarientAttributes, value: value});
    }
    const handleOnVarientAttributeSelect = () => {
        setVarient({ ...Varient, variantAttributes: [...Varient.variantAttributes, { id: Varient.variantAttributes.length, name: tempVarientAttributes.name, value: tempVarientAttributes.value }] });
        setVarientAttributes([...varientAttributes, {id: varientAttributes.length, name: tempVarientAttributes.name, value: tempVarientAttributes.value}]);
        //console.log(Varient);
        //console.log(tempVarientAttributes);
        setTempVarientAttributes({ ...tempVarientAttributes, value: "" });
    }

    const handleVarientImageChange = (e) => {
        setVarient({ ...Varient, image: e.target.files});
        //console.log(Varient);
        setVariantImage(
            Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file);
            })
        )
    }

    const handleDescriptionChange = (value) => {
        setProductData({ ...productData, description: value });
        //console.log(productData.description);
    }

    const handleShortDescriptionChange = (value) => {
        setProductData({ ...productData, additionalInfo: { ...productData.additionalInfo, shortDescription: value } });
        //console.log(productData.additionalInfo);
    }

    const handleVarientDescriptionChange = (value) => {
        setVarient({ ...Varient, description: value });
        //console.log(Varient.description);
    }

    const addNewVarient = () => {
        if (Varient.name === "" || Varient.mrp === "" || Varient.sp === "" || Varient.deliveryCharges === "" || Varient.codCharges === "" || Varient.discount === "" || Varient.image.length === 0 || Varient.variantAttributes.length === 0) {
            toast.error("Please fill all fields");
            return;
        }
        //console.log(Varient);
        setVarients([...Varients, {
            id: Varients.length,
            name: Varient.name,
            mrp: Varient.mrp,
            sp: Varient.sp,
            deliveryCharges: Varient.deliveryCharges,
            codCharges: Varient.codCharges,
            discount: Varient.discount,
            image: Array.from(Varient.image),
            video: Varient.video,
            variantAttributes: Varient.variantAttributes,
            description: Varient.description,
            sku: Varient.sku,
            barcode: Varient.barcode,
            stock: Varient.stock
        }]);
        setVarient({ name: "", value: "", mrp: "", sp: "", deliveryCharges: "", codCharges: "", discount: "", video: "", image: [] , variantAttributes: [], description: "", sku: "", barcode: "", stock: "" });
        setVariantImage([]);
    }
    //console.log(Varient);
    //console.log(Varients);
    //console.log(productData);
    const handleDeleteVarient = (id) => {
        setVarients(Varients.filter((Varient) => Varient.id !== id));
    }
    const handleAddProduct = () => {
        
        if(productData.name === "") return toast.error("Please fill product name");
        if(productData.description === "") return toast.error("Please fill product description");
        if(productData.type.length === 0) return toast.error("Please select product type");
        if(productData.stock === "") return toast.error("Please fill product stock");
        if(productData.category.length === 0) return toast.error("Please select product category");
        if(productData.element.length === 0) return toast.error("Please select product element");
        if(productData.brand.length === 0) return toast.error("Please select product brand");
        if(productData.model.length === 0) return toast.error("Please select product model");
        if(productData.price === "") return toast.error("Please fill product price");
        if(productData.images.length === 0) return toast.error("Please upload product images");
        if(productData.image === "") return toast.error("Please upload featured image"); 
        
        // Add product to database

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/add`, productData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                const productId = res.data.data._id;
                //Add attributes to db
                for (let i = 0; i < attributes.length; i++) {
                    const attributeData = {
                        name: attributes[i].name,
                        value: attributes[i].value,
                        productId: productId,
                    };
                    //console.log(attributeData);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attribute/add`, attributeData)
                    .then((res) => {
                        //console.log(res);
                        if (res.data.success) {
                            toast.success(res.data.message);
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error(err.message);
                    })
                }
                
                //Add varients to db
                for (let i = 0; i < Varients.length; i++) {
                    const varientData = {
                        name: Varients[i].name,
                        mrp: Varients[i].mrp,
                        sp: Varients[i].sp,
                        deliveryCharges: Varients[i].deliveryCharges,
                        codCharges: Varients[i].codCharges,
                        discount: Varients[i].discount,
                        video: Varients[i].video,
                        variantAttributes: Varients[i].variantAttributes,
                        productId: productId,
                        description: Varients[i].description,
                        sku: Varients[i].sku,
                        barcode: Varients[i].barcode,
                        stock: Varients[i].stock
                    };
                    //console.log(varientData);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variant/add`, varientData)
                    .then((res) => {
                        //console.log(res);
                        if (res.data.success) {
                            toast.success(res.data.message);
                            //Add varient images
                            for (let j = 0; j < Varients[i].image.length; j++) {
                                const imageData = new FormData();
                                imageData.append("image", Varients[i].image[j], Varients[i].image[j].name);
                                imageData.append("variantId", res.data.data._id);
                                imageData.append("productId", productId);
                                axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/add/variant`, imageData, {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                })
                                .then((res) => {
                                    //console.log(res);
                                    if (res.data.success) {
                                        toast.success(res.data.message);
                                    } else {
                                        toast.error(res.data.message);
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                    toast.error(err.message);
                                })
                            }
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error(err.message);
                    })
                }

                // Add featured image to db
                const imageData = new FormData();
                imageData.append("image", productData.image, productData.image.name);
                imageData.append("productId", productId);
                imageData.append("isFeatured", true);
                axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/add`, imageData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    //console.log(res);
                    if (res.data.success) {
                        toast.success(res.data.message);
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.message);
                })

                //Add images to db
                const formData = new FormData();
                for (let i = 0; i < productData.images.length; i++) {
                    formData.append("images", productData.images[i], productData.images[i].name);
                }
                    formData.append("productId", res.data.data._id);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/add/multiple`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res.data.success) {
                            //console.log(res);
                            toast.success(res.data.message);
                            router.push("/products");
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch((err) => {
                        //console.log(err);
                        toast.error(err.message);
                    })
                
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }
    const handleCancelButton = () => {
        router.push("/products");
    }
    //console.log(productData);
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Add Products</h1>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                                <Link href="/">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <Link href="/products">Products</Link>
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
                    <Button variant="outline" onClick={handleCancelButton /* () => console.log(productData) */}><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleAddProduct}>Add Product</Button> 
                </div>
            </div>
            {isLoading ? (
                <Skeleton
                className="h-96 w-full aspect-auto" 
            />
            ):(
            <>
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
                                <ReactQuill theme="snow" value={productData.description} onChange={handleDescriptionChange} placeholder="Type product description here..." />
                                {/* <Textarea name="description" onChange={handleChange} placeholder="Type product description here..." /> */}
                               {/*  <TiptapEditor content={productData.description} onChange={(value) => handleDescriptionChange(value)} /> */}
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
                                    <div className="grid grid-cols-5 gap-4">
                                        {images.map((image) => (
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200" key={image}>
                                                <Image src={image} alt={image} width={1000} height={1000} className="w-full h-full object-cover rounded-sm" />
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
                            <div>
                                <Label htmlFor="video">Video Link</Label>
                                <Input name="video" type="text" onChange={handleChange} placeholder="Paste video link here..." />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Pricing
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="price">Maximum Retail Price(INR)</Label>
                                    <Input name="price" onChange={handleChange} type="number" min={0} placeholder="Type MRP here..." />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="discount">Discount Percentage (%)</Label>
                                    <Input name="discount" type="number" min={0} max={100} onChange={handleChange} placeholder="Type discount percentage..." />
                                </div>
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="price">Selling Price(INR)</Label>
                                    <Input name="sp" onChange={handleChange} type="number" min={0} placeholder="Type SP here..." />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Delivery Charges(INR)</Label>
                                    <Input name="deliveryCharges" type="number" min={0} max={100} onChange={handleChange} placeholder="Type COD charges..." />
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="description">Tax Class</Label>
                                    <Select defaultValue="0">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select tax class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">0</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="codCharges">COD Charges(INR)</Label>
                                    <Input name="codCharges" type="number" min={0} onChange={handleChange} placeholder="Type COD charges..." />
                                </div>
                                
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Inventory
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex w-full gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">SKU</Label>
                                    <Input name="sku" placeholder="Product SKU" onChange={handleChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Barcode</Label>
                                    <Input name="barcode" placeholder="Product Barcode" onChange={handleChange} />
                                </div> 
                            </div>
                            <div className="flex w-full gap-4">
                                <div className="w-full">
                                    <Label htmlFor="description">Stock</Label>
                                    <Input name="stock" onChange={handleChange} type="number" min={1} placeholder="Type product Quantity here..." />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Product Type</Label>
                                    <Select value={productData.isSimpleProduct} onValueChange={(value) => handleChangeIsSimpleProduct(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select product type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={true}>Simple</SelectItem>
                                            <SelectItem value={false}>Variant</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
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
                            <div className="flex gap-4">
                                <div className="w-full">
                                  <Label htmlFor="description">Attribute values</Label>
                                    
                                </div>
                                
                            
                            </div>
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
                    <Card className={cn("w-full h-full", productData.isSimpleProduct && "hidden")}>
                        <CardHeader className="font-semibold">
                            Variants
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="name">Variant name</Label>
                                    <Input name="name" placeholder="Varient name" value={Varient.name} onChange={handleVarientChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="price">Maximum Retail Price(INR)</Label>
                                    <Input name="mrp" type="number" min={0} placeholder="Type MRP here..." value={Varient.mrp} onChange={handleVarientChange} />
                                </div>
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="price">Selling Price(INR)</Label>
                                    <Input name="sp" onChange={handleVarientChange} type="number" min={0} value={Varient.sp} placeholder="Type SP here..." />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="discount">Discount Percentage (%)</Label>
                                    <Input name="discount" type="number" min={0} max={100} onChange={handleVarientChange} value={Varient.discount} placeholder="Type Discount percentage..." />
                                </div>
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="description">Delivery Charges(INR)</Label>
                                    <Input name="deliveryCharges" type="number" min={0} max={100} onChange={handleVarientChange} value={Varient.deliveryCharges} placeholder="Type COD charges..." />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="codCharges">COD Charges(INR)</Label>
                                    <Input name="codCharges" type="number" min={0} onChange={handleVarientChange} value={Varient.codCharges} placeholder="Type COD charges..." />
                                </div>
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input name="sku" placeholder="Type SKU here..." value={Varient.sku} onChange={handleVarientChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="barcode">Barcode</Label>
                                    <Input name="barcode" placeholder="Type Barcode here..." value={Varient.barcode} onChange={handleVarientChange} />  
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input name="stock" type="number" min={0} placeholder="Type Stock here..." value={Varient.stock} onChange={handleVarientChange} />
                                </div>
                            </div>
                            {attributes.length > 0 &&
                                    <div className="w-full flex gap-4">
                                        <Select name="name" onValueChange={(value) => addTepmoraryAttributeName(value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Variant attributes type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {attributes.map(attribute => (
                                                    <SelectItem key={attribute.id} value={attribute.name}>{attribute.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select name="value" onValueChange={(value) => addTepmoraryAttributeValue(value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Variant attributes type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {attributes.map(attribute => (
                                                    <div key={attribute.id}>
                                                        {attribute.value.length > 0 && attribute.name === tempVarientAttributes.name && attribute.value.map((value) => (
                                                            <SelectItem key={value} value={value}>{value}</SelectItem>
                                                        ))}
                                                        
                                                    </div>
                                                    
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button onClick={handleOnVarientAttributeSelect}>+ Add</Button>
                                    </div> 
                                }
                                {Varient.variantAttributes.length > 0 && Varient.variantAttributes.map(attribute => (
                                    <div key={attribute.id} className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name">Attribute name</Label>
                                            <Input id="name" defaultValue={attribute.name} placeholder="Variant name" />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="value">Attribute value</Label>
                                            <Input id="value" defaultValue={attribute.value} placeholder="Variant value" />
                                        </div>
                                    </div>
                                ))}
                             <div className="flex flex-col gap-4">
                                    <Input 
                                        name="variantImage"
                                        type="file"
                                        multiple
                                        onChange={handleVarientImageChange}
                                        className="w-full"
                                        />
                                        
                                    {variantImage.length > 0 ? ( 
                                        <div className="flex gap-4">
                                            {variantImage.map((image) => (
                                                <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200" key={image}>
                                                    <Image src={image} alt={image} width={1000} height={1000} className="w-full h-full object-cover rounded-sm" />
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
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="description">Video</Label>
                                    <Input name="video" placeholder="Type video link here..." value={Varient.video} onChange={handleVarientChange} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <Label htmlFor="description">Description</Label>
                                <ReactQuill theme="snow" value={Varient.description} onChange={handleVarientDescriptionChange} placeholder="Type product description here..." />
                                {/* <TiptapEditor content={Varient.description} onChange={handleVarientDescriptionChange} /> */}
                            </div>
                            <div>
                                <Button className="mt-auto" onClick={addNewVarient}>+ Add Variant</Button>
                            </div>
                            
                            {Varients && Varients.map(Varient => (
                                <Accordion type="single" collapsible key={Varient.id}>
                                <AccordionItem value={Varient.id}>
                                  <AccordionTrigger>Variant: {Varient.name}</AccordionTrigger>
                                  <AccordionContent>
                                <div className="rounded-md bg-muted border border-dotted p-4 flex flex-col gap-4" key={Varient.id}>
                                    <div className="flex gap-4 w-full">
                                        <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100 ml-auto" onClick={() => handleDeleteVarient(Varient.id)} ><X className="w-8 h-8 p-2" /></Button>
                                    </div>
                                    <div  className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name">Varient name</Label>
                                            <Input name="name" defaultValue={Varient.name} placeholder="Varient name" />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="price">Maximum Retail Price(INR)</Label>
                                            <Input name="mrp" defaultValue={Varient.mrp} type="number" min={0} placeholder="Type MRP here..." />
                                        </div>
                                    </div>
                                <div className="flex gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="price">Selling Price(INR)</Label>
                                        <Input name="sp" defaultValue={Varient.sp} type="number" min={0} placeholder="Type SP here..." />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="discount">Discount Percentage (%)</Label>
                                        <Input name="discount" type="number" min={0} max={100} defaultValue={Varient.discount} placeholder="Type discount percentage..." />
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="description">Delivery Charges(INR)</Label>
                                        <Input name="deliveryCharges" type="number" min={0} max={100} defaultValue={Varient.deliveryCharges} placeholder="Type COD charges..." />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="codCharges">COD Charges(INR)</Label>
                                        <Input name="codCharges" type="number" min={0} defaultValue={Varient.codCharges} placeholder="Type COD charges..." />
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="sku">SKU</Label>
                                        <Input name="sku" placeholder="Type SKU here..." defaultValue={Varient.sku} />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="barcode">Barcode</Label>
                                        <Input name="barcode" placeholder="Type Barcode here..." defaultValue={Varient.barcode} />  
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input name="stock" type="number" min={0} placeholder="Type Stock here..." defaultValue={Varient.stock} />
                                    </div>
                                </div>
                                        {Varient.variantAttributes && Varient.variantAttributes.map(attribute => (
                                            <div key={attribute.id} className="flex flex-col gap-4">
                                                <div className="w-full">
                                                    <Label htmlFor="name">{attribute.name}</Label>
                                                    <Input id="value" defaultValue={attribute.value} placeholder="Attribute value" />
                                                </div>
                                            </div>
                                        ))}
                                    <div className="w-full flex gap-4">
                                        {Varient.image.length > 0 && Varient.image.map(image => (
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200" key={image.name}>
                                                <Image src={URL.createObjectURL(image)} alt="varientImage" width={1000} height={1000} className="w-full h-full object-cover rounded-sm" />
                                            </div>
                                            
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="description">Video</Label>
                                            <Input name="video" placeholder="Type video link here..." defaultValue={Varient.video} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Label htmlFor="description">Description</Label>
                                        <ReactQuill theme="snow" defaultValue={Varient.description} placeholder="Type variant description here..." />
                                        {/* <TiptapEditor content={Varient.description} onChange={handleVarientDescriptionChange} /> */}
                                    </div>
                                </div>
                                </AccordionContent>
                                </AccordionItem>
                              </Accordion>
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
                                    <Label htmlFor="dimension">Dimension(cm)</Label>
                                    <Input name="dimension" placeholder="12x12x12 cm" onChange={handleChangeAdditionalInfo} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="weight">Weight(kg)</Label>
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
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="description">Description</Label>
                                {/* <Editor /> */} 
                                <ReactQuill theme="snow" value={productData.additionalInfo.shortDescription} onChange={handleShortDescriptionChange} placeholder="Type short description here..." />
                                {/* <TiptapEditor content={productData.additionalInfo.shortDescription} onChange={(value) => handleShortDescriptionChange(value)} /> */}
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
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="status">Type</Label>
                                <Multiselect 
                                    options={data.types}
                                    displayValue="name"
                                    onSelect={handleAddType}
                                    onRemove={handleRemoveType}
                                    selectedValues={multiselectAll.type}
                                    placeholder="Select types"
                                    showCheckbox
                                    showArrow
                                    avoidHighlightFirstOption

                                />
                                <div className="flex items-center justify-between gap-4">
                                    <Button variant="ghost" onClick={handleSelectAllTypes}>Select All</Button>
                                    <Button variant="ghost" onClick={handleDeselectAllTypes}>Deselect All</Button>
                                </div>
                                
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="status">Category</Label>
                                <Multiselect 
                                    options={data.categories}
                                    displayValue="name"
                                    onSelect={handleAddCategory}
                                    onRemove={handleRemoveCategory}
                                    selectedValues={multiselectAll.category}
                                    placeholder="Select categories"
                                    showCheckbox
                                    showArrow
                                    avoidHighlightFirstOption
                                />
                                <div className="flex items-center justify-between gap-4">
                                    <Button variant="ghost" onClick={handleSelectAllCategories}>Select All</Button>
                                    <Button variant="ghost" onClick={handleDeselectAllCategories}>Deselect All</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="status">Element</Label>
                                <Multiselect 
                                    options={data.elements}
                                    displayValue="name"
                                    onSelect={handleAddElement}
                                    onRemove={handleRemoveElement}
                                    selectedValues={multiselectAll.element}
                                    placeholder="Select elements"
                                    showCheckbox
                                    showArrow
                                    avoidHighlightFirstOption
                                />
                                <div className="flex items-center justify-between gap-4">
                                    <Button variant="ghost" onClick={handleSelectAllElements}>Select All</Button>
                                    <Button variant="ghost" onClick={handleDeselectAllElements}>Deselect All</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Brand
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="price">Brand</Label>
                                <Multiselect 
                                    options={data.brands}
                                    displayValue="name"
                                    onSelect={handleAddBrand}
                                    onRemove={handleRemoveBrand}
                                    selectedValues={multiselectAll.brand}
                                    placeholder="Select brands"
                                    showCheckbox
                                    showArrow
                                    avoidHighlightFirstOption
                                />
                                <div className="flex items-center justify-between gap-4">
                                    <Button variant="ghost" onClick={handleSelectAllBrands}>Select All</Button>
                                    <Button variant="ghost" onClick={handleDeselectAllBrands}>Deselect All</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="price">Model</Label>
                                <Multiselect 
                                    options={data.models}
                                    displayValue="name"
                                    onSelect={handleAddModel}
                                    onRemove={handleRemoveModel}
                                    selectedValues={multiselectAll.model}
                                    placeholder="Select models"
                                    showCheckbox
                                    showArrow
                                    avoidHighlightFirstOption
                                />
                                <div className="flex items-center justify-between gap-4">
                                    <Button variant="ghost" onClick={handleSelectAllModels}>Select All</Button>
                                    <Button variant="ghost" onClick={handleDeselectAllModels}>Deselect All</Button>
                                </div>
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
                                    width={1000}
                                    height={1000}
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
                    <Button variant="outline" onClick={handleCancelButton}><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleAddProduct}>Add Product</Button> 
                </div>
            </div>
        </>
        )}
        </div>
    );
}