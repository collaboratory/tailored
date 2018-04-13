import styled from "styled-components";
import { overrides } from "@tailored/util";

import Row from "./Row";

const TBody = styled.tbody`
  ${Row}:hover {
    background: #eee;
  }
  ${overrides};
`;
export default TBody;
