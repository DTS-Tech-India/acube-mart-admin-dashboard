async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/all`);
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
}

export default async function ProductsList() {
    const products = await getProducts();
    //console.log(products)
    return products;
}