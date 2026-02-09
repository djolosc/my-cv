import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React, { createRef } from 'react';
import HomeSection from './HomeSection';
import { theme } from '@/styles/theme';
import { CursorProvider } from '@/shared/context/CursorContext';
import * as deviceUtils from '@/utils/device';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CursorProvider>{component}</CursorProvider>
    </ThemeProvider>
  );
};

describe('HomeSection', () => {
  beforeEach(() => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders EST. 1992 text', () => {
    const ref = createRef<HTMLElement>();
    renderWithProviders(<HomeSection sectionRef={ref} />);
    expect(screen.getByText('EST. 1992')).toBeInTheDocument();
  });

  it('renders Clock component', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithProviders(<HomeSection sectionRef={ref} />);
    const clock = container.querySelector('svg');
    expect(clock).toBeInTheDocument();
  });

  it('renders ProfilePic component', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithProviders(<HomeSection sectionRef={ref} />);
    const profileImg = container.querySelector('img[alt="My Logo"]');
    expect(profileImg).toBeInTheDocument();
  });

  it('renders name', () => {
    const ref = createRef<HTMLElement>();
    renderWithProviders(<HomeSection sectionRef={ref} />);
    expect(screen.getByText('Djordje Simovic')).toBeInTheDocument();
  });

  it('renders role', () => {
    const ref = createRef<HTMLElement>();
    renderWithProviders(<HomeSection sectionRef={ref} />);
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
  });

  it('renders about text', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithProviders(<HomeSection sectionRef={ref} />);
    expect(container.textContent).toMatch(/Hey.*Djordje/);
    expect(container.textContent).toContain("Belgrade, Serbia");
  });

  it('renders CompanyName component', () => {
    const ref = createRef<HTMLElement>();
    renderWithProviders(<HomeSection sectionRef={ref} />);
    expect(screen.getByText('Clarivate')).toBeInTheDocument();
  });

  it('renders DownloadRow component', () => {
    const ref = createRef<HTMLElement>();
    renderWithProviders(<HomeSection sectionRef={ref} />);
    expect(screen.getByText(/Press/)).toBeInTheDocument();
  });

  it('adds line break on mobile', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(false);
    const ref = createRef<HTMLElement>();
    const { container } = renderWithProviders(<HomeSection sectionRef={ref} />);
    const br = container.querySelector('br');
    expect(br).toBeInTheDocument();
  });

  it('does not add line break on desktop', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(true);
    const ref = createRef<HTMLElement>();
    const { container } = renderWithProviders(<HomeSection sectionRef={ref} />);
    const br = container.querySelector('br');
    expect(br).not.toBeInTheDocument();
  });

  it('passes sectionRef to SectionLayout', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithProviders(<HomeSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has correct id attribute', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithProviders(<HomeSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'home');
  });
});
