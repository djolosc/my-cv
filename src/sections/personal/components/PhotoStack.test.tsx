import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PhotoStack from './PhotoStack';
import { renderWithTheme } from '@/test/utils';


describe('PhotoStack', () => {
  it('renders all four photos', () => {
    const { container } = renderWithTheme(<PhotoStack />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(4);
  });

  it('renders photos with correct alt text', () => {
    const { container } = renderWithTheme(<PhotoStack />);
    const images = container.querySelectorAll('img');
    expect(images[0]).toHaveAttribute('alt', 'photo1');
    expect(images[1]).toHaveAttribute('alt', 'photo2');
    expect(images[2]).toHaveAttribute('alt', 'photo3');
    expect(images[3]).toHaveAttribute('alt', 'photo4');
  });

  it('renders "Shot with my" text with mobile icon', () => {
    const { container } = renderWithTheme(<PhotoStack />);
    expect(screen.getByText(/Shot with my/)).toBeInTheDocument();
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders StackWrapper', () => {
    const { container } = renderWithTheme(<PhotoStack />);
    const wrapper = container.querySelector('section');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders PhotoCard components', () => {
    const { container } = renderWithTheme(<PhotoStack />);
    // PhotoCard components are rendered within StackWrapper
    const stackWrapper = container.querySelector('section');
    expect(stackWrapper).toBeInTheDocument();
    const images = container.querySelectorAll('img[alt^="photo"]');
    expect(images.length).toBe(4);
  });
});
