import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React, { createRef } from 'react';
import PersonalSection from './PersonalSection';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('PersonalSection', () => {
  it('renders PERSONAL title', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<PersonalSection sectionRef={ref} />);
    expect(screen.getByText('PERSONAL')).toBeInTheDocument();
  });

  it('renders personal text', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<PersonalSection sectionRef={ref} />);
    expect(screen.getByText(/In my free time/)).toBeInTheDocument();
    expect(screen.getByText(/traveling, reading/)).toBeInTheDocument();
  });

  it('renders SpotifyTrackCard component', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<PersonalSection sectionRef={ref} />);
    expect(screen.getByText('Aperture')).toBeInTheDocument();
    expect(screen.getByText('Harry Styles')).toBeInTheDocument();
  });

  it('renders PhotoStack component', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<PersonalSection sectionRef={ref} />);
    const images = container.querySelectorAll('img[alt^="photo"]');
    expect(images.length).toBeGreaterThan(0);
  });

  it('passes sectionRef to SectionLayout', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<PersonalSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has correct id attribute', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<PersonalSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'personal');
  });
});
