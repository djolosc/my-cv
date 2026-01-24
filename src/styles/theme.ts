export const theme = {
  colors: {
    white1: "#FFFFFF",

    black1: "#000000",
    black2: "#0D0D0D",
    black3: "#141414ff",

    grey1: "#8f8f8f",
    grey2: "#ffffffc3",
    grey3: "#94a3b819",

    green1: "#16bf5e",

    blue1: "#2f9df7",
  },
  fontSizes: {
    fs12: "12px",
    fs14: "14px",
    fs16: "16px",
  },
  spacing: {
    s2: "2px",
    s4: "4px",
    s6: "6px",
    s8: "8px",
    s12: "12px",
    s16: "16px",
    s20: "20px",
    s24: "24px",
    s32: "32px",
    s40: "40px",
    s96: "96px",
  },
  radius: {
    r4: "4px",
    r12: "12px",
  },
  lspacing: {
    ls16: "0.16px",
    ls48: "0.48px",
  },
  lheight: {
    lh16: "16px",
    lh24: "24px",
  },
  breakpoints: {
    mobile: "640px",
    tablet: "1024px",
    desktop: "1200px",
  },
};

export type ThemeType = typeof theme;
