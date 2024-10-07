'use client';

import styled from 'styled-components';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import {FaSearch, FaHeart, FaShoppingCart, FaSignOutAlt} from 'react-icons/fa';
import ShoppingCartButton from '@/ui/ShoopinCart';
import Search from './Search';

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

const StyledLink = styled(Link)<{$active: boolean}>`
  color: ${({$active}) => ($active ? '#000' : '#555')};
  font-weight: ${({$active}) => ($active ? 'bold' : 'normal')};
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition:
    color 0.3s,
    border-bottom 0.3s;

  &:hover {
    color: #000;
  }

  ${({$active}) =>
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
const IconsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;
const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #000;
  font-size: 1.5rem;

  &:hover {
    color: #555; /* Cambia de color cuando pasas el cursor */
  }
`;

const Navbar = () => {
  const {data: session} = useSession();
  const pathname = usePathname();

  return (
    <NavbarWrapper>
      <Container>
        {session?.user ? (
          <>
            <NavLinks>
              <StyledLink href={'/'} $active={pathname === '/'}>
                Home
              </StyledLink>
              <StyledLink
                href={'/secret'}
                $active={pathname === '/secret'}
              >
                Secret
              </StyledLink>
            </NavLinks>
            <IconsWrapper>
              <LocaleSwitcher />
              <IconButton aria-label="Search">
                <Search />
              </IconButton>
              <IconButton aria-label="Favorites">
                <FaHeart cursor={'pointer'} size={26} />
              </IconButton>
              <IconButton aria-label="Cart">
                <ShoppingCartButton />
              </IconButton>
              <SignoutButton type="button" onClick={() => signOut()}>
                <FaSignOutAlt cursor={'pointer'} size={26} />
              </SignoutButton>
            </IconsWrapper>
          </>
        ) : (
          <>
            <NavLinks>
              <StyledLink href={'/'} $active={pathname === '/'}>
                Home
              </StyledLink>
            </NavLinks>
            <div>
              <NavLinks>
                <LocaleSwitcher />
                <StyledLink
                  href={'/login'}
                  $active={pathname === '/login'}
                >
                  Login
                </StyledLink>
                <StyledLink
                  href={'/register'}
                  $active={pathname === '/register'}
                >
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
