import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

// Keyframes with fast start, slower finish
const drawGradual = (length: number) => keyframes`
  0% { stroke-dashoffset: ${length}; opacity: 0; }
  10% { stroke-dashoffset: ${length * 0.9}; opacity: 1; } /* slightly faster start */
  100% { stroke-dashoffset: 0; opacity: 1; } /* smooth finish */
`;

const Signature = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());

    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true); // trigger animation
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <SignatureWrapper ref={wrapperRef}>
      <Svg
        viewBox="411.1 127.6 927.5 335.9"
        $animate={animate}
        pathLength={pathLength}
      >
        <path
          ref={pathRef}
          d="M498.3 164.6c6.8-2.3 14.9-1.3 22-2.3 10.3-1.5 22.6-6.2 32.2-9.3q26.4-8.5 53-17.2c4.5-1.6 16.3-6.7 18.4-4.6 3.4 3.4-12.8 34-15 38-18 31-45.3 52.4-69.1 78.3q-7 7.9-13.8 16.1c-3 3.6-19.9 22-10.4 27.6 7 4.2 21.4-4.8 27.6-6.9 22.8-7.5 50-25.3 74.9-23 3.6.3-1.8 7.1-3.5 10.4a57 57 0 0 1-13.8 18.4c-17 17-35 33.5-53 49.5-35.7 31.8-75.2 59.6-108.2 94.4-7.5 8-12.4 13.6-19.6 20.8-1.9 1.9-3 5.7-5.7 5.7-1 0 5.2-4.4 5.7-4.6 3.6-1.4 5.7-3.2 9.2-4.6a161 161 0 0 0 31.1-17.3c29.4-20.5 58.6-41.4 88.7-61 47.7-31.1 95.4-63 140.5-97.9 40.4-31.3 78.4-64.7 125.5-86.4 25-11.4 52-20.7 79.5-21.8 3.8-.2 19.6-.7 19.6 1.1 0 3.6-7 1.3-10.4 2.3A449 449 0 0 0 869 183c-43.5 17.4-89.8 37.6-127.8 65.6a200 200 0 0 0-35.7 32.3c-3 3.7-8 11.5-8 11.5 2.7 2.8 31.8-3.9 35.7-4.6 5.4-1 10.7-2.6 16-3.5 36.4-6 75.2-4.6 111.8-2.3 51 3.3 100.7 19.8 152 24.2 7 .6 23.7 1.1 30 5.8 3.6 2.7-2.4 5.7 4.6 4.6 10.8-1.8 28.1-17 36.8-23 28.4-20 56-42.8 83-64.6a314 314 0 0 0 59.8-62.1c2-3 10.4-11.5 10.4-16.2 0-.8-.9 1.5-1.2 2.3q-1 3.5-2.3 7-3 7.5-6.9 15c-7.9 15.1-12.7 23-21.9 36.8-15.5 23.2-31.4 46.4-46 70.2-4.2 6.7-14.2 19.7-12.7 28.8 1.7 10 26.8-2 31-3.4a281 281 0 0 1 86.5-15c19-.5 30.8 6.9 42.6 20.7 8.3 9.9 14.7 27.8 28.8 20.7"
        />
      </Svg>
    </SignatureWrapper>
  );
};

export default Signature;

const SignatureWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.s40};
`;

const Svg = styled.svg<{ $animate: boolean; pathLength: number }>`
  width: 200px;
  height: auto;

  path {
    fill: none;
    stroke: ${({ theme }) => theme.colors.white1};
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: ${({ pathLength }) => pathLength};
    stroke-dashoffset: ${({ pathLength }) => pathLength};
    ${({ $animate, pathLength }) =>
      $animate &&
      css`
        animation: ${drawGradual(pathLength)} 2.5s forwards;
      `}
  }
`;
