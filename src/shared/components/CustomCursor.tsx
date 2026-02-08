import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCursor } from "../context/CursorContext"; // import the context
import { isDesktopDevice } from "@/utils/device";

const CustomCursor: React.FC = () => {
  const { hidden } = useCursor(); // get global hidden state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const isDesktop = isDesktopDevice();

  // track mouse position
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // magnetic hover effect for <a> and <button>
  useEffect(() => {
    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    const interactiveEls = document.querySelectorAll<
      HTMLAnchorElement | HTMLButtonElement
    >("a, button");

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const magnet = () => {
      // Magnetic effect: target center could drive cursor offset (TODO)
    };

    window.addEventListener("mousemove", magnet);
    return () => window.removeEventListener("mousemove", magnet);
  }, [hovering]);

  if (!isDesktop) return null;

  return (
    <CursorDot
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${
          hidden ? 0 : hovering ? 1 : 0.4
        })`,
      }}
    />
  );
};

export default CustomCursor;

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grey2};
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition:
    width 0.15s ease,
    height 0.15s ease,
    transform 0.15s ease;
  mix-blend-mode: difference;
`;
