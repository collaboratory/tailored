import styled from "styled-components";

const Title = styled.h1`
  color: ${props => props.theme.colors[props.color || "primary-d-4"]};
  margin-top: 8px;
  margin-bottom: 8px;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.05);
  font-weight: bolder;
`;
export default Title;
