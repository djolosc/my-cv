import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React, { createRef } from 'react';
import ExperienceSection from './ExperienceSection';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ExperienceSection', () => {
  it('renders EXPERIENCE title', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ExperienceSection sectionRef={ref} />);
    expect(screen.getByText('EXPERIENCE')).toBeInTheDocument();
  });

  it('renders section intro text', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ExperienceSection sectionRef={ref} />);
    expect(screen.getByText(/Throughout my career/)).toBeInTheDocument();
  });

  it('renders all experience entries', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ExperienceSection sectionRef={ref} />);
    
    expect(screen.getByText('Clarivate')).toBeInTheDocument();
    expect(screen.getByText('IVC Evidensia')).toBeInTheDocument();
    expect(screen.getByText('Marble IT')).toBeInTheDocument();
  });

  it('renders role titles', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ExperienceSection sectionRef={ref} />);
    
    expect(screen.getByText(/Senior Frontend Engineer/)).toBeInTheDocument();
    const frontendEngineers = screen.getAllByText(/Frontend Engineer/);
    expect(frontendEngineers.length).toBeGreaterThan(0);
  });

  it('renders years for each experience', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ExperienceSection sectionRef={ref} />);
    
    expect(screen.getByText('07/2024 - PRESENT')).toBeInTheDocument();
    expect(screen.getByText('11/2021 - 07/2024')).toBeInTheDocument();
    expect(screen.getByText('04/2021 - 11/2021')).toBeInTheDocument();
  });

  it('renders category titles', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<ExperienceSection sectionRef={ref} />);
    
    expect(screen.getAllByText('⚡ Performance')).toHaveLength(3);
    expect(screen.getAllByText('🏛 Architecture')).toHaveLength(3);
    expect(screen.getAllByText('✨ UX')).toHaveLength(3);
  });

  it('passes sectionRef to SectionLayout', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<ExperienceSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has correct id attribute', () => {
    const ref = createRef<HTMLElement>();
    const { container } = renderWithTheme(<ExperienceSection sectionRef={ref} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'experience');
  });
});
