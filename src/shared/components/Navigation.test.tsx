import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { createRef } from 'react';
import Navigation from './Navigation';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { renderWithTheme } from '@/test/utils';



describe('Navigation', () => {
  const mockScrollIntoView = vi.fn();
  
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    Element.prototype.scrollIntoView = mockScrollIntoView;
  });

  it('renders navigation items', () => {
    const sections = [
      {
        id: 'home',
        label: 'Home',
        ref: createRef<HTMLElement>(),
        icon: faUser as IconDefinition,
      },
      {
        id: 'contact',
        label: 'Contact',
        ref: createRef<HTMLElement>(),
        icon: faEnvelope as IconDefinition,
      },
    ];

    renderWithTheme(<Navigation sections={sections} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('renders correct aria-labels', () => {
    const sections = [
      {
        id: 'home',
        label: 'Home',
        ref: createRef<HTMLElement>(),
        icon: faUser as IconDefinition,
      },
    ];

    renderWithTheme(<Navigation sections={sections} />);
    
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
  });

  it('calls scrollIntoView when button is clicked', () => {
    const ref = createRef<HTMLElement>();
    const mockElement = document.createElement('div');
    ref.current = mockElement;
    mockElement.scrollIntoView = mockScrollIntoView;

    const sections = [
      {
        id: 'home',
        label: 'Home',
        ref,
        icon: faUser as IconDefinition,
      },
    ];

    renderWithTheme(<Navigation sections={sections} />);
    
    const button = screen.getByLabelText('Home');
    button.click();

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles multiple sections', () => {
    const sections = [
      {
        id: 'home',
        label: 'Home',
        ref: createRef<HTMLElement>(),
        icon: faUser as IconDefinition,
      },
      {
        id: 'contact',
        label: 'Contact',
        ref: createRef<HTMLElement>(),
        icon: faEnvelope as IconDefinition,
      },
    ];

    renderWithTheme(<Navigation sections={sections} />);
    
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact')).toBeInTheDocument();
  });

  it('handles empty sections array', () => {
    const { container } = renderWithTheme(<Navigation sections={[]} />);
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(0);
  });

  it('does not call scrollIntoView when ref.current is null', () => {
    const ref = createRef<HTMLElement>();
    const sections = [
      {
        id: 'home',
        label: 'Home',
        ref,
        icon: faUser as IconDefinition,
      },
    ];

    renderWithTheme(<Navigation sections={sections} />);
    
    const button = screen.getByLabelText('Home');
    button.click();

    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });
});
