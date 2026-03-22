import { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { themes } from './utils/Themes.js'
import { ACTIVE_THEME } from './data/constants';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import OpenSource from "./components/OpenSource";
import ProjectDetails from "./components/ProjectDetails";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: ${({ theme }) => theme.bg};
    --bg-light: ${({ theme }) => theme.bgLight};
    --primary: ${({ theme }) => theme.primary};
    --text-primary: ${({ theme }) => theme.text_primary};
    --text-secondary: ${({ theme }) => theme.text_secondary};
    --card: ${({ theme }) => theme.card};
    --card-light: ${({ theme }) => theme.card_light};
    --button: ${({ theme }) => theme.button};
    --white: ${({ theme }) => theme.white};
    --black: ${({ theme }) => theme.black};
  }
`;

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, ${({ theme }) => theme.primary}26 0%, transparent 50%), linear-gradient(141.27deg, transparent 50%, ${({ theme }) => theme.primary}26 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`

const activeTheme = themes[ACTIVE_THEME] || themes.ocean;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={activeTheme}>
      <GlobalStyle />
      <Router >
        <Navbar />
        <Body>
          <HeroSection />
          <Wrapper>
            <Skills />
            <Experience />
          </Wrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <OpenSource />
          <Wrapper>
            <Education />
            {/* <Contact /> */}
          </Wrapper>
          <Footer />
          {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
