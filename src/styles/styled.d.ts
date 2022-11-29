import "styled-components";

type fontColorType = {
  black: string;
  lightBlack: string;
  white: string;
  lightWhite: string;
  red: string;
  green: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    green: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };

    flexbox: (
      flexDirection: string,
      justifyContent?: string,
      alignItems?: string
    ) => string;

    font: (
      fontSize: number,
      fontWeight: number,
      color: fontColorType
    ) => string;
  }
}
