import styled from "styled-components";
import ProfilePic from "../components/ProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface HomeSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const HomeSection: React.FC<HomeSectionProps> = ({ sectionRef }) => {
  return (
    <StyledSection ref={sectionRef} id="home">
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
  padding-top: ${({ theme }) => theme.spacing.s40};
  scroll-margin-top: 55px; /* sticky header offset */
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
