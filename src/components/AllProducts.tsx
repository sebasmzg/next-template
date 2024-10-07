'use client';

import { GetAllProducts } from "@/app/api/products/actions";
import ProductCard from "@/ui/ProductCard";
import { Product } from "@/types/product";
import React, { useEffect, useState } from "react";



const AllProducts = () =>{
    const [products,setProducts] = useState<Product[]|null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    console.log(products)

    useEffect(()=>{
        const getData = async ()=>{
            setLoading(true)
            try {
                const products:Product[]=await GetAllProducts();
                setProducts(products)
            } catch (error) {
                console.error('Error al obtener los productos:',error)
            } finally {
                setLoading(false)
            }
        };

        getData();
    },[])
    return(
        <>
            <div>
            <h1>All Products</h1>
        </div>
        <div>
            {loading ? (
                <div>
                    Loading...
                </div>
            ):(
                <div>
                    {products?.map((product)=>{
                        return <ProductCard key={product.id} product={product}/>
                    }) }
                </div>
            )}
        </div>
        </>
        
    )
}

export default AllProducts;