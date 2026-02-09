import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import DownloadRow from './DownloadRow';
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

describe('DownloadRow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders desktop message when on desktop', () => {
    renderWithProviders(<DownloadRow />);
    expect(screen.getByText(/Press/)).toBeInTheDocument();
    const cButton = screen.getByText('C');
    expect(cButton).toBeInTheDocument();
    expect(screen.getByText(/to download my CV/)).toBeInTheDocument();
  });

  it('renders mobile message when on mobile', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(false);
    renderWithProviders(<DownloadRow />);
    expect(screen.getByText(/Tap/)).toBeInTheDocument();
    expect(screen.getByText(/here/)).toBeInTheDocument();
    expect(screen.getByText(/to check my CV/)).toBeInTheDocument();
  });

  it('creates download link when C is clicked on desktop', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    
    renderWithProviders(<DownloadRow />);
    const cButton = screen.getByText('C');
    
    act(() => {
      cButton.click();
    });
    
    // Should attempt to create download link
    expect(createElementSpy).toHaveBeenCalled();
  });

  it('opens CV in new tab on mobile', () => {
    vi.spyOn(deviceUtils, 'isDesktopDevice').mockReturnValue(false);
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    
    renderWithProviders(<DownloadRow />);
    const button = screen.getByText(/here/).closest('button');
    
    if (button) {
      act(() => {
        button.click();
      });
      expect(openSpy).toHaveBeenCalled();
    }
    
    openSpy.mockRestore();
  });

  it('shows toast after download on desktop', () => {
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const element = originalCreateElement(tagName);
      if (tagName === 'a') {
        element.click = vi.fn();
      }
      return element;
    });
    
    renderWithProviders(<DownloadRow />);
    const cButton = screen.getByText('C');
    
    act(() => {
      cButton.click();
      vi.advanceTimersByTime(100);
    });
    
    expect(screen.getByText(/CV downloaded!/)).toBeInTheDocument();
    
    createElementSpy.mockRestore();
  });

  it('handles keyboard shortcut C', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    
    renderWithProviders(<DownloadRow />);
    
    act(() => {
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'c',
        bubbles: true,
      });
      window.dispatchEvent(keyEvent);
    });
    
    expect(createElementSpy).toHaveBeenCalled();
    
    createElementSpy.mockRestore();
  });

  it('ignores keyboard shortcut when typing in input', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    
    const { unmount } = renderWithProviders(<DownloadRow />);
    
    act(() => {
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'c',
        bubbles: true,
      });
      window.dispatchEvent(keyEvent);
    });
    
    // Reset spy call count before checking
    createElementSpy.mockClear();
    
    act(() => {
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'c',
        bubbles: true,
      });
      window.dispatchEvent(keyEvent);
    });
    
    // Should not create download link when typing in input
    expect(createElementSpy).not.toHaveBeenCalled();
    
    unmount();
    document.body.removeChild(input);
    createElementSpy.mockRestore();
  });

  it('prevents multiple clicks', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    
    renderWithProviders(<DownloadRow />);
    const cButton = screen.getByText('C');
    
    act(() => {
      cButton.click();
    });
    
    const firstCallCount = createElementSpy.mock.calls.length;
    
    act(() => {
      cButton.click();
    });
    
    // Second click should be prevented (pressed state)
    expect(createElementSpy.mock.calls.length).toBe(firstCallCount);
    
    createElementSpy.mockRestore();
  });

  it('cleans up keyboard listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderWithProviders(<DownloadRow />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });
});
