import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import CompanyName from './CompanyName';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CompanyName', () => {
  it('renders company name', () => {
    renderWithTheme(<CompanyName logo="/logo.png" company="Acme Corp" />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders logo with correct src and alt', () => {
    const { container } = renderWithTheme(
      <CompanyName logo="/test-logo.svg" company="Test Company" />
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/test-logo.svg');
    expect(img).toHaveAttribute('alt', 'Test Company');
  });

  it('applies padding when noPadding is false', () => {
    const { container } = renderWithTheme(
      <CompanyName logo="/logo.png" company="Company" noPadding={false} />
    );
    const img = container.querySelector('img');
    expect(img).toHaveStyle({ padding: theme.spacing.s2 });
  });

  it('removes padding when noPadding is true', () => {
    const { container } = renderWithTheme(
      <CompanyName logo="/logo.png" company="Company" noPadding={true} />
    );
    const img = container.querySelector('img');
    expect(img).toHaveStyle({ padding: '0' });
  });

  it('applies default noPadding as false', () => {
    const { container } = renderWithTheme(
      <CompanyName logo="/logo.png" company="Company" />
    );
    const img = container.querySelector('img');
    expect(img).toHaveStyle({ padding: theme.spacing.s2 });
  });
});
