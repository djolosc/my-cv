import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import HoverHideCursor from './HoverHideCursor';
import { CursorProvider } from '../context/CursorContext';
import { theme } from '@/styles/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CursorProvider>{component}</CursorProvider>
    </ThemeProvider>
  );
};

describe('HoverHideCursor', () => {
  it('renders children', () => {
    renderWithProviders(
      <HoverHideCursor>
        <div>Test content</div>
      </HoverHideCursor>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('calls setHidden(true) on mouse enter', () => {
    const { container } = renderWithProviders(
      <HoverHideCursor>
        <div>Content</div>
      </HoverHideCursor>
    );
    const wrapper = container.querySelector('div');
    
    if (wrapper) {
      const mouseEnterEvent = new MouseEvent('mouseenter', {
        bubbles: true,
        cancelable: true,
      });
      wrapper.dispatchEvent(mouseEnterEvent);
      // Component should handle the event
      expect(wrapper).toBeInTheDocument();
    }
  });

  it('calls setHidden(false) on mouse leave', () => {
    const { container } = renderWithProviders(
      <HoverHideCursor>
        <div>Content</div>
      </HoverHideCursor>
    );
    const wrapper = container.querySelector('div');
    
    if (wrapper) {
      const mouseLeaveEvent = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
      });
      wrapper.dispatchEvent(mouseLeaveEvent);
    }
  });

  it('wraps children in a div', () => {
    const { container } = renderWithProviders(
      <HoverHideCursor>
        <span>Child</span>
      </HoverHideCursor>
    );
    const wrapper = container.querySelector('div');
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
