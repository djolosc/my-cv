export const isDesktopDevice = (): boolean => {
  if (typeof window === "undefined") return true; // SSR fallback

  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return !hasTouch;
};
