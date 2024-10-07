'use client';

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingBag, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import LikeButton from "./LikeButton";
import styled from "styled-components";

type Props = {
    product: Product;
};

// Styled Components
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 15px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 15px;
`;

const ProductTitle = styled.h1`
  font-size: 1.25rem;
  margin: 10px 0;
  text-align: center;
  color: #333;
`;

const ProductCategory = styled.p`
  font-size: 0.875rem;
  color: #666;
`;

const ProductPrice = styled.h2`
  font-size: 1.5rem;
  color: #000;
  margin-bottom: 10px;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  background-color: #f0c14b;
  border: 1px solid #a88734;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ddb347;
  }
`;

// Component
const ProductCard = ({ product }: Props) => {
    const num = Math.round(product.rating.rate);
    const ratingArray = new Array(num).fill(0);

    const dispatch = useDispatch();
    const addToCartHandler = (product: Product) => {
        dispatch(addItem(product));
    };

    return (
        <CardContainer>
            <ImageContainer>
                <Image src={product.image} alt={product.title} width={100} height={100} />
            </ImageContainer>
            <ProductCategory>{product.category}</ProductCategory>
            <Link href={`/secret/product-details/${product.id}`}>
                <ProductTitle>{product.title}</ProductTitle>
            </Link>
            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            <RatingContainer>
                {ratingArray.map(() => (
                    <FaStar key={Math.random() * 1000} size={16} fill="yellow" />
                ))}
            </RatingContainer>
            <ButtonContainer>
                <AddToCartButton onClick={() => addToCartHandler(product)}>
                    <FaShoppingBag />
                    Add to Cart
                </AddToCartButton>
                <LikeButton productId={product.id.toString()} />
            </ButtonContainer>
        </CardContainer>
    );
};

export default ProductCard;
