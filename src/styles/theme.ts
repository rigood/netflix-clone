import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  red: "#E51013",
  green: "#46D369",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },

  flexbox: (flexDirection, justifyContent, alignItems) => {
    const justifyContentCss = justifyContent
      ? `justify-content: ${justifyContent}`
      : "";

    const alignItemsCss = alignItems ? `align-items: ${alignItems}` : "";

    return `
    display: flex;
    flex-direction: ${flexDirection};
    ${justifyContentCss};
    ${alignItemsCss};
    `;
  },

  font: (fontSize, fontWeight, color) => `
  font-size: ${fontSize / 16}rem;
  font-weight: ${fontWeight};
  color: ${color};
  `,
};
