async function getTypes() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/type/all`);
    const data = await res.json();

    return data.data;
}

async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`);
    const data = await res.json();
    return data.data;
}

async function getElements() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/element/all`);
    const data = await res.json();
    return data.data;
}

async function getBrands() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/all`);
    const data = await res.json();
    return data.data;
}

async function getModels() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/model/all`);
    const data = await res.json();
    return data.data;
}

async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/all`);
    const data = await res.json();
    return data.data;
}

const PRODUCT_ID_PATTERN = /^[a-f\d]{24}$/i;
let relationshipSourcesEndpointUnavailable = false;

const readJson = async (response) => {
    try {
        return await response.json();
    } catch {
        return {};
    }
};

const normalizeRelationshipSources = (products, excludeId) =>
    (Array.isArray(products) ? products : [])
        .filter((product) => product?._id && product._id !== excludeId)
        .map((product) => ({
            ...product,
            type: Array.isArray(product.type) ? product.type.filter(Boolean) : [],
            category: Array.isArray(product.category) ? product.category.filter(Boolean) : [],
            element: Array.isArray(product.element) ? product.element.filter(Boolean) : [],
            brand: Array.isArray(product.brand) ? product.brand.filter(Boolean) : [],
            model: Array.isArray(product.model) ? product.model.filter(Boolean) : [],
        }));

const getProductRelationshipSourcesFallback = async (query, excludeId) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const isProductId = PRODUCT_ID_PATTERN.test(query);
    const res = isProductId
        ? await fetch(`${baseUrl}/api/product/${encodeURIComponent(query)}`)
        : await fetch(`${baseUrl}/api/product/search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchQuery: query }),
        });
    const data = await readJson(res);

    if (res.status === 404 && isProductId) return [];
    if (!res.ok) {
        throw new Error(data.message || `Unable to search products (${res.status})`);
    }

    return normalizeRelationshipSources(
        isProductId ? [data.data] : data.data,
        excludeId
    ).slice(0, 15);
};

async function getProductRelationshipSources(query, excludeId) {
    if (relationshipSourcesEndpointUnavailable) {
        return getProductRelationshipSourcesFallback(query, excludeId);
    }

    const params = new URLSearchParams({
        query,
        limit: "15",
    });
    if (excludeId) {
        params.set("excludeId", excludeId);
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/relationship-sources?${params.toString()}`
    );
    const data = await readJson(res);

    if (!res.ok) {
        const endpointIsMissing =
            res.status === 404 ||
            (res.status === 500 &&
                String(data.message || "").includes('value "relationship-sources"'));

        if (endpointIsMissing) {
            relationshipSourcesEndpointUnavailable = true;
            return getProductRelationshipSourcesFallback(query, excludeId);
        }

        throw new Error(data.message || `Unable to search products (${res.status})`);
    }

    return normalizeRelationshipSources(data.data, excludeId);
}

async function getUsers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all`);
    const data = await res.json();
    return data.data;
}

async function getOrders() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/all`);
    const data = await res.json();
    return data.data;
}

async function getTransactions() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/all`);
    const data = await res.json();
    return data.data;
}

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
}

export const types = async() => await getTypes();
export const categories = async() => await getCategories();
export const elements = async() => await getElements();
export const brands = async() => await getBrands();
export const models = async() => await getModels();
export const products = async() => await getProducts();
export const productRelationshipSources = async(query, excludeId) =>
    await getProductRelationshipSources(query, excludeId);
export const users = async() => await getUsers();
export const orders = async() => await getOrders();
export const transactions = async() => await getTransactions();

export const getApiDataByQuery = async(url) => await getData(url);

export const getApiData = async() => {
    const types = await getTypes();
    const categories = await getCategories();
    const elements = await getElements();
    const brands = await getBrands();
    const models = await getModels();
    //console.log(types, categories, elements, brands, models);
    return { types, categories, elements, brands, models };
}
