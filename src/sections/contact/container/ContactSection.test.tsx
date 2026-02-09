import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React, { createRef } from 'react';
import ContactSection from './ContactSection';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ContactSection', () => {
  it('renders CONTACT title', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ContactSection sectionRef={ref} />);
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  it('renders all contact links', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ContactSection sectionRef={ref} />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('renders link names', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ContactSection sectionRef={ref} />);
    
    expect(screen.getByText('djsimovic@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('@djolosc')).toBeInTheDocument();
    expect(screen.getByText('@djsimovic')).toBeInTheDocument();
  });

  it('passes sectionRef to SectionLayout', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<ContactSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has correct id attribute', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<ContactSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'contact');
  });
});
