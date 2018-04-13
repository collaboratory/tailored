import { withTheme } from "styled-components";
import ButtonStyled from "./ButtonStyled";

const ButtonAnchor = withTheme(ButtonStyled.withComponent("a"));
export default ButtonAnchor;
