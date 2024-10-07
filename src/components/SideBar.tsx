import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from 'next/image';
import { addItem, removeItem } from "../../redux/cartSlice";
import { Product } from "@/types/product";
import PaymentButton from "@/ui/PaymentButton";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 20px;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
`;

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: visibility 0s, opacity 0.3s linear;
  z-index: 999;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Item = styled.li`
  margin-bottom: 10px;
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Props ={
    items:Product[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const items = useSelector((state: RootState) => state.cart.items);

    const dispatch = useDispatch();

    const addToCart = (item: Product)=>{
        dispatch(addItem(item));
    }
    const removeFromCart = (id: number)=>{
        dispatch(removeItem({id}));
    }

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}>
        <h2>Your Cart</h2>
        <ItemList>
          {items.map((item) => (
            <Item key={item.id}>
                <div>
                <Image src={item.image} alt={item.title} width={100} height={100} />
                </div>
                <div>
                <p>{item.title} - Quantity: {item.quantity}</p>
                <p>Price - {item.price}</p>
                </div>
                <button onClick={()=>addToCart(item)}>Add</button>
                <button onClick={()=>removeFromCart(item.id)}>Remove</button>
            </Item>
          ))}
        </ItemList>
        <PaymentButton items={[]} />
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
