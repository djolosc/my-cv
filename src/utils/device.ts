export const isDesktopDevice = (): boolean => {
  if (typeof window === "undefined") return true; // SSR fallback

  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const minDesktopWidth = 1024;
  const isWideEnough = window.innerWidth >= minDesktopWidth;

  // desktop = wide + no touch
  return isWideEnough && !hasTouch;
};
