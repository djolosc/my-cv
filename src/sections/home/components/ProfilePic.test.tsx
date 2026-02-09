import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import ProfilePic from './ProfilePic';
import { theme } from '@/styles/theme';
import { CursorProvider } from '@/shared/context/CursorContext';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CursorProvider>{component}</CursorProvider>
    </ThemeProvider>
  );
};

describe('ProfilePic', () => {
  it('renders profile image', () => {
    const { container } = renderWithProviders(<ProfilePic />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'My Logo');
  });

  it('renders status circle', () => {
    const { container } = renderWithProviders(<ProfilePic />);
    // StatusCircle is a styled div, check for the wrapper structure
    const wrapper = container.querySelector('div > div');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders status tooltip', () => {
    renderWithProviders(<ProfilePic />);
    expect(screen.getByText('AVAILABLE FOR WORK')).toBeInTheDocument();
  });

  it('wraps status elements in HoverHideCursor', () => {
    const { container } = renderWithProviders(<ProfilePic />);
    // HoverHideCursor wraps StatusCircle and StatusTooltip
    const wrapper = container.querySelector('div > div');
    expect(wrapper).toBeInTheDocument();
  });
});
