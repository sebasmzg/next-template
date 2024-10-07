'use client';

import { GetProductId } from "@/app/api/products/actions";
import AddToCart from "@/ui/AddToCart";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ProductByIdProps {
    id: string;
}

// Styled Components
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StarIcon = styled.span`
  color: #ffc107;
  margin-right: 5px;
`;

const LoadingMessage = styled.div`
  font-size: 1.25rem;
  text-align: center;
  margin-top: 50px;
`;

const NoProductMessage = styled.div`
  font-size: 1.25rem;
  text-align: center;
  margin-top: 50px;
`;

const ProductById: React.FC<ProductByIdProps> = ({ id }) => {
    const { data: session } = useSession();
    const [singleProduct, setSingleProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (session) {
                const token = session.user.access_token.access_token as string;
                const product = await GetProductId(id, token);
                setSingleProduct(product);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, session]);

    if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
    if (!singleProduct) return <NoProductMessage>No product found</NoProductMessage>;

    const num = Math.round(singleProduct.rating.rate);
    const starArray = new Array(num).fill(0);

    return (
        <ProductContainer>
            <ProductTitle>{singleProduct.title}</ProductTitle>
            <ProductImage src={singleProduct.image} alt={singleProduct.title} />
            <ProductDescription>{singleProduct.description}</ProductDescription>
            <ProductPrice>Price: ${singleProduct.price}</ProductPrice>
            <AddToCart />
            <StarRating>
                {starArray.map((_, index) => (
                    <StarIcon key={index}>
                        <FaStar />
                    </StarIcon>
                ))}
            </StarRating>
        </ProductContainer>
    );
};

export default ProductById;
