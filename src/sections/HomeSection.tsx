import styled from "styled-components";
import ProfilePic from "../components/ProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Clock from "../components/Clock";

interface HomeSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const HomeSection: React.FC<HomeSectionProps> = ({ sectionRef }) => {
  return (
    <StyledSection ref={sectionRef} id="home">
      <HeaderWrapper>
        <EstText>EST. 1992</EstText>
        <Clock />
      </HeaderWrapper>
      <ProfilePic />

      <NameRow>
        <Name>Djordje Simovic</Name>
        <StyledIcon icon={faCheckCircle} />
      </NameRow>

      <p>Frontend Engineer</p>
    </StyledSection>
  );
};

export default HomeSection;

const StyledSection = styled.section`
  padding-top: ${({ theme }) => theme.spacing.s20};
`;

const EstText = styled.p`
  font-family: "Geist Mono", monospace;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s40};
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s4};
  margin-top: ${({ theme }) => theme.spacing.s16};
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.white1};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.blue1};
  margin-left: ${({ theme }) => theme.spacing.s4};
`;
