import Col from "./Col";
import { overrides } from "@tailored/util";
const HCol = Col.extend`
  font-weight: bold;
  ${overrides({
    bg: "primary-d-2",
    color: "white"
  })};
`;
export default HCol;
