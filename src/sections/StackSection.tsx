import styled from "styled-components";

interface StackSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const StackSection: React.FC<StackSectionProps> = ({ sectionRef }) => {
  return (
    <SectionWrapper ref={sectionRef} id="experience">
      <SectionTitle>STACK</SectionTitle>
    </SectionWrapper>
  );
};

export default StackSection;

const SectionWrapper = styled.section`
  padding-top: ${({ theme }) => theme.spacing.s40};
`;

const SectionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  font-family: "Geist Mono", monospace;
`;
