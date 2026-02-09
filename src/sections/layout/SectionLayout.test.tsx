import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useRef } from 'react';
import SectionLayout from './SectionLayout';
import { theme } from '@/styles/theme';
import { renderWithTheme } from '@/test/utils';


describe('SectionLayout', () => {
  it('renders children', () => {
    renderWithTheme(
      <SectionLayout>
        <div>Test content</div>
      </SectionLayout>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    renderWithTheme(<SectionLayout title="Test Section">Content</SectionLayout>);
    expect(screen.getByText('Test Section')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    const { container } = renderWithTheme(
      <SectionLayout>Content</SectionLayout>
    );
    const title = container.querySelector('p');
    expect(title).not.toBeInTheDocument();
  });

  it('applies id attribute', () => {
    const { container } = renderWithTheme(
      <SectionLayout id="test-section">Content</SectionLayout>
    );
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'test-section');
  });

  it('passes ref to section element', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLElement>(null);
      return (
        <SectionLayout sectionRef={ref}>
          <div>Content</div>
        </SectionLayout>
      );
    };
    const { container } = renderWithTheme(<TestComponent />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('applies custom paddingTop when provided', () => {
    const { container } = renderWithTheme(
      <SectionLayout paddingTop={60}>Content</SectionLayout>
    );
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ paddingTop: '60px' });
  });

  it('applies default paddingTop when not provided', () => {
    const { container } = renderWithTheme(
      <SectionLayout>Content</SectionLayout>
    );
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ paddingTop: theme.spacing.s40 });
  });

  it('applies narrow styling when isNarrow is true', () => {
    const { container } = renderWithTheme(
      <SectionLayout isNarrow>Content</SectionLayout>
    );
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ maxWidth: undefined });
  });

  it('applies default max-width when isNarrow is false', () => {
    const { container } = renderWithTheme(
      <SectionLayout isNarrow={false}>Content</SectionLayout>
    );
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ maxWidth: '640px' });
  });

  it('applies default max-width when isNarrow is undefined', () => {
    const { container } = renderWithTheme(
      <SectionLayout>Content</SectionLayout>
    );
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ maxWidth: '640px' });
  });

  it('renders both title and children', () => {
    renderWithTheme(
      <SectionLayout title="My Section">
        <div>Child content</div>
      </SectionLayout>
    );
    expect(screen.getByText('My Section')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
