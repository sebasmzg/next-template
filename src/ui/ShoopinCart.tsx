import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import styled from "styled-components";

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
  return (
    <ButtonWrapper>
      <Badge>6</Badge>
      <Icon />
    </ButtonWrapper>
  );
};

export default ShoppingCartButton;
