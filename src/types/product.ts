export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
    isLiked: boolean;
};

export interface CheckoutProduct {
    products: CheckoutProduct[],
    id: number;
    quantity: number;
    price: number;
}