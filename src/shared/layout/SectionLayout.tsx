import { type FC, type ReactNode } from "react";
import styled from "styled-components";

interface SectionLayoutProps {
  sectionRef?: React.RefObject<HTMLElement | null>;
  title?: string;
  children?: ReactNode;
  id?: string;
  paddingTop?: number;
  isNarrow?: boolean;
}

const SectionLayout: FC<SectionLayoutProps> = ({
  sectionRef,
  title,
  children,
  id,
  paddingTop,
  isNarrow,
}) => {
  return (
    <SectionWrapper
      ref={sectionRef}
      id={id}
      $paddingTop={paddingTop}
      $isNarrow={isNarrow}
    >
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </SectionWrapper>
  );
};

export default SectionLayout;

const SectionWrapper = styled.section<{
  $paddingTop?: number;
  $isNarrow?: boolean;
}>`
  ${({ $isNarrow, theme }) =>
    !$isNarrow &&
    `
      max-width: 640px;
      padding: 0 ${theme.spacing.s16};
    `}

  padding-top: ${({ theme, $paddingTop }) =>
    $paddingTop ? `${$paddingTop}px` : theme.spacing.s40};

  margin: 0 auto;
  position: relative;
`;

const SectionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  font-family: "Geist Mono", monospace;
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;
