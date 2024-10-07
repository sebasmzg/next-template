import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

// Estilos de la Modal y Overlay
const ModalOverlay = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro traslúcido */
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 300px; /* Modal pequeña */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #000;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  text-decoration: underline;

  &:hover {
    color: #555;
  }
`;

const SearchModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const handleSearch = () => {
    console.log("Searching...");
    onClose();
  };

  return (
    <ModalOverlay $isVisible={isVisible}>
      <ModalWrapper>
        <h3>Search</h3>
        <Input type="text" placeholder="Search..." />
        <Button onClick={handleSearch}>Search</Button>
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default SearchModal;
