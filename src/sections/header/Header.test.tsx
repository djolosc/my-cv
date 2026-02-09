import { describe, it, expect } from 'vitest';
import Header from './Header';
import { renderWithTheme } from '@/test/utils';

describe('Header', () => {
  it('renders empty div', () => {
    const { container } = renderWithTheme(<Header />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div?.children.length).toBe(0);
  });
});
