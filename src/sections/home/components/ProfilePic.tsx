import styled from "styled-components";
import profileImg from "@/assets/images/profile-picture.png";

import { HoverHideCursor } from "@/shared/components";

const ProfilePic = () => {
  return (
    <LogoWrapper>
      <LogoImg src={profileImg} alt="My Logo" />
      <HoverHideCursor>
        <StatusCircle />
        <StatusTooltip>
          <SmallStatusCircle />
          <p>AVAILABLE FOR WORK</p>
        </StatusTooltip>
      </HoverHideCursor>
    </LogoWrapper>
  );
};

export default ProfilePic;

const LogoWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const LogoImg = styled.img`
  display: block;
  width: 56px;
  height: 56px;

  border-radius: ${({ theme }) => theme.radius.r12};
`;

// The green status circle
const StatusCircle = styled.div`
  position: absolute;
  bottom: -3px;
  right: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.green1};
  border: 3px solid ${({ theme }) => theme.colors.black2};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0;
  }

  &:hover + span {
    opacity: 1;
    transform: translateY(-10px);
  }
`;

const SmallStatusCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.green1};
`;

// Tooltip/message
const StatusTooltip = styled.span`
  position: absolute;
  bottom: -12px;
  background-color: ${({ theme }) => theme.colors.black4};
  font-family: "Geist Mono", monospace;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white1};
  padding: ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s8};
  border-radius: ${({ theme }) => theme.radius.r12};
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateY(0);
  transition: all 0.2s ease;

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s6};

  backdrop-filter: blur(6px); // frosted glass effect
  -webkit-backdrop-filter: blur(6px); // Safari support

  ${StatusCircle}:hover & {
    opacity: 1;
    transform: translateY(-10px);
  }
`;
