'use client';

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import AddToCart from "@/ui/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";

type Props ={
    product:Product;
}

const ProductCard = ({product}:Props)=>{
    const num = Math.round(product.rating.rate)
    const ratingArray = new Array(num).fill(0)
    const items = useSelector((state:RootState)=>state.cart.items);
    const dispatch = useDispatch();
    const addToCartHandler = (product: Product)=>{
        dispatch(addItem(product));
    }
    return(
        <div>
            <div>
                <Image src={product.image} alt={product.title} width={100} height={100}/>
            </div>
            <p>{product.category}</p>
            <Link href={`/secret/product-details/${product.id}`}>
            <h1>{product.title}</h1>
            </Link>
            <h2>{product.price}</h2>
            <div>
                {ratingArray.map((star)=>{
                    return <FaStar key={Math.random()*1000} size={16} fill="yellow"/>
                })}
            </div>
            <div>
                <button onClick={()=>addToCartHandler(product)}>
                    <FaShoppingBag />
                </button>
                <button>
                    <FaHeart />
                </button>
            </div>
        </div>
    )
}

export default ProductCard;