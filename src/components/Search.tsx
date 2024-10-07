import SearchModal from "@/ui/SearchModal";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

// Estilos del ícono de búsqueda
const SearchIconWrapper = styled.div`
  cursor: pointer;
  font-size: 26px;
`;

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchIconWrapper onClick={openModal}>
        <FaSearch />
      </SearchIconWrapper>
      <SearchModal isVisible={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Search;
