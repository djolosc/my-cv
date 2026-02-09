import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import { theme } from '@/styles/theme';
import { CursorProvider } from '@/shared/context/CursorContext';

export const renderWithTheme = (
  component: React.ReactElement,
  options?: RenderOptions
) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
    options
  );
};

export const renderWithProviders = (
  component: React.ReactElement,
  options?: RenderOptions
) => {
  return render(
    <ThemeProvider theme={theme}>
      <CursorProvider>{component}</CursorProvider>
    </ThemeProvider>,
    options
  );
};