import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { themes } from '../../../utils/Themes';
import { Bio } from '../../../data/constants';
import Navbar from '../index';

const theme = themes.midnight;

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('Navbar', () => {
  test('renders the Portfolio brand name', () => {
    renderNavbar();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  test('renders all main navigation links', () => {
    renderNavbar();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Open source')).toBeInTheDocument();
  });

  test('renders GitHub social link pointing to Bio.github', () => {
    renderNavbar();
    const githubLinks = screen.getAllByRole('link', { name: /github profile/i });
    expect(githubLinks[0]).toHaveAttribute('href', Bio.github);
  });

  test('renders LinkedIn social link pointing to Bio.linkedin', () => {
    renderNavbar();
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin profile/i });
    expect(linkedinLinks[0]).toHaveAttribute('href', Bio.linkedin);
  });

  test('mobile menu shows duplicate links after hamburger click', () => {
    const { container } = renderNavbar();

    // Before toggle: only desktop nav links exist
    expect(screen.getAllByText('About').length).toBe(1);

    // The hamburger icon (FaBars SVG) is the 2nd svg in the tree (1st is logo DiCssdeck)
    const svgs = container.querySelectorAll('svg');
    fireEvent.click(svgs[1].parentElement);

    // After toggle: MobileMenu renders additional copies of each link
    expect(screen.getAllByText('About').length).toBeGreaterThan(1);
  });
});
