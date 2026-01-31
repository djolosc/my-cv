import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

import { Toast } from "@/shared/components";
import { isDesktopDevice } from "@/utils/device";

const EMAIL = "djsimovic@gmail.com";

const EmailRow = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Check device once
  const isDesktop = isDesktopDevice();

  const copyEmail = useCallback(async (): Promise<void> => {
    if (toastVisible) return;

    try {
      setPressed(true);

      await navigator.clipboard.writeText(EMAIL);
      navigator.vibrate?.(15);
      setToastVisible(true);

      setTimeout(() => setPressed(false), 200);
    } catch (e) {
      console.error("Clipboard failed", e);
      setPressed(false);
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
            Press{" "}
            <CopyLetter onClick={copyEmail} $pressed={pressed}>
              C
            </CopyLetter>{" "}
            to copy my email
          </span>
        )}
        {!isDesktop && (
          <span>
            <CopyTextButton onClick={copyEmail}>
              <FontAwesomeIcon icon={faClipboard} /> Tap <Here>here</Here> to
              copy my email
            </CopyTextButton>
          </span>
        )}
      </EmailRowWrapper>
      <Toast visible={toastVisible} onClose={() => setToastVisible(false)}>
        <FontAwesomeIcon icon={faClipboard} /> {EMAIL} copied!
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

const Here = styled.span`
  color: ${({ theme }) => theme.colors.white1};
`;

const CopyLetter = styled.a<{ $pressed: boolean }>`
  color: ${({ theme }) => theme.colors.white1};
  font-size: ${({ theme }) => theme.fontSizes.fs14};
  background-color: ${({ theme }) => theme.colors.grey3};
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

  ${({ $pressed }) =>
    $pressed &&
    `
      transform: translateY(1px) scale(0.96);
      box-shadow: rgba(16, 24, 40, 0.2) 0px 1px 2px inset;
    `}

  &:active {
    transform: translateY(1px) scale(0.96);
    box-shadow: rgba(16, 24, 40, 0.2) 0px 1px 2px inset;
  }
`;
