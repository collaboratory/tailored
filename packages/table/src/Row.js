import styled from "styled-components";
import { overrides } from "@tailored/util";

const Row = styled.tr`
  cursor: pointer;
  background: ${props => (props.tinted ? "#ececec" : "#fff")};
  ${overrides};
`;
export default Row;
