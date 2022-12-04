import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IButtonProps {
  icon: IconProp;
  handleClick: () => void;
}

function Button({ icon, handleClick }: IButtonProps) {
  return <DefaultButton icon={icon} onClick={handleClick} />;
}

export default Button;

const DefaultButton = styled(FontAwesomeIcon)`
  width: 28px;
  height: 28px;
  font-size: 28px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;

  @media (hover: hover) {
    &:hover {
      border-color: white;
      color: white;
    }
  }

  @media (max-width: 1024px) {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    font-size: 16px;
  }
`;
