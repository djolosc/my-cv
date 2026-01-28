import { type FC } from "react";
import styled from "styled-components";

interface PersonalSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const PersonalSection: FC<PersonalSectionProps> = ({ sectionRef }) => {
  return (
    <SectionWrapper ref={sectionRef} id="personal">
      <SectionTitle>PERSONAL</SectionTitle>
    </SectionWrapper>
  );
};

export default PersonalSection;

const SectionWrapper = styled.section`
  padding-top: ${({ theme }) => theme.spacing.s40};
`;

const SectionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  font-family: "Geist Mono", monospace;
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;
