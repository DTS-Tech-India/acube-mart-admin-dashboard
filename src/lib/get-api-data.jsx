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

export const types = async() => await getTypes();
export const categories = async() => await getCategories();
export const elements = async() => await getElements();
export const brands = async() => await getBrands();
export const models = async() => await getModels();
export const products = async() => await getProducts();
export const users = async() => await getUsers();
export const orders = async() => await getOrders();
export const transactions = async() => await getTransactions();

export const getApiData = async() => {
    const types = await getTypes();
    const categories = await getCategories();
    const elements = await getElements();
    const brands = await getBrands();
    const models = await getModels();
    //console.log(types, categories, elements, brands, models);
    return { types, categories, elements, brands, models };
}