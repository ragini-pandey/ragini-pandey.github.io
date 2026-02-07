import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';

import { Bio } from '../../data/constants';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent';
import { SocialMediaIcons, SocialMediaIcon } from './../Footer/index';

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
      <Component href="#opensource" onClick={toggleMenu}>Open source</Component>
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
          <SocialMediaIcons>
            <SocialMediaIcon href={Bio.github} target="display">
              <GitHubIcon />
            </SocialMediaIcon>
            <SocialMediaIcon href={Bio.linkedin} target="display">
              <LinkedInIcon />
            </SocialMediaIcon>
          </SocialMediaIcons>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu>
            {renderNavLinks(MobileLink)}
            <SocialMediaIcons>
              <SocialMediaIcon href={Bio.github} target="display">
                <GitHubIcon />
              </SocialMediaIcon>
              <SocialMediaIcon href={Bio.linkedin} target="display">
                <LinkedInIcon />
              </SocialMediaIcon>
            </SocialMediaIcons>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
