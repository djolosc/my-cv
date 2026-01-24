// styled.d.ts
import "styled-components";
import { ThemeType } from "./theme";

// Extend the styled-components DefaultTheme with our ThemeType
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
