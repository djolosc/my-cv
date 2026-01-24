export const theme = {
  colors: {
    background: "#0D0D0D",
    background2: "#141414ff",
    border: "#94a3b819",
    text: "#8f8f8f",
    text2: "#FFFFFF",
  },
  fontSizes: {
    fs12: "12px",
    fs14: "14px",
    fs16: "16px",
  },
  spacing: {
    s4: "4px",
    s8: "8px",
    s12: "12px",
    s16: "16px",
    s20: "20px",
    s24: "24px",
    s32: "32px",
  },
  lspacing: {
    ls1: "0,48px",
  },
  breakpoints: {
    mobile: "640px",
    tablet: "1024px",
    desktop: "1200px",
  },
};

export type ThemeType = typeof theme;
