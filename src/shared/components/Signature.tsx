import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Signature: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get the path length
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "stroke-dashoffset 2s ease-out"; // smooth animation
    setPathLength(length);

    // Intersection Observer to detect visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // only animate once
          }
        });
      },
      { threshold: 0.5 }, // trigger when 50% visible
    );

    observer.observe(path);

    return () => observer.disconnect();
  }, []);

  // Trigger animation when visible
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !isVisible) return;
    path.style.strokeDashoffset = "0";
  }, [isVisible]);

  return (
    <SignatureWrapper>
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="auto"
      >
        <path
          ref={pathRef}
          d="M20 80 C 70 10, 120 10, 170 80 S 300 150, 400 80"
          stroke="white"
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
        />
      </svg>
    </SignatureWrapper>
  );
};

export default Signature;

const SignatureWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 100px 0;

  svg {
    display: block;
  }
`;
