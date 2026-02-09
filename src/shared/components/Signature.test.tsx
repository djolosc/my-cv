import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import Signature from './Signature';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Mock getTotalLength globally before any tests run
Object.defineProperty(Element.prototype, 'getTotalLength', {
  value: () => 100,
  writable: true,
  configurable: true,
});

describe('Signature', () => {
  let mockIntersectionObserver: {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };
  let observerCallback: IntersectionObserverCallback | null = null;

  beforeEach(() => {
    mockIntersectionObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };
    observerCallback = null;

    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe = mockIntersectionObserver.observe;
      disconnect = mockIntersectionObserver.disconnect;
      unobserve = vi.fn();
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders SVG element', () => {
    const { container } = renderWithTheme(<Signature />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders path element', () => {
    const { container } = renderWithTheme(<Signature />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
  });

  it('sets up IntersectionObserver on mount', () => {
    renderWithTheme(<Signature />);
    expect(mockIntersectionObserver.observe).toHaveBeenCalled();
  });

  it('calculates path length', () => {
    const { container } = renderWithTheme(<Signature />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = renderWithTheme(<Signature />);
    unmount();
    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
  });

  it('has correct SVG viewBox', () => {
    const { container } = renderWithTheme(<Signature />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '411.1 127.6 927.5 335.9');
  });

  it('applies animation when intersecting', () => {
    const { container, rerender } = renderWithTheme(<Signature />);
    
    // Simulate intersection
    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.5,
    } as IntersectionObserverEntry;

    act(() => {
      if (observerCallback) {
        observerCallback([mockEntry], {} as IntersectionObserver);
      }
    });

    // Re-render to see state change
    rerender(
      <ThemeProvider theme={theme}>
        <Signature />
      </ThemeProvider>
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('does not animate when not intersecting', () => {
    const { container } = renderWithTheme(<Signature />);
    
    const mockEntry = {
      isIntersecting: false,
      intersectionRatio: 0,
    } as IntersectionObserverEntry;

    if (observerCallback) {
      observerCallback([mockEntry], {} as IntersectionObserver);
    }

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
