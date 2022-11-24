import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 200px 60px 60px 60px;
  text-align: center;
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  p {
    font-size: 24px;
    strong {
      color: ${(props) => props.theme.red};
    }
  }
`;

function NotFound() {
  const INITIAL_SECONDS = 3;
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, INITIAL_SECONDS * 1000);

    setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <h1>해당 페이지를 찾을 수 없습니다.</h1>
      <p>
        <strong>{seconds}초</strong> 뒤 Home 화면으로 이동합니다.
      </p>
    </Wrapper>
  );
}

export default NotFound;
