import React from 'react';
import Styled from 'styled-components';

const NavBarWrapper = Styled.div`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Logo = Styled.img`
  max-width: 45px;
`;

const LinkItems = Styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
`;

const LinkItem = Styled.a`
  text-decoration: none;
  &:hover{
    color: pink;
    text-decoration: underline;
  }
`;

const NavBar = () => (
  <NavBarWrapper role='navigation'>
    <a href="/" data-testid="company-logo">
      <Logo src="/logo192.png" alt="Company Logo" />
    </a>

    <LinkItems>
      <LinkItem href="/"> Home </LinkItem>
      <LinkItem href="/project"> Project </LinkItem>
      <LinkItem href="/blog"> Blog </LinkItem>
      <LinkItem href="/about"> About </LinkItem>
    </LinkItems>

  </NavBarWrapper>
);

export default NavBar;