import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import App from '../App';

// Mock the GitHub PR fetch hooks so tests don't hit the network
vi.mock('../hooks/useGithubPRs', () => ({
  useTotalMergedPRs: () => ({ totalMergedPRs: 42, loading: false, error: null }),
  useOpenSourcePRs: () => ({ prData: [], totalMergedPRs: 0, loading: false, error: null }),
}));

// Suppress styled-components / MUI prop warnings in test output
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  test('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  test('renders top-level navigation', () => {
    render(<App />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  test('renders hero section with name', () => {
    render(<App />);
    // Bio.name appears in the hero title
    expect(screen.getByText(/Ragini Pandey/i)).toBeInTheDocument();
  });
});
