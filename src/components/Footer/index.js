import { useEffect } from "react";
import styled from "styled-components";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import CodeIcon from '@mui/icons-material/Code';

import { Bio } from "../../data/constants";

const BuyMeCoffeeContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  a {
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
    img {
      height: 45px;
      width: auto;
      border-radius: 8px;
    }
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  //background: linear-gradient(100.26deg, rgba(0, 102, 255, 0.05) 42.33%, rgba(150, 0, 225, 0.05) 127.07%);
`;

const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.h1`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
`;

function Footer() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.setAttribute("data-name", "bmc-button");
    script.setAttribute("data-slug", "ragini.pandey");
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-emoji", "☕");
    script.setAttribute("data-font", "Cookie");
    script.setAttribute("data-text", "Buy me a coffee");
    script.setAttribute("data-outline-color", "#000000");
    script.setAttribute("data-font-color", "#000000");
    script.setAttribute("data-coffee-color", "#ffffff");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <FooterContainer>
      <FooterWrapper>
        {/* <Logo>Ragini Pandey</Logo> */}
        {/* <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
        </Nav> */}
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.twitter} target="display">
            <TwitterIcon />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="display">
            <LinkedInIcon />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="display">
            <InstagramIcon />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.leetcode} target="display">
            <CodeIcon />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <BuyMeCoffeeContainer>
          <a
            href="https://www.buymeacoffee.com/ragini.pandey"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
            />
          </a>
        </BuyMeCoffeeContainer>
        {/* <Copyright>
          &copy; {new Date().getFullYear()} Ragini Pandey. All rights reserved
        </Copyright> */}
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
