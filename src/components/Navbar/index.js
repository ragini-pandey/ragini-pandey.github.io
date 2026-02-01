import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';

import { Bio } from '../../data/constants';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent';
import { SocialMediaIcons, SocialMediaIcon } from './../Footer/index';

const BuyMeCoffeeButton = styled.a`
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-top: 8px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  img {
    height: 32px;
    width: auto;
  }
  @media (max-width: 768px) {
    margin: 16px 0 0 0;
    justify-content: center;
    img {
      height: 36px;
    }
  }
`;

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
          <SocialMediaIcons>
            <SocialMediaIcon href={Bio.github} target="display">
              <GitHubIcon />
            </SocialMediaIcon>
            <SocialMediaIcon href={Bio.linkedin} target="display">
              <LinkedInIcon />
            </SocialMediaIcon>
          </SocialMediaIcons>
          <BuyMeCoffeeButton 
            href="https://www.buymeacoffee.com/ragini.pandey" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
              alt="Buy Me A Coffee" 
            />
          </BuyMeCoffeeButton>
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
            <BuyMeCoffeeButton 
              href="https://www.buymeacoffee.com/ragini.pandey" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                alt="Buy Me A Coffee" 
              />
            </BuyMeCoffeeButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
