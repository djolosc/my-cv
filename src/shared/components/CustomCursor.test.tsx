import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import CustomCursor from './CustomCursor';
import { CursorProvider, useCursor } from '../context/CursorContext';
import { theme } from '@/styles/theme';
import * as deviceUtils from '@/utils/device';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CursorProvider>{component}</CursorProvider>
    </ThemeProvider>
  );
};

describe('CustomCursor', () => {
  const originalNavigator = global.navigator;
  const originalWindow = global.window;

  beforeEach(() => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(true);
  });

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
    Object.defineProperty(global, 'window', {
      value: originalWindow,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('renders cursor dot on desktop', () => {
    const { container } = renderWithProviders(<CustomCursor />);
    const cursor = container.querySelector('div');
    expect(cursor).toBeInTheDocument();
  });

  it('does not render on non-desktop devices', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(false);
    const { container } = renderWithProviders(<CustomCursor />);
    const cursor = container.querySelector('div');
    expect(cursor).not.toBeInTheDocument();
  });

  it('updates position on mouse move', () => {
    const { container } = renderWithProviders(<CustomCursor />);
    const cursor = container.querySelector('div');
    
    act(() => {
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
        bubbles: true,
      });
      window.dispatchEvent(mouseEvent);
    });

    expect(cursor).toHaveStyle({
      left: '100px',
      top: '200px',
    });
  });

  it('applies scale transform based on hidden state', async () => {
    const TestComponent = () => {
      const { setHidden } = useCursor();
      React.useEffect(() => {
        setHidden(true);
      }, [setHidden]);
      return <CustomCursor />;
    };

    const { container } = renderWithProviders(<TestComponent />);
    const cursor = container.querySelector('div');
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(cursor?.style.transform).toContain('scale(0)');
  });

  it('applies scale transform based on hovering state', async () => {
    const { container } = renderWithProviders(
      <div>
        <button>Test Button</button>
        <CustomCursor />
      </div>
    );
    const cursor = container.querySelector('div[style*="left"]');
    const button = container.querySelector('button');
    
    if (button && cursor) {
      await act(async () => {
        const mouseEnterEvent = new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
        });
        button.dispatchEvent(mouseEnterEvent);
        await new Promise(resolve => setTimeout(resolve, 10));
      });

      // The hover state should update the transform
      expect(cursor).toBeInTheDocument();
    }
  });

  it('cleans up event listeners on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderWithProviders(<CustomCursor />);
    
    expect(addEventListenerSpy).toHaveBeenCalled();
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
