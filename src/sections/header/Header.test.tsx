import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import Header from './Header';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Header', () => {
  it('renders empty div', () => {
    const { container } = renderWithTheme(<Header />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div?.children.length).toBe(0);
  });
});
