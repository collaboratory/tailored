import styled from "styled-components";
import { overrides } from "@tailored/util";

export const Box = styled.div`
  ${overrides()};
`;

export const Grid = styled.div`
  padding: 0 12px 0 12px;
  ${overrides()};
`;

export const Row = styled.div`
  padding: 0 8px 0 8px;
  display: flex;
  ${overrides()};
`;

export const Col = styled.div`
  display: inline-block;
  ${overrides()};
`;

export default Box;
