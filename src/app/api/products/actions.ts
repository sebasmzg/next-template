export async function GetAllCategories(){
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const categories = await res.json()
    if (!res.ok) {
        throw new Error(categories.message || 'Error al obtener las categorías.');
    }
    return categories
}

export async function GetAllProducts(){
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json()
    if(!res.ok){
        throw new Error(products.message || 'Error al obtener los productos.');
    }
    return products
}

export async function GetProductId(id:string){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json()
    if(!res.ok){
        throw new Error(product.message || 'Error al obtener el id del producto.');
    }
    return product
}

export async function GetProductByCategory(category:string){
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const products = await res.json()
    if(!res.ok){
        throw new Error(products.message || 'Error al obtener el id del producto.');
    }
    return products
}