import styled from "styled-components";
import { overrides } from "@tailored/util";
import Col from "./Col";

const HCol = styled(Col)`
  font-weight: bold;
  ${overrides({
    bg: "disabled-d-7",
    borderColor: "disabled-d-5",
    color: "light"
  })};
`;
export default HCol;
