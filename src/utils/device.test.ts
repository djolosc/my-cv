import { describe, it, expect, afterEach } from 'vitest';
import { isDesktopDevice } from './device';

describe('isDesktopDevice', () => {
  const originalNavigator = global.navigator;
  const originalWindow = global.window;

  afterEach(() => {
    Object.defineProperty(global, 'navigator', { value: originalNavigator, configurable: true });
    Object.defineProperty(global, 'window', { value: originalWindow, configurable: true });
  });

  it('returns true when window is undefined (SSR)', () => {
    const win = global.window;
    // @ts-expect-error - simulating SSR
    delete global.window;
    expect(isDesktopDevice()).toBe(true);
    global.window = win;
  });

  it('returns false when device has touch', () => {
    Object.defineProperty(global, 'navigator', {
      value: { maxTouchPoints: 5 },
      configurable: true,
    });
    expect(isDesktopDevice()).toBe(false);
  });

  it('returns true when device has no touch', () => {
    Object.defineProperty(global, 'navigator', {
      value: { maxTouchPoints: 0 },
      configurable: true,
    });
    // jsdom may have ontouchstart; use a window without it so both checks are false
    Object.defineProperty(global, 'window', {
      value: {},
      configurable: true,
    });
    expect(isDesktopDevice()).toBe(true);
  });
});