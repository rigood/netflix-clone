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
  const [seconds, setSeconds] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);

    setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <h1>잘못된 접근입니다.</h1>
      <p>
        <strong>{seconds}초</strong> 뒤 Home 화면으로 이동합니다.
      </p>
    </Wrapper>
  );
}

export default NotFound;
