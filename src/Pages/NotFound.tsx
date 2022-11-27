import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function NotFound() {
  const navigate = useNavigate();
  const INITIAL_SECONDS = 3;
  const [count, setCount] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const countdown = setInterval(() => setCount((prev) => prev - 1), 1000);
    if (count === 0) navigate("/");

    return () => clearInterval(countdown);
  }, [count]);

  return (
    <Wrapper>
      <h1>해당 페이지를 찾을 수 없습니다.</h1>
      <p>
        <strong>{count}초</strong> 뒤 메인 화면으로 이동합니다.
      </p>
    </Wrapper>
  );
}

export default NotFound;

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
