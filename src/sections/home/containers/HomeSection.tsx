import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import SectionLayout from "@/shared/layout/SectionLayout";
import ProfilePic from "../components/ProfilePic";
import Clock from "../components/Clock";
import DownloadRow from "../components/DownloadRow";
import { CompanyName } from "@/shared/components";

import ClarivateLogo from "@/assets/logos/clrvt.svg";

interface HomeSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const HomeSection: React.FC<HomeSectionProps> = ({ sectionRef }) => {
  const CURRENT_COMPANY_URL = "https://clarivate.com";

  return (
    <SectionLayout sectionRef={sectionRef} id="home" paddingTop={20}>
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
          Hey, I’m Djordje, a software engineer at{" "}
          <a
            href={CURRENT_COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CompanyName logo={ClarivateLogo} company="Clarivate" />
          </a>{" "}
          , currently, based in <span>Belgrade, Serbia 🇷🇸</span>. I specialize
          in building polished web and mobile interfaces with a strong focus on
          frontend architecture, performance, and great user experience.
        </p>
      </AboutRow>

      <DownloadRow />
    </SectionLayout>
  );
};

export default HomeSection;

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
  gap: ${({ theme }) => theme.spacing.s2};
  margin-top: ${({ theme }) => theme.spacing.s16};
`;

const AboutRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing.s24};
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.white1};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.blue1};
  margin-left: ${({ theme }) => theme.spacing.s4};
`;
