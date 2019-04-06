import { css } from "styled-components";
import {
  space,
  width,
  height,
  fontSize,
  fontWeight,
  borderRadius,
  textAlign,
  lineHeight
} from "styled-system";
import { darken, lighten } from "polished";

/**
 * Convert an array of color/gradient strings to theme colors
 * @param {array} colors        An array of color/gradient strings
 * @param {object} themeColors  Theme colors config
 */
export function convertColors(colors, themeColors) {
  return colors.map(c => convertColor(c, themeColors));
}

/**
 * Convert a color/gradient string to a theme color
 * @param {string} entry        Color string to convert
 * @param {object} themeColors  Theme colors config
 */
export function convertColor(entry, themeColors) {
  const parts = entry ? entry.split(" ") : [""];
  const color = parts.shift();

  let result;
  if (themeColors && themeColors.hasOwnProperty(color)) {
    result = `${themeColors[color]} ${parts.join(" ")}`;
  } else {
    result = `${color} ${parts.join(" ")}`;
  }

  return result.trim();
}

export const float = ({ float }) => {
  return float && `float: ${float};`;
};

export const display = ({ block, inline, display = "inline-block" }) => {
  display = block ? "block" : inline ? "inline" : display;
  return `display: ${display};`;
};

export const colors = ({
  bg,
  color,
  borderColor,
  scheme,
  disabled = false,
  theme
}) => {
  let background = convertColor(bg || "light", theme.colors);
  let foreground = convertColor(color || "dark", theme.colors);
  let border = convertColor(borderColor || "dark", theme.colors);
  let extra = "";

  if (disabled) {
    if (bg) {
      background = convertColor("disabled", theme.colors);
      foreground = convertColor("disabled-d-4", theme.colors);
      border = convertColor("disabled-d-2", theme.colors);
    } else {
      background = convertColor("light", theme.colors);
      foreground = convertColor("disabled", theme.colors);
      border = convertColor("disabled", theme.colors);
    }
    extra += css`
      cursor: not-allowed;
    `;
  }

  return css`
    ${background &&
      css`
        background-color: ${background};
      `};
    ${foreground &&
      css`
        color: ${foreground};
      `};
    ${border &&
      css`
        border-color: ${border};
      `};
    ${extra};
  `;
};

export const hoverColors = (amount = 0.2) => {
  return ({
    bg,
    color,
    borderColor,
    boxShadow = "2px 2px 2px rgba(0, 0, 0, 0.15)",
    textShadow = "1px 1px 1px rgba(0, 0, 0, 0.05)",
    theme,
    inverted = false,
    disabled = false
  }) => {
    const bgBase = convertColor(bg || "primary", theme.colors);
    const colorBase = convertColor(color || "white", theme.colors);
    const borderBase = convertColor(borderColor || "primary-d-1", theme.colors);
    const hoverFn = (color, amount, foreground = false) => {
      const fn = foreground
        ? inverted
          ? darken
          : lighten
        : inverted
          ? lighten
          : darken;
      return fn(amount, color);
    };
    return disabled
      ? null
      : css`
          &:hover {
            box-shadow: ${boxShadow};
            text-shadow: ${textShadow};
            ${bgBase &&
              css`
                background-color: ${hoverFn(bgBase, amount)};
              `};
            ${colorBase &&
              css`
                color: ${hoverFn(colorBase, amount, true)};
              `};
            ${borderBase &&
              css`
                border-color: ${hoverFn(borderBase, amount)};
              `};
          }
        `;
  };
};

export const customWidth = ({ fullWidth, ...next }) =>
  fullWidth
    ? css`
        width: calc(
          100% -
            ${(next.p || (next.pl || 0 + next.pr || 0)) * next.theme.space[2]}px
        );
      `
    : width(next);

export const verticalAlign = ({ verticalAlign, ...next }) =>
  verticalAlign
    ? css`
        vertical-align: ${verticalAlign};
      `
    : null;

export const overrides = (defaultProps = {}) => {
  return css`
    ${props =>
      [
        space,
        customWidth,
        height,
        colors,
        display,
        fontSize,
        fontWeight,
        borderRadius,
        lineHeight,
        textAlign,
        float,
        verticalAlign
      ].map((fn, i) => {
        return fn({
          ...defaultProps,
          ...props
        });
      })};
  `;
};
export default overrides;
