// styled.d.ts
import "styled-components";
import { ThemeType } from "./theme";

// Extend the styled-components DefaultTheme with our ThemeType
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation
  export interface DefaultTheme extends ThemeType {}
}
