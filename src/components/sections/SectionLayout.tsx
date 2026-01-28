import { type FC, type ReactNode } from "react";
import styled from "styled-components";

interface SectionLayoutProps {
  sectionRef?: React.RefObject<HTMLElement | null>;
  title?: string;
  children?: ReactNode;
  id?: string;
}

const SectionLayout: FC<SectionLayoutProps> = ({
  sectionRef,
  title,
  children,
  id,
}) => {
  return (
    <SectionWrapper ref={sectionRef} id={id} $noTitle={!title}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </SectionWrapper>
  );
};

export default SectionLayout;

const SectionWrapper = styled.section<{ $noTitle: boolean }>`
  padding-top: ${({ theme, $noTitle }) =>
    $noTitle ? theme.spacing.s20 : theme.spacing.s40};
`;

const SectionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  font-family: "Geist Mono", monospace;
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;
