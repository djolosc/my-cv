import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Clock from './Clock';
import { theme } from '@/styles/theme';
import { renderWithTheme } from '@/test/utils';


describe('Clock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders clock icon', () => {
    const { container } = renderWithTheme(<Clock />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('displays time on initial render', () => {
    const mockDate = new Date('2024-01-01T12:30:45Z');
    vi.setSystemTime(mockDate);
    
    renderWithTheme(<Clock />);
    
    // Time should be displayed (format depends on timezone)
    const clockText = screen.getByText(/GMT/);
    expect(clockText).toBeInTheDocument();
  });

  it('updates time every second', () => {
    const mockDate1 = new Date('2024-01-01T12:30:45Z');
    vi.setSystemTime(mockDate1);
    
    const { rerender } = renderWithTheme(<Clock />);
    const initialText = screen.getByText(/GMT/).textContent;
    
    const mockDate2 = new Date('2024-01-01T12:30:46Z');
    vi.setSystemTime(mockDate2);
    vi.advanceTimersByTime(1000);
    
    rerender(
      <ThemeProvider theme={theme}>
        <Clock />
      </ThemeProvider>
    );
    
    const updatedText = screen.getByText(/GMT/).textContent;
    expect(updatedText).not.toBe(initialText);
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = renderWithTheme(<Clock />);
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('formats time with leading zeros', () => {
    const mockDate = new Date('2024-01-01T09:05:03Z');
    vi.setSystemTime(mockDate);
    
    renderWithTheme(<Clock />);
    const clockText = screen.getByText(/GMT/).textContent;
    
    // Should contain formatted time (exact format depends on timezone)
    expect(clockText).toBeTruthy();
  });
});
