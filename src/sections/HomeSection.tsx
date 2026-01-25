import styled from "styled-components";
import ProfilePic from "../components/ProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Clock from "../components/Clock";
import EmailRow from "../components/EmailRow";

interface HomeSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const CURRENT_COMPANY_URL = "https://clarivate.com";

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

      <AboutRow>
        <p>
          Hey, I’m Djordje a software engineer at{" "}
          <Companyname
            href={CURRENT_COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Clarivate
          </Companyname>{" "}
          based in <span>Belgrade, Serbia 🇷🇸</span>. I specialize in building
          polished web and mobile interfaces with a strong focus on frontend
          architecture, performance, and great user experience.
        </p>
      </AboutRow>

      <EmailRow />
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

const AboutRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing.s24};
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.white1};
`;

const Companyname = styled.a`
  color: ${({ theme }) => theme.colors.white1};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.blue1};
  margin-left: ${({ theme }) => theme.spacing.s4};
`;
