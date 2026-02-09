import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import LinkItem from './LinkItem';
import { theme } from '@/styles/theme';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('LinkItem', () => {
  it('renders name and link text', () => {
    renderWithTheme(
      <LinkItem
        name="Email"
        icon={faEnvelope}
        linkUrl="mailto:test@example.com"
        linkName="test@example.com"
      />
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('adds target="_blank" and rel for external URLs', () => {
    const { container } = renderWithTheme(
      <LinkItem
        name="GitHub"
        icon="/logo.svg"
        linkUrl="https://github.com/user"
        linkName="github.com/user"
      />
    );
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target/rel for relative URLs', () => {
    const { container } = renderWithTheme(
      <LinkItem
        name="Local"
        icon={faEnvelope}
        linkUrl="/local"
        linkName="local"
      />
    );
    const link = container.querySelector('a');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('renders FontAwesome icon when icon is IconProp', () => {
    const { container } = renderWithTheme(
      <LinkItem
        name="Email"
        icon={faEnvelope}
        linkUrl="mailto:test@example.com"
        linkName="test@example.com"
      />
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders SVG img when icon is string', () => {
    const { container } = renderWithTheme(
      <LinkItem
        name="GitHub"
        icon="/logo.svg"
        linkUrl="https://github.com"
        linkName="github.com"
      />
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/logo.svg');
  });

  it('has correct href attribute', () => {
    const { container } = renderWithTheme(
      <LinkItem
        name="Test"
        icon={faEnvelope}
        linkUrl="https://example.com"
        linkName="example.com"
      />
    );
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
