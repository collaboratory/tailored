import Col from "./Col";
import { overrides } from "@tailored/util";
const HCol = Col.extend`
  font-weight: bold;
  ${overrides({
    bg: "disabled-d-7",
    borderColor: "disabled-d-5",
    color: "light"
  })};
`;
export default HCol;
