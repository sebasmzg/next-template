import React from 'react';
import {useSelector} from 'react-redux';
import {useSession} from 'next-auth/react';
import {ProductsCheckout} from '@/app/api/products/actions';
import {RootState} from '../../redux/store';
import { CheckoutProduct } from '@/types/product'; 

interface PaymentButtonProps {
  items: CheckoutProduct[]; 
}

const PaymentButton: React.FC<PaymentButtonProps> = ({items}) => {
  const {data: session} = useSession();

  const products = useSelector((state: RootState) => state.cart.items);


  const checkoutData = {
    products: products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      price: product.price,
    })) as CheckoutProduct[],
  };

  const totalItems = products.length;
  const priceTotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!session) {
      alert('Please log in to proceed with the checkout.');
      return;
    }

    const token = session.user.access_token.access_token as string;

    try {
      const response = await ProductsCheckout(
          checkoutData.products,
          priceTotal,
          totalItems, 
        token
      );
      alert('Checkout successful!');
    } catch (error) {
      alert('Error during checkout. Please try again.');
      console.log('Error at checkout:', error);
    }
  };

  return <button onClick={handleCheckout}>Pay</button>;
};

export default PaymentButton;
