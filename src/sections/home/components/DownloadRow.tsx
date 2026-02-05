import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faClipboard,
  faCheck,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import { Toast } from "@/shared/components";
import { isDesktopDevice } from "@/utils/device";
import CV from "@/assets/cv/resume.pdf"; // make sure you have the .d.ts for PDFs

const DownloadRow = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isDesktop = isDesktopDevice();

  const downloadCV = useCallback((): void => {
    if (pressed) return; // prevent multiple clicks

    try {
      setPressed(true);

      if (isDesktop) {
        // Desktop: download
        const link = document.createElement("a");
        link.href = CV;
        link.download = "George-Simovic-CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setToastVisible(true);
      } else {
        // Mobile: open in new tab
        window.open(CV, "_blank");
      }

      // Reset press animation
      setTimeout(() => setPressed(false), 200);
    } catch (e) {
      console.error("Download failed", e);
      setPressed(false);
    }
  }, [pressed]);

  const navigateCV = () => {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;

      // Ignore typing
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      // C to download
      if (e.key.toLowerCase() === "c" && !e.repeat) {
        downloadCV();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [downloadCV]);

  return (
    <>
      <EmailRowWrapper>
        {isDesktop ? (
          <span>
            Press{" "}
            <CopyLetter onClick={downloadCV} $pressed={pressed}>
              C
            </CopyLetter>{" "}
            to download my CV
          </span>
        ) : (
          <span>
            <CopyTextButton onClick={downloadCV}>
              <FontAwesomeIcon icon={faLink} /> Tap <Here>here</Here> to check
              my CV
            </CopyTextButton>
          </span>
        )}
      </EmailRowWrapper>

      <Toast visible={toastVisible} onClose={() => setToastVisible(false)}>
        <FontAwesomeIcon icon={faCheck} /> CV downloaded!
      </Toast>
    </>
  );
};

export default DownloadRow;

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
