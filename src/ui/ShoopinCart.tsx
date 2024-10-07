import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import Sidebar from "@/components/SideBar"; 

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Badge = styled.span`
  position: absolute;
  top: -12px;
  right: -12px;
  width: 24px;
  height: 24px;
  background-color: #f56565;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  border-radius: 50%;
`;

const Icon = styled(FaShoppingBag)`
  cursor: pointer;
  font-size: 26px;
`;

const ShoppingCartButton = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <ButtonWrapper onClick={handleToggleSidebar}>
        <Badge>{totalQuantity}</Badge>
        <Icon />
      </ButtonWrapper>
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </>
  );
};

export default ShoppingCartButton;
