import { CheckoutProduct } from "@/types/product";

export async function GetAllCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  const categories = await res.json();
  if (!res.ok) {
    throw new Error(categories.message || 'Error al obtener las categorías.');
  }
  return categories;
}

export async function GetAllProducts(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const products = await res.json();
  if (!res.ok) {
    throw new Error(products.message || 'Error al obtener los productos.');
  }
  return products;
}

export async function GetProductId(id: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const product = await res.json();
  if (!res.ok) {
    throw new Error(product.message || 'Error al obtener el id del producto.');
  }
  return product;
}

export async function LikeProduct(id:string,token:string){
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/products/${id}/like`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
      );
      const product = await res.json();
      if (!res.ok) {
        throw new Error(product.message || 'Error al obtener el id del producto.');
      }
      return product;
}

export async function DisLikeProduct(id: string, token: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/products/${id}/like`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    const product = await res.json();
    if (!res.ok) {
        throw new Error(product.message || 'Error al obtener el id del producto.');
    }
    return product;
}

export async function ProductsCheckout(products:CheckoutProduct[],priceTotal:number,totalItems:number, token: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/checkout`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ products,totalItems,priceTotal })
            
        }
        
    );
    const checkout = await res.json();
    if (!res.ok) {
        throw new Error(checkout.message || 'Error al hacer pago de productos.');
    }
    return checkout;
}