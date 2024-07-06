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


export default async function getApiData() {
    const types = await getTypes();
    const categories = await getCategories();
    const elements = await getElements();
    const brands = await getBrands();
    const models = await getModels();
    const products = await getProducts();
    const users = await getUsers();
    const orders = await getOrders();
    const transactions = await getTransactions();
    //console.log(types, categories, elements, brands, models);
    return { types, categories, elements, brands, models, products, users, orders, transactions };
}