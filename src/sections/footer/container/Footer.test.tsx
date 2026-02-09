import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import Footer from './Footer';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Mock getTotalLength for SVGPathElement
Object.defineProperty(Element.prototype, 'getTotalLength', {
  value: () => 100,
  writable: true,
  configurable: true,
});

describe('Footer', () => {
  let mockIntersectionObserver: {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockIntersectionObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };

    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe = mockIntersectionObserver.observe;
      disconnect = mockIntersectionObserver.disconnect;
      unobserve = vi.fn();
    } as unknown as typeof IntersectionObserver;
  });

  it('renders Signature component', () => {
    const { container } = renderWithTheme(<Footer />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders "made with love" text', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('made with love')).toBeInTheDocument();
  });
});
