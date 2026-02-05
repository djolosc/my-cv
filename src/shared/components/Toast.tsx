import { useEffect, type FC } from "react";
import styled from "styled-components";

type ToastProps = {
  children: React.ReactNode;
  visible: boolean;
  duration?: number;
  onClose: () => void;
};

const Toast: FC<ToastProps> = ({
  children,
  visible,
  duration = 2000,
  onClose,
}) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  return (
    <ToastWrapper $visible={visible} role="status" aria-live="polite">
      {children}
    </ToastWrapper>
  );
};
export default Toast;

const ToastWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 76px;
  font-family: "Geist Mono", monospace;
  white-space: nowrap;
  transform: translateX(-50%)
    translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  padding: ${({ theme }) => `${theme.spacing.s4} ${theme.spacing.s12}`};
  border-radius: ${({ theme }) => theme.radius.r8};

  background: ${({ theme }) => theme.colors.black5};
  backdrop-filter: blur(6px); // frosted glass effect
  -webkit-backdrop-filter: blur(6px); // Safari support

  color: ${({ theme }) => theme.colors.white1};
  font-size: ${({ theme }) => theme.fontSizes.fs12};

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  text-align: center;

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  z-index: 100;
`;
