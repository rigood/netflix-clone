import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  red: "#E51013",
  green: "#46D369",
  gray: "#333",
  lightgray: "#777",
  white: "#E5E5E5",

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

  Font: (fontSize, fontWeight, color) => `
  font-size: ${fontSize / 16}rem;
  font-weight: ${fontWeight};
  color: ${color};
  `,

  MaxLines: (maxLines, lineHeight) => {
    const lineHeightCss = lineHeight ? `line-height: ${lineHeight}` : "";

    return `
    --max-lines: ${maxLines};
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
    ${lineHeightCss};
    `;
  },

  textShadow: `text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);`,

  RemoveAutoFill: (color) => `
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: ${color} !important;
    caret-color: ${color};
  }
  `,
};
