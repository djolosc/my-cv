import { ThemeProvider } from "styled-components";
import { CustomCursor } from "@/shared/components";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import { CursorProvider } from "@/contexts/CursorContext";

import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CursorProvider>
          <GlobalStyle />
          <CustomCursor />
          <AppRouter />
      </CursorProvider>
    </ThemeProvider>
  );
};

export default App;

