import styled from "styled-components";
import { overrides } from "@tailored/util";

const Table = styled.table`
  height: ${props => (props.fullHeight ? "100%" : "auto")};
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
  word-break: break-word;
  ${overrides()};
`;
export default Table;
