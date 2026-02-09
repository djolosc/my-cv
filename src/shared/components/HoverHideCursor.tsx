import { useCursor } from "../../contexts/CursorContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HoverHideCursor: React.FC<Props> = ({ children }) => {
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

export default HoverHideCursor;
