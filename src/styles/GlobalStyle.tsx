import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Box-sizing reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  * {
    margin: 0;
  }

  /* Full height and smooth scroll */
  html,
  body,
  #root {
    height: 100%;
    scroll-behavior: smooth;
    cursor: none; /* Hide default cursor */
    font-family: 'Inter', sans-serif;
    font-size: ${({ theme }) => theme.fontSizes.fs12};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: ${({ theme }) => theme.lspacing.ls1};
  }

  /* Remove cursor on interactive elements */
  a,
  button {
    cursor: none;
    color: ${({ theme }) => theme.colors.text};
  }

  /* Remove default link styling */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Remove list styling */
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Make buttons inherit font */
  button {
    font-family: inherit;
    border: none;
    background: none;
  }
`;
