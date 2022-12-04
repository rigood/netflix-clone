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
    gray: string;
    lightgray: string;
    white: string;

    flexbox: (
      flexDirection: string,
      justifyContent?: string,
      alignItems?: string
    ) => string;

    Font: (
      fontSize: number,
      fontWeight: number,
      color: fontColorType
    ) => string;

    MaxLines: (maxLines: number, lineHeight?: string) => string;

    textShadow: string;

    RemoveAutoFill: (color: string) => string;
  }
}
