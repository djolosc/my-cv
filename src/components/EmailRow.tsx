import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Toast from "./Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { isDesktopDevice } from "../utils/device";

const EMAIL = "djordje.simovic@email.com";

const EmailRow = () => {
  const [toastVisible, setToastVisible] = useState(false);

  // Check device once
  const isDesktop = isDesktopDevice();

  const copyEmail = useCallback(async (): Promise<void> => {
    if (toastVisible) return;

    try {
      await navigator.clipboard.writeText(EMAIL);
      navigator.vibrate?.(15);
      setToastVisible(true);
    } catch (e) {
      console.error("Clipboard failed", e);
    }
  }, [toastVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;

      // Ignore when typing
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // C to copy
      if (e.key.toLowerCase() === "c" && !e.repeat) {
        copyEmail();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [copyEmail]);

  return (
    <>
      <EmailRowWrapper>
        {isDesktop && (
          <span>
            Press <CopyLetter onClick={copyEmail}>C</CopyLetter> to copy my
            email
          </span>
        )}
        {!isDesktop && (
          <span>
            <CopyTextButton onClick={copyEmail}>
              <FontAwesomeIcon icon={faClipboard} /> Tap to copy my{" "}
              <Email>email</Email>
            </CopyTextButton>
          </span>
        )}
      </EmailRowWrapper>
      <Toast visible={toastVisible} onClose={() => setToastVisible(false)}>
        <FontAwesomeIcon icon={faClipboard} /> Copied to clipboard
      </Toast>
    </>
  );
};

export default EmailRow;

const EmailRowWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.s24};
`;

const CopyTextButton = styled.button`
  all: unset;
`;

const Email = styled.span`
  color: ${({ theme }) => theme.colors.white1};
`;

const CopyLetter = styled.a`
  color: ${({ theme }) => theme.colors.white1};
  font-size: ${({ theme }) => theme.fontSizes.fs14};
  background-color: #262626;
  border-radius: 6px;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  user-select: none;
  transition:
    transform 0.08s ease,
    box-shadow 0.08s ease;

  box-shadow:
    rgba(255, 255, 255, 0.1) 0px 1px 0px inset,
    rgba(16, 24, 40, 0.05) 0px 1px 2px 0px;

  &:active,
  &[data-copied="true"] {
    transform: translateY(1px) scale(0.96);
    box-shadow: rgba(16, 24, 40, 0.2) 0px 1px 2px inset;
  }
`;
