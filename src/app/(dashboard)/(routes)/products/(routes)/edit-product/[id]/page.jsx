"use client"

import React from "react";
import Link from "next/link"
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
import { ImageIcon, Trash2, Upload, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { getApiData, getApiDataByQuery } from "@/lib/get-api-data";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";


export default function Page({ params }) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    const router = useRouter();
    router.refresh();
    const [isPhysicalProduct, setIsPhysicalProduct] = useState(false);
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [featuredImage, setFeaturedImage] = useState("");
    const [variantImage, setVariantImage] = useState("");
    const [productData, setProductData] = useState({});
    const [updateData, setUpdateData] = useState({});
    const [attribute, setAttribute] = useState({
        name: "",
        value: [],
    });
    const [Varient, setVarient] = useState({
        name: "",
        mrp: "",
        image: "",
        imageUrl: "",
        variantAttributes: [],
        sp: "",
        deliveryCharges: "",
        codCharges: "",
        discount: "",
        video: "",
        description: "",
        sku: "",
        barcode: "",
        stock: ""
    })
    
    const [attributes, setAttributes] = useState([]);
    const [Varients, setVarients] = useState([]);
    const [multiselectAll, setMultiselectAll] = useState({
        type: [],
        category: [],
        element: [],
        brand: [],
        model: [],
    });
    const [tempVarientAttributes, setTempVarientAttributes] = useState({
        name: "",
        value: "",
    });
    const [varientAttributes, setVarientAttributes] = useState([]);
    const [productImages, setProductImages] = useState({
        featuredImage: "",
        galleryImages: [],
    });
    const [attributesUpdate, setAttributesUpdate] = useState([]);
   const {data: product, isLoading: isProductLoading, isError: isProductError, isSuccess, refetch: refetchProduct} = useQuery({
       queryKey: ["product"],
       queryFn: async() => await getApiDataByQuery(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${params.id}`),
       gcTime: 1000 * 60 * 60, //60 minutes
   })
   
   useEffect(() => {
    if(product) {
        setProductData(() => product)
        setAttributes(product.attributes)
        setVarients(product.varients)
        setUpdateData({
            type: product.type.map((item) => item._id),
            category: product.category.map((item) => item._id),
            element: product.element.map((item) => item._id),
            brand: product.brand.map((item) => item._id),
            model: product.model.map((item) => item._id),
        })
        setMultiselectAll({
            type: product.type,
            category: product.category,
            element: product.element,
            brand: product.brand,
            model: product.model,
        })
        setDescription(product.description)
        setProductImages({
            featuredImage: product.featuredImage,
            galleryImages: product.image
        })
    }
    }, [product])

    const { data: apiData, isLoading: isApiDataLoading, isError: isApiDataError } = useQuery({
        queryKey: ["apiData"],
        queryFn: async() => await getApiData(),
        gcTime:  1000 * 60 * 60, //60 minutes
    })
    
    if (isProductError) return <div>Error while fetching the product</div>
    if (isApiDataError) return <div>Error while fetching the api</div>
    
    //console.log(product);

    const handleSelectAllTypes = () => {
        setMultiselectAll({ ...multiselectAll, type: apiData.types }); 
        setProductData({ ...productData, type: apiData.types.map((item) => item._id) });   
        setUpdateData({ ...updateData, type: apiData.types.map((item) => item._id) });  
}
const handleDeselectAllTypes = () => {
    setMultiselectAll({ ...multiselectAll, type: [] });
    setProductData({ ...productData, type: [] });
    setUpdateData({ ...updateData, type: [] });
}

const handleSelectAllCategories = () => {
    setMultiselectAll({ ...multiselectAll, category: apiData.categories }); 
    setProductData({ ...productData, category: apiData.categories.map((item) => item._id) }); 
    setUpdateData({ ...updateData, category: apiData.categories.map((item) => item._id) });    
}
const handleDeselectAllCategories = () => {
    setMultiselectAll({ ...multiselectAll, category: [] });
    setProductData({ ...productData, category: [] });
    setUpdateData({ ...updateData, category: [] });
}

const handleSelectAllElements = () => {
    setMultiselectAll({ ...multiselectAll, element: apiData.elements }); 
    setProductData({ ...productData, element: apiData.elements.map((item) => item._id) });     
    setUpdateData({ ...updateData, element: apiData.elements.map((item) => item._id) });
}
const handleDeselectAllElements = () => {
    setMultiselectAll({ ...multiselectAll, element: [] });
    setProductData({ ...productData, element: [] });
    setUpdateData({ ...updateData, element: [] });
}

const handleSelectAllBrands = () => {
    setMultiselectAll({ ...multiselectAll, brand: apiData.brands });  
    setProductData({ ...productData, brand: apiData.brands.map((item) => item._id) });    
    setUpdateData({ ...updateData, brand: apiData.brands.map((item) => item._id) });
}
const handleDeselectAllBrands = () => {
    setMultiselectAll({ ...multiselectAll, brand: [] });
    setProductData({ ...productData, brand: [] });
    setUpdateData({ ...updateData, brand: [] });
}

const handleSelectAllModels = () => {
    setMultiselectAll({ ...multiselectAll, model: apiData.models });  
    setProductData({ ...productData, model: apiData.models.map((item) => item._id) });  
    setUpdateData({ ...updateData, model: apiData.models.map((item) => item._id) });  
}
const handleDeselectAllModels = () => {
    setMultiselectAll({ ...multiselectAll, model: [] });
    setProductData({ ...productData, model: [] });
    setUpdateData({ ...updateData, model: [] });
}


    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
        //console.log(productData);
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }

    const handleChangeAdditionalInfo = (e) => {
        setProductData({ ...productData, additionalInfo: { ...productData.additionalInfo, [e.target.name]: e.target.value } });
        //console.log(productData.additionalInfo);
        setUpdateData({ ...updateData, additionalInfo: { ...productData.additionalInfo, [e.target.name]: e.target.value } })
    }

    const handleChangeIsSimpleProduct = (value) => {
        setProductData({ ...productData, isSimpleProduct: value });
        setUpdateData({ ...updateData, isSimpleProduct: value })
    }

    const handleImagesChange = (e) => {
        //Set Images url array
        setImages(
            Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file);
            })
        )
        setUpdateData({ ...updateData, images: e.target.files })
    }

    const handleChangeFeaturedImage = (e) => {
        //setProductData({ ...productData, featuredImage: e.target.files[0] });
        //console.log(productData.featuredImage);
        setUpdateData({ ...updateData, featuredImage: e.target.files[0] })
        //Set Image url
        setFeaturedImage(
            URL.createObjectURL(e.target.files[0])
        )
       
    }

    const handleStatusChange = (value) => {
        setProductData({ ...productData, status: value });
        //console.log(value);
        setUpdateData({ ...updateData, status: value })
    }

    const handleAddType = (list, value) => {
        setProductData({ ...productData, type: [...productData.type, value._id] });
        setUpdateData({ ...updateData, type: [...updateData.type, value._id] });
    }

    const handleRemoveType = (list, value) => {
        console.log(list, value);
        setProductData({ ...productData, type: list.map((item) => item._id) });
        setUpdateData({ ...updateData, type: list.map((item) => item._id) });
    }

    const handleAddCategory = (list, value) => {
        setProductData({ ...productData, category: [...productData.category, value._id] });
        setUpdateData({ ...updateData, category: [...updateData.category, value._id] });
    }

    const handleRemoveCategory = (list, value) => {
        setProductData({ ...productData, category: list.map((item) => item._id) });
        setUpdateData({ ...updateData, category: list.map((item) => item._id) });
    }

    const handleAddElement = (list, value) => {
        setProductData({ ...productData, element: [...productData.element, value._id] });
        setUpdateData({ ...updateData, element: [...updateData.element, value._id] });
    }

    const handleRemoveElement = (list, value) => {
        setProductData({ ...productData, element: list.map((item) => item._id) });
        setUpdateData({ ...updateData, element: list.map((item) => item._id) });
    }

    const handleAddBrand = (list, value) => {
        setProductData({ ...productData, brand: [...productData.brand, value._id] });
        setUpdateData({ ...updateData, brand: [...updateData.brand, value._id] });
    }

    const handleRemoveBrand = (list, value) => {
        setProductData({ ...productData, brand: list.map((item) => item._id) });
        setUpdateData({ ...updateData, brand: list.map((item) => item._id) });
    }

    const handleAddModel = (list, value) => {
        setProductData({ ...productData, model: [...productData.model, value._id] });
        setUpdateData({ ...updateData, model: [...updateData.model, value._id] });
    }

    const handleRemoveModel = (list, value) => {
        setProductData({ ...productData, model: list.map((item) => item._id) });
        setUpdateData({ ...updateData, model: list.map((item) => item._id) });
    }
    const handleChangePhysicalProduct = () => {
        setProductData({ ...productData, additionalInfo: { ...productData.additionalInfo, isPhysicalProduct: !isPhysicalProduct } });
        setIsPhysicalProduct(!isPhysicalProduct);
        //console.log(isPhysicalProduct);
        setUpdateData({ ...updateData, additionalInfo: { ...productData.additionalInfo, isPhysicalProduct: !isPhysicalProduct } })
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
        const attributeData = {
            name: attribute.name,
            value: attribute.value.split(",").map((value) => value.trim()),
            productId: params.id
        }
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attribute/add`, attributeData)
        .then((res) => {
        //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                setAttribute({ name: "", value: "" });
                //console.log(attributes);
                refetchProduct();
            }
        })
       
    }
//console.log(productData)
    const handleDeleteAttribute = (id) => {

        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attribute/delete/${id}`)
        .then((res) => {
            console.log(res);
            if (res.data.success) {
                //console.log(res.data.message);
                toast.success(res.data.message);
                //setAttributes(attributes.filter((attribute) => attribute.id !== id));
                refetchProduct();
            }
        })
    }

    const handleChangeAttributesData = (e) => {
        setAttributesUpdate({ ...attributesUpdate, [e.target.name]: e.target.value });
        //console.log(attributesUpdate);
    }

    const handleUpdateAttribute = (id) => {
        const attributeData = {
            productId: params.id,
            attributeId: id
        }
        if (attributesUpdate?.name) attributeData.name = attributesUpdate.name;
        if (attributesUpdate?.value) attributeData.value = attributesUpdate.value.split(",").map((value) => value.trim());
        //console.log(attributeData);
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attribute/update`, attributeData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                //console.log(res.data.message);
                toast.success(res.data.message);
                setAttributesUpdate({ name: "", value: "" });
                refetchProduct();
            }
        })
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
        //Set Image url
        /* if(e.target.files[0] === undefined) return setVariantImage([]); */
        setVariantImage(
            Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file);
            })
        )
    }

    const handleDescriptionChange = (html) => {
        //setProductData({ ...productData, description: html });
        setDescription(html);
        //console.log(productData.description);
        setUpdateData({ ...updateData, description: html })
    }

    const handleShortDescriptionChange = (html) => {
        setProductData({ ...productData, additionalInfo: { ...productData.additionalInfo, shortDescription: html } });
        //console.log(productData.additionalInfo);
        setUpdateData({ ...updateData, additionalInfo: { ...productData.additionalInfo, shortDescription: html } })
    }

    const handleVarientDescriptionChange = (html) => {
        setVarient({ ...Varient, description: html });
        //console.log(Varient.description);
    }

    const addNewVarient = () => {
        if (Varient.name === "" || Varient.image === "" || Varient.mrp === "" || Varient.sp === "" || Varient.deliveryCharges === "" || Varient.codCharges === "" || Varient.discount === "" || Varient.video === "" || Varient.variantAttributes.length === 0) {
            toast.error("Please fill variant name and value");
            return;
        }
        const variantData = {
            name: Varient.name,
            mrp: Varient.mrp,
            sp: Varient.sp,
            deliveryCharges: Varient.deliveryCharges,
            codCharges: Varient.codCharges,
            discount: Varient.discount,
            video: Varient.video,
            variantAttributes: Varient.variantAttributes,
            productId: params.id,
            description: Varient.description,
            sku: Varient.sku,
            barcode: Varient.barcode,
            stock: Varient.stock
        }
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variant/add`, variantData)
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                //add variant image to db
                for (let i = 0; i < Varient.image.length; i++) {
                    const formData = new FormData();
                    formData.append("image", Varient.image[i], Varient.image[i].name);
                    formData.append("variantId", res.data.data._id);
                    formData.append("productId", params.id);
                    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/add/variant`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res.data.success) {
                            //console.log(res);
                            toast.success(res.data.message);
                            refetchProduct();
                        }
                    })
                    .catch((err) => {
                        //console.log(err);
                        toast.error(err.response.data.message);
                    })
                }
            }
        })
        setVarient({ name: "", value: "", mrp: "", sp: "", deliveryCharges: "", codCharges: "", discount: "", video: "", image: [] , variantAttributes: [], description: "", sku: "", barcode: "", stock: "" });
        setVariantImage([]);
    }

    const handleDeleteVarient = (id) => {

        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variant/delete/${id}`)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                //console.log(res.data.message);
                toast.success(res.data.message);
                //setAttributes(attributes.filter((attribute) => attribute.id !== id));
                refetchProduct();
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.response.data.message);
        })
    }

    const handleAddImages = () => {
        const formData = new FormData();
        for (let i = 0; i < updateData.images.length; i++) {
            formData.append("images", updateData.images[i], updateData.images[i].name);
            
        }
        formData.append("productId", params.id);

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/add/multiple`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            if (res.data.success) {
                //console.log(res);
                toast.success(res.data.message);
                setImages([]);
                refetchProduct();
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }

    const handleDeleteImage = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/delete/${id}`)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                //console.log(res);
                toast.success(res.data.message);
                //setAttributes(attributes.filter((attribute) => attribute.id !== id));
                refetchProduct();
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }

    const handleUpdateFeaturedImage = () => {
        const formData = new FormData();
        formData.append("image", updateData.featuredImage, updateData.featuredImage.name);
        formData.append("productId", params.id);
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/update/featured/${params.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            if (res.data.success) {
                //console.log(res);
                toast.success(res.data.message);
                setFeaturedImage("");
                refetchProduct();
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        })
    }

    //console.log(updateData);
    const handleUpdateProduct = () => {
        // Add product to database
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/edit/${params.id}`, updateData)
        .then((res) => {
            //console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                refetchProduct();
            }
        })
        .catch((err) => {
            //console.log(err);
            toast.error(err.message);
        });
    }

    const handleCancelButton = () => {
        router.push("/products");
    }
    return (
      <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-2xl font-semi">Edit Products</h1>
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
                                Edit Product
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleCancelButton}><X className="w-8 h-8 p-2" /> cancel</Button>
                    <Button onClick={handleUpdateProduct}>Save Product</Button> 
                </div>
            </div>
            {(isApiDataLoading || isProductLoading) ? (
              <Skeleton
              className="h-96 w-full aspect-auto" 
          />
            ) : (
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
                                <Input name="name" value={productData.name} onChange={handleChange} placeholder="Type product name here..." />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                {/* <Textarea name="description" value={productData.description} onChange={handleChange} placeholder="Type product description here..." /> */}
                                <ReactQuill theme="snow" value={description} onChange={handleDescriptionChange} placeholder="Type productdescription here..." />
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
                            {(productImages.galleryImages || images) ? (
                                <>
                                    <div className="grid grid-cols-5 gap-4">
                                        {productImages.galleryImages.map((image) => (
                                            <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200 relative" key={image._id}>
                                                <Button variant="ghost" onClick={() => handleDeleteImage(image._id)} className="absolute top-2 right-2 text-red-600 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                                                <Image src={image.url} alt={image._id} width={1000} height={1000} className="w-full h-full object-cover rounded-sm" />
                                            </div>
                                        ))}
                                    </div>
                                    {images.length > 0 ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="grid grid-cols-5 gap-4">
                                                {images.map((image) => (
                                                    <div className="w-full max-w-xs aspect-square rounded-sm bg-slate-200" key={image}>
                                                        <Image src={image} alt={image} width={1000} height={1000} className="w-full h-full object-cover rounded-sm" />
                                                    </div>
                                                ))}
                                            </div>
                                            <Button className="w-full max-w-xs" onClick={handleAddImages}>Add Images</Button>
                                        </div>
                                    ) : null}
                                </>
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
                                <Input name="video" type="text" onChange={handleChange} value={productData?.video} placeholder="Paste video link here..." />
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
                                    <Input name="price" value={productData.price} onChange={handleChange} type="number" min={0} placeholder="Type product base price here..." />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="discount">Discount Percentage (%)</Label>
                                    <Input name="discount" value={productData?.discount} type="number" min={0} max={100} onChange={handleChange} placeholder="Type discount percentage..." />
                                </div>
                            </div>
                            
                            
                            <div className="flex gap-4 w-full">
                            <div className="w-full">
                                    <Label htmlFor="price">Selling Price(INR)</Label>
                                    <Input name="sp" value={productData?.sp} onChange={handleChange} type="number" min={0} placeholder="Type SP here..." />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Delivery Charges(INR)</Label>
                                    <Input name="deliveryCharges" value={productData?.deliveryCharges} type="number" min={0} max={100} onChange={handleChange} placeholder="Type COD charges..." />
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
                                    <Input name="codCharges" value={productData?.codCharges} type="number" min={0} onChange={handleChange} placeholder="Type COD charges..." />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-full">
                        <CardHeader className="font-semibold">
                            Inventory
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="name">SKU</Label>
                                    <Input name="sku" value={productData?.sku} placeholder="Product SKU" onChange={handleChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Barcode</Label>
                                    <Input name="barcode" value={productData?.barcode} placeholder="Product Barcode" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="description">Stock</Label>
                                    <Input name="stock" value={productData?.stock} onChange={handleChange} type="number" min={1} placeholder="Type product Quantity here..." />
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
                            {attributes && attributes.map(attribute => (
                                <div key={attribute._id} className="flex gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="name">Attribute name</Label>
                                        <Input name="name" defaultValue={attribute.name} onChange={handleChangeAttributesData} placeholder="Attribute name" />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="description">Attribute value</Label>
                                        <Input name="value" defaultValue={attribute.value} onChange={handleChangeAttributesData} placeholder="Attribute value" />
                                    </div>
                                    <Button className="mt-auto" onClick={() => handleUpdateAttribute(attribute._id)}>Update</Button>
                                    <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100" onClick={() => handleDeleteAttribute(attribute._id)} ><X className="w-8 h-8 p-2" /></Button>
                                </div>
                            ))}
                            
                        </CardContent>
                    </Card>
                    <Card className={cn("w-full h-full", productData.isSimpleProduct === true ? "hidden": "")}>
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
                                    <Input name="sku" value={Varient.sku} placeholder="Product SKU" onChange={handleVarientChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="barcode">Barcode</Label>
                                    <Input name="barcode" value={Varient.barcode} placeholder="Product Barcode" onChange={handleVarientChange} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input name="stock" type="number" min={0} value={Varient.stock} placeholder="Product Stock" onChange={handleVarientChange} />
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
                                            <Input id="name" defaultValue={attribute.name} placeholder="Varient name" />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="value">Attribute value</Label>
                                            <Input id="value" defaultValue={attribute.value} placeholder="Varient value" />
                                        </div>
                                    </div>
                                ))}
                                <div className="flex flex-col gap-4 w-full">
                                    <Input 
                                        name="varientImage"
                                        type="file"
                                        multiple
                                        onChange={handleVarientImageChange}
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
                                
                            </div>
                            <div>
                                <Button className="mt-auto" onClick={addNewVarient}>+ Add Variant</Button>
                            </div>
                            {productData.variants && productData.variants.map(variant => (
                                <Accordion type="single" collapsible key={variant.id}>
                                <AccordionItem value={variant._id}>
                                  <AccordionTrigger>Variant: {variant.name}</AccordionTrigger>
                                  <AccordionContent>
                                <div className="rounded-md bg-muted border border-dotted p-4 flex flex-col gap-4" key={variant._id}>
                                    <div className="flex gap-4 w-full">
                                        <Button variant="outline" className=" mt-auto hover:text-red-500 hover:bg-red-100 ml-auto" onClick={() => handleDeleteVarient(variant._id)} ><X className="w-8 h-8 p-2" /></Button>
                                    </div>
                                    <div  className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name">Variant name</Label>
                                            <Input name="name" defaultValue={variant.name} placeholder="Variant name" />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="price">Maximum Retail Price(INR)</Label>
                                            <Input name="price" defaultValue={variant.mrp} placeholder="Variant value" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <div className="w-full">
                                            <Label htmlFor="price">Selling Price(INR)</Label>
                                            <Input name="sp" onChange={handleVarientChange} type="number" min={0} defaultValue={variant?.sp} placeholder="Type SP here..." />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="discount">Discount Percentage (%)</Label>   
                                            <Input name="discount" type="number" min={0} max={100} onChange={handleVarientChange} defaultValue={variant?.discount} placeholder="Type Discount percentage..." />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <div className="w-full">
                                            <Label htmlFor="description">Delivery Charges(INR)</Label>
                                            <Input name="deliveryCharges" type="number" min={0} max={100} onChange={handleVarientChange} value={variant.deliveryCharges} placeholder="Type COD charges..." />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="codCharges">COD Charges(INR)</Label>
                                            <Input name="codCharges" type="number" min={0} onChange={handleVarientChange} value={variant.codCharges} placeholder="Type COD charges..." />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <div className="w-full">
                                            <Label htmlFor="sku" >SKU</Label>
                                            <Input name="sku" defaultValue={variant.sku} placeholder="Type SKU here..." />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="barcode">Barcode</Label>
                                            <Input name="barcode" defaultValue={variant.barcode} placeholder="Type Barcode here..." />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="stock">Stock</Label>
                                            <Input name="stock" defaultValue={variant.stock} placeholder="Type Stock here..." />
                                        </div>
                                    </div>
                                        {variant.variantAttributes && variant.variantAttributes.map(attribute => (
                                            <div key={attribute.id} className="flex flex-col gap-4">
                                                <div className="w-full">
                                                    <Label htmlFor="name">{attribute.name}</Label>
                                                    <Input id="value" defaultValue={attribute.value} placeholder="Attribute value" />
                                                </div>
                                            </div>
                                        ))}
                                        {variant.image.length > 0 &&
                                            <div className="w-full flex gap-4">
                                                {variant.image.map((image, index) => (
                                                    <div key={index} className="w-full max-w-xs aspect-square rounded-sm bg-slate-200">
                                                        <Image src={image.url} alt="varientImage" width={1000} height={1000} className="w-full h-full object-cover rounded-sm" />
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="description">Video</Label>
                                            <Input name="video" placeholder="Type video link here..." defaultValue={variant.video} onChange={handleVarientChange} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <Label htmlFor="description">Description</Label>
                                        <ReactQuill theme="snow" defaultValue={variant?.description} placeholder="Type variant description here..." />
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
                                <Checkbox name="isPhysicalProduct" defaultChecked={productData?.additionalInfo?.isPhysicalProduct} onCheckedChange={handleChangePhysicalProduct} />
                                <Label htmlFor="physical">This is a physical product</Label>
                            </div>
                            <div className="flex gap-4">
                               <div className="w-full">
                                    <Label htmlFor="dimension">Dimension(cm)</Label>
                                    <Input name="dimension" value={productData?.additionalInfo?.dimension} placeholder="12x12x12 cm" onChange={handleChangeAdditionalInfo} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="weight">Weight(kg)</Label>
                                    <Input name="weight" value={productData?.additionalInfo?.weight} placeholder="weight (kg)" onChange={handleChangeAdditionalInfo} />
                                </div>
                                
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="material">Materials</Label>
                                    <Input name="materials" value={productData?.additionalInfo?.materials} placeholder="materials" onChange={handleChangeAdditionalInfo} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="lable">Lables</Label>
                                    <Input name="labels" value={productData?.additionalInfo?.labels} placeholder="lables" onChange={handleChangeAdditionalInfo} />
                                </div> 
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <Label htmlFor="shortDescription">Short Description</Label>
                                    {/* <Textarea name="shortDescription" value={productData?.additionalInfo?.shortDescription} placeholder="Type short description here ..." onChange={handleChangeAdditionalInfo} /> */}
                                    <ReactQuill theme="snow" value={productData?.additionalInfo?.shortDescription} onChange={handleShortDescriptionChange} placeholder="Type short description here..." />
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
                                <Select value={productData.status} onValueChange={(value) => handleStatusChange(value)}>
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
                                    options={apiData.types}
                                    selectedValues={multiselectAll.type}
                                    displayValue="name"
                                    onSelect={handleAddType}
                                    onRemove={handleRemoveType}
                                    //selectedValues={(value) => console.log(value)}
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
                                    options={apiData.categories}
                                    selectedValues={multiselectAll.category}
                                    displayValue="name"
                                    onSelect={handleAddCategory}
                                    onRemove={handleRemoveCategory}
                                    //selectedValues={(value) => console.log(value)}
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
                                    options={apiData.elements}
                                    selectedValues={multiselectAll.element}
                                    displayValue="name"
                                    onSelect={handleAddElement}
                                    onRemove={handleRemoveElement}
                                    //selectedValues={(value) => console.log(value)}
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
                                    options={apiData.brands}
                                    selectedValues={multiselectAll.brand}
                                    displayValue="name"
                                    onSelect={handleAddBrand}
                                    onRemove={handleRemoveBrand}
                                    //selectedValues={(value) => console.log(value)}
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
                                    options={apiData.models}
                                    selectedValues={multiselectAll.model}
                                    displayValue="name"
                                    onSelect={handleAddModel}
                                    onRemove={handleRemoveModel}
                                    //selectedValues={(value) => console.log(value)}
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
                                <Label htmlFor="price">Image</Label>
                                <Input type="file" name="featuredImage" onChange={handleChangeFeaturedImage} />
                            </div>
                            {(productImages.featuredImage || featuredImage) ? (
                                <div className="w-full h-full flex flex-col gap-4">
                                    {productImages.featuredImage && (
                                         <div className="w-full h-full flex ">
                                            <Image
                                                src={productImages.featuredImage?.url}
                                                alt="product featured image"
                                                width={1000}
                                                height={1000}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    )}
                                   
                                    {featuredImage && (
                                        <div className="w-full h-full flex flex-col gap-4">
                                            <Image
                                                src={featuredImage}
                                                alt="product featured image"
                                                width={1000}
                                                height={1000}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                            <Button onClick={handleUpdateFeaturedImage}>Update</Button>
                                        </div>
                                    )} 
                                </div>
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
                    <Button onClick={handleUpdateProduct}>Save Product</Button> 
                </div>
            </div>
            </>
            )}  
        </div>
    )
  }