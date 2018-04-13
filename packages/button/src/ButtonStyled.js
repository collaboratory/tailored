import styled, { withTheme } from "styled-components";
import { overrides, float, display, hoverColors } from "@tailored/util";

export const ButtonStyled = styled.button`
  appearance: none;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  padding: 6px 12px;
  border: 1px solid;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.5s;

  ${display};
  ${float};
  ${hoverColors()};
  ${overrides};
`;
export default withTheme(ButtonStyled);
