import React from 'react';
import Styled from 'styled-components';

const NavBarWrapper = Styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Logo = Styled.img`
  max-width: 50px;
`;

const LinkItems = Styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
`;

const NavBar = () => (
  <NavBarWrapper role='navigation'>
    <a href="/" data-testid="company-logo">
      <Logo src="/logo192.png" alt="Company Logo" />
    </a>

    <LinkItems>
      <li>
        <a href="/"> Home </a>
      </li>
      <li>
        <a href="/about"> About </a>
      </li>
      <li>
        <a href="/contact"> Contact </a>
      </li>
      <li>
        <a href="/search"> Search </a>
      </li>
    </LinkItems>

  </NavBarWrapper>
);

export default NavBar;