import React from "react";
import styled from "styled-components";
import { GetAllCategories } from "@/app/api/products/actions";

// Estilos para los botones de categoría
const CategoryButton = styled.button`
  background-color: #007bff; /* Color de fondo */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #80bdff;
  }
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Category = async () => {
  const categories: string[] = await GetAllCategories();
  console.log(categories);

  return (
    <div>
      <h1>Categories</h1>
      <CategoriesWrapper>
        {categories.map((category) => (
          <CategoryButton key={category}>{category}</CategoryButton>
        ))}
      </CategoriesWrapper>
    </div>
  );
};

export default Category;
