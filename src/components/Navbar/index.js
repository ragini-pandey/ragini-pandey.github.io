import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';

import { Bio } from '../../data/constants';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const renderNavLinks = (Component) => (
    <>
      <Component href="#about" onClick={toggleMenu}>About</Component>
      <Component href="#skills" onClick={toggleMenu}>Skills</Component>
      <Component href="#experience" onClick={toggleMenu}>Experience</Component>
      <Component href="#projects" onClick={toggleMenu}>Projects</Component>
      <Component href="#education" onClick={toggleMenu}>Education</Component>
    </>
  );

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <a href="#" style={{ display: "flex", alignItems: "center", color: "white", cursor: 'pointer' }}>
            <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
          </a>
        </NavLogo>
        <MobileIcon onClick={toggleMenu}>
          <FaBars />
        </MobileIcon>
        <NavItems>
          {renderNavLinks(NavLink)}
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu>
            {renderNavLinks(MobileLink)}
            <GitHubButton
              style={{
                padding: '10px 16px',
                background: theme.primary,
                color: 'white',
                width: 'max-content'
              }}
              href={Bio.github}
              target="_blank"
            >
              Github Profile
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
