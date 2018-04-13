import styled from "styled-components";

import { overrides } from "@tailored/util";

const Input = styled.input`
  appearance: none;
  padding: 2px 8px;
  border-radius: 4px;
  line-height: 24px;
  border: ${props =>
    `1px solid ${props.theme.colors[props.outline || "primary-t-9"]}`};
  font-weight: bolder;
  max-width: calc(100% - 16px);

  &:focus {
    border: 1px solid ${props => props.theme.colors[props.outline || "primary"]};
    box-shadow: 0 0 0 1px
      ${props => props.theme.colors[props.outline || "primary"]};
    outline: none;
  }

  ${overrides};
`;
export default Input;
