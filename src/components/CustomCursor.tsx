import { useEffect, useState } from "react";
import styled from "styled-components";

const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    const interactiveEls = document.querySelectorAll<
      HTMLAnchorElement | HTMLButtonElement
    >("a, button");

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  // Magnetic effect: pull cursor slightly toward center of hovered element
  useEffect(() => {
    const magnet = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        hovering &&
        target &&
        (target.tagName === "A" || target.tagName === "BUTTON")
      ) {
        const rect = target.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        // Move 30% toward element center
        setPos((prev) => ({
          x: prev.x + (targetX - prev.x) * 0.7,
          y: prev.y + (targetY - prev.y) * 0.7,
        }));
      }
    };

    window.addEventListener("mousemove", magnet);
    return () => window.removeEventListener("mousemove", magnet);
  }, [hovering]);

  return (
    <CursorDot
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${hovering ? 2.5 : 1})`,
      }}
    />
  );
};

export default CustomCursor;

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.763);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition:
    width 0.15s ease,
    height 0.15s ease,
    transform 0.15s ease;
  mix-blend-mode: difference;
`;
