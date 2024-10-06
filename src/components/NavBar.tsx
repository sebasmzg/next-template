"use client";

import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

// Estilos de Navbar usando styled-components
const NavbarWrapper = styled.nav`
  background-color: #fff; /* Fondo blanco */
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? "#000" : "#555")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")}; 
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s, border-bottom 0.3s;
  
  &:hover {
    color: #000; 
  }

  ${({ $active }) =>
    $active &&
    `
    border-bottom: 2px solid #000; 
  `}
`;

const SignoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #000;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;

  &:hover {
    color: #555;
  }
`;

const Navbar = () => {
  const locale = useLocale();
  const { data: session } = useSession();
  const pathname = usePathname(); // Obtiene la ruta actual

  return (
    <NavbarWrapper>
      <Container>
        {session?.user ? (
          <>
            <NavLinks>
              <StyledLink href={locale + "/"} $active={pathname === "/"}>
                Home
              </StyledLink>
              <StyledLink href={locale + "/secret"} $active={pathname === "/secret"}>
                Secret
              </StyledLink>
            </NavLinks>
            <div>
              <SignoutButton type="button" onClick={() => signOut()}>Signout</SignoutButton>
            </div>
          </>
        ) : (
          <>
            <NavLinks>
              <StyledLink href={locale + "/"} $active={pathname === "/"}>
                Home
              </StyledLink>
            </NavLinks>
            <div>
              <NavLinks>
                <LocaleSwitcher />
                <StyledLink href={locale + "/login"} $active={pathname === "/login"}>
                  Login
                </StyledLink>
                <StyledLink href={locale + "/register"} $active={pathname === "/register"}>
                  Register
                </StyledLink>
              </NavLinks>
            </div>
          </>
        )}
      </Container>
    </NavbarWrapper>
  );
};

export default Navbar;
