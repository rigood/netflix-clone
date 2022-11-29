import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Loader() {
  return (
    <Wrapper>
      <Spinner icon={faSpinner} spin />
    </Wrapper>
  );
}

export default Loader;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexbox("column", "center", "center")};
  width: 100%;
  min-height: 100vh;
  color: ${({ theme }) => theme.red};
`;

const Spinner = styled(FontAwesomeIcon)`
  font-size: 4rem;
`;
