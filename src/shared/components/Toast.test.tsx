import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import Toast from './Toast';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders children when visible', () => {
    renderWithTheme(
      <Toast visible={true} onClose={() => {}}>
        Test message
      </Toast>
    );
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    const { container } = renderWithTheme(
      <Toast visible={false} onClose={() => {}}>
        Hidden message
      </Toast>
    );
    const toast = container.querySelector('[role="status"]');
    expect(toast).toHaveStyle({ opacity: '0' });
  });

  it('calls onClose after default duration', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Toast visible={true} onClose={onClose}>
        Message
      </Toast>
    );

    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2000);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose after custom duration', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Toast visible={true} onClose={onClose} duration={5000}>
        Message
      </Toast>
    );

    vi.advanceTimersByTime(4999);
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when not visible', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Toast visible={false} onClose={onClose}>
        Message
      </Toast>
    );

    vi.advanceTimersByTime(2000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('clears timer on unmount', () => {
    const onClose = vi.fn();
    const { unmount } = renderWithTheme(
      <Toast visible={true} onClose={onClose}>
        Message
      </Toast>
    );

    unmount();
    vi.advanceTimersByTime(2000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('resets timer when visible changes', () => {
    const onClose = vi.fn();
    const { rerender } = renderWithTheme(
      <Toast visible={true} onClose={onClose}>
        Message
      </Toast>
    );

    vi.advanceTimersByTime(1000);
    rerender(
      <ThemeProvider theme={theme}>
        <Toast visible={false} onClose={onClose}>
          Message
        </Toast>
      </ThemeProvider>
    );

    vi.advanceTimersByTime(2000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    const { container } = renderWithTheme(
      <Toast visible={true} onClose={() => {}}>
        Message
      </Toast>
    );
    const toast = container.querySelector('[role="status"]');
    expect(toast).toHaveAttribute('role', 'status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });
});
