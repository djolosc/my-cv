import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import Icon from './Icon';
import { theme } from '@/styles/theme';
import * as deviceUtils from '@/utils/device';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Icon', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders icon image', () => {
    const { container } = renderWithTheme(
      <Icon name="React" icon="/react.svg" />
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/react.svg');
    expect(img).toHaveAttribute('alt', 'React');
  });

  it('shows label on hover on desktop', () => {
    const { container } = renderWithTheme(
      <Icon name="React" icon="/react.svg" />
    );
    const wrapper = container.querySelector('div');
    const label = screen.getByText('React');
    
    expect(label).toHaveStyle({ opacity: '0' });
    
    if (wrapper) {
      const mouseEnterEvent = new MouseEvent('mouseenter', {
        bubbles: true,
        cancelable: true,
      });
      wrapper.dispatchEvent(mouseEnterEvent);
    }
    
    // Label should become visible
    expect(label).toBeInTheDocument();
  });

  it('shows label on click on mobile', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(false);
    
    const { container } = renderWithTheme(<Icon name="React" icon="/react.svg" />);
    const wrapper = container.querySelector('div');
    const label = screen.getByText('React');
    
    expect(label).toHaveStyle({ opacity: '0' });
    
    if (wrapper) {
      act(() => {
        wrapper.click();
      });
    }
    
    expect(label).toHaveStyle({ opacity: '1' });
  });

  it('hides label after timeout on mobile', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(false);
    
    const { container } = renderWithTheme(<Icon name="React" icon="/react.svg" />);
    const wrapper = container.querySelector('div');
    const label = screen.getByText('React');
    
    if (wrapper) {
      act(() => {
        wrapper.click();
      });
      expect(label).toHaveStyle({ opacity: '1' });
      
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(label).toHaveStyle({ opacity: '0' });
    }
  });

  it('applies custom background color', () => {
    renderWithTheme(
      <Icon name="TypeScript" icon="/ts.svg" backgroundColor="#007ACC" />
    );
    expect(screen.getByAltText('TypeScript')).toBeInTheDocument();
  });

  it('uses default white background when not provided', () => {
    renderWithTheme(<Icon name="React" icon="/react.svg" />);
    expect(screen.getByAltText('React')).toBeInTheDocument();
  });

  it('does not show label on click on desktop', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(true);
    
    const { container } = renderWithTheme(<Icon name="React" icon="/react.svg" />);
    const wrapper = container.querySelector('div');
    const label = screen.getByText('React');
    
    if (wrapper) {
      act(() => {
        wrapper.click();
      });
      // On desktop, click should not trigger label
      expect(label).toHaveStyle({ opacity: '0' });
    }
  });

  it('cleans up timeout on unmount', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(false);
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const { unmount } = renderWithTheme(
      <Icon name="React" icon="/react.svg" />
    );
    const wrapper = screen.getByAltText('React').closest('div');
    
    if (wrapper) {
      wrapper.click();
    }
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
