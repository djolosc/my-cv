// src/screens/NotFoundScreen/index.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundScreen = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    // Countdown interval
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    // Redirect when counter reaches 0
    if (counter === 0) {
      navigate("/", { replace: true });
    }

    return () => clearInterval(interval);
  }, [counter, navigate]);

  return (
    <Wrapper>
      <Message>Oops! That section doesn’t exist.</Message>
      <SubMessage>Returning home in {counter} second{counter !== 1 ? "s" : ""}...</SubMessage>
    </Wrapper>
  );
};

export default NotFoundScreen;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
//   justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.black2};
  color: ${({ theme }) => theme.colors.white1};
  font-family: "Geist Mono", monospace;
  padding: ${({ theme }) => theme.spacing.s16};
`;

const Message = styled.h1`
  padding-top: ${({ theme }) => theme.spacing.s96};
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  padding-bottom: ${({ theme }) => theme.spacing.s16};
`;

const SubMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  opacity: 0.8;

`;