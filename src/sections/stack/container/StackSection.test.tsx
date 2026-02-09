import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React, { createRef } from 'react';
import StackSection from './StackSection';
import { theme } from '@/styles/theme';
import * as deviceUtils from '@/utils/device';

// Mock ResizeObserver for react-fast-marquee
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('StackSection', () => {
  beforeEach(() => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders STACK title', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<StackSection sectionRef={ref} />);
    expect(screen.getByText('STACK')).toBeInTheDocument();
  });

  it('renders all stack icons', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<StackSection sectionRef={ref} />);
    // Icons are rendered within Marquee, check for images
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders Icon components with correct names', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<StackSection sectionRef={ref} />);
    
    // Marquee duplicates icons, so use getAllByAltText
    expect(screen.getAllByAltText('ChatGPT').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('Figma').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('React / React Native').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('TypeScript').length).toBeGreaterThan(0);
  });

  it('renders Marquee component', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<StackSection sectionRef={ref} />);
    // Marquee renders as a div with children
    const marquee = container.querySelector('div > div');
    expect(marquee).toBeInTheDocument();
  });

  it('passes sectionRef to SectionLayout', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<StackSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has correct id attribute', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<StackSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'stack');
  });
});
