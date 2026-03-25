import '@testing-library/jest-dom';

// ── TextEncoder / TextDecoder ───────────────────────────────────────
// react-router v7 requires these Web APIs; jsdom 11 (bundled with
// react-scripts / Jest 27) does not expose the Node.js built-ins.
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// ── window.matchMedia ───────────────────────────────────────────────
// jsdom does not implement matchMedia; many MUI / styled-components
// responsive helpers depend on it.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// ── IntersectionObserver ────────────────────────────────────────────
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserverMock;

// ── ResizeObserver ──────────────────────────────────────────────────
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock;
