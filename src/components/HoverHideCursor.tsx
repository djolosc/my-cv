import { useCursor } from "../context/CursorContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const HoverHideCursor: React.FC<Props> = ({ children }) => {
  const { setHidden } = useCursor();

  return (
    <div
      onMouseEnter={() => setHidden(true)}
      onMouseLeave={() => setHidden(false)}
    >
      {children}
    </div>
  );
};
