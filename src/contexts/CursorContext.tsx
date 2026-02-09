/* eslint-disable react-refresh/only-export-components -- context file exports provider and hook */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CursorContextType {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hidden, setHidden] = useState(false);

  return (
    <CursorContext.Provider value={{ hidden, setHidden }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within CursorProvider");
  return context;
};
