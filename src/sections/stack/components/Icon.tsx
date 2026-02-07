import { isDesktopDevice } from "@/utils/device";
import { useState, useRef, useEffect, type FC } from "react";
import styled from "styled-components";

interface IconProps {
  name: string;
  backgroundColor?: string;
  icon: string;
}

const Icon: FC<IconProps> = ({ name, backgroundColor, icon }) => {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDesktop = isDesktopDevice();

  const handleClick = () => {
    if (isDesktop) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setHovered(true);

    timeoutRef.current = setTimeout(() => {
      setHovered(false);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <StyledWrapper
      onMouseEnter={() => isDesktop && setHovered(true)}
      onMouseLeave={() => isDesktop && setHovered(false)}
      onClick={handleClick}
    >
      <IconWrapper $backgroundColor={backgroundColor}>
        <IconImg src={icon} alt={name} />
      </IconWrapper>
      <IconLabel $visible={hovered}>{name}</IconLabel>
    </StyledWrapper>
  );
};

export default Icon;

const StyledWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div<{ $backgroundColor?: string }>`
  width: 44px;
  height: 44px;
  margin: 0 ${({ theme }) => theme.spacing.s12};
  border-radius: ${({ theme }) => theme.radius.r12};
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor || theme.colors.white1};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconImg = styled.img`
  width: 80%;
  height: 80%;
`;

const IconLabel = styled.span<{ $visible?: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -40px;
  background: ${({ theme }) => theme.colors.grey3};
  color: ${({ theme }) => theme.colors.white1};
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  padding: 2px 8px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.25s ease;
`;
