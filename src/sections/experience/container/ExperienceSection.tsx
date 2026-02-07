import styled from "styled-components";

import ClarivateLogo from "@/assets/logos/clrvt.svg";
import IvcLogo from "@/assets/logos/ivc.svg";
import MarbleLogo from "@/assets/logos/marble.svg";

import { CompanyName } from "@/shared/components";
import SectionLayout from "@/shared/layout/SectionLayout";

interface ExperienceSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  sectionRef,
}) => {
  const experienceData = [
    {
      years: "07/2024 - PRESENT",
      role: "Senior Frontend Engineer",
      company: "Clarivate",
      summary:
        "Worked on an enterprise platform for managing intellectual property portfolios, building large-scale dashboards and analytics workflows used by legal professionals and internal operational teams.",
      performance:
        "Optimized rendering and state architecture to support complex, data-heavy dashboards with frequent API-driven updates, improving responsiveness and stability at scale.",
      architecture:
        "Designed and implemented a microfrontend architecture, enabling independent feature ownership and scaling a modular frontend platform.",
      ux: "Translated complex intellectual-property workflows into clear, intuitive dashboard experiences focused on speed and usability.",
      logo: ClarivateLogo,
    },
    {
      years: "11/2021 - 07/2024",
      role: "Frontend Engineer",
      company: "IVC Evidensia",
      summary:
        "Worked on a platform ecosystem supporting veterinary clinics across Europe, including a mobile app and internal operational tools used by clinic staff.",
      performance:
        "Delivered stable cross-platform features and improved responsiveness across mobile and web environments used daily in clinics.",
      architecture:
        "Built shared infrastructure across platforms, including seamless authentication, tracking tools, A/B experimentation systems, and a mobile notification framework.",
      ux: "Improved navigation, forms, and data visibility to better match real-world clinic workflows.",
      logo: IvcLogo,
    },
    {
      years: "04/2021 - 11/2021",
      role: "Frontend Engineer",
      company: "Marble IT",
      summary:
        "Built a consumer mobile app focused on device recovery, helping users reconnect with contacts after phone loss.",
      performance:
        "Optimized responsiveness and reliability across a wide range of mobile devices.",
      architecture:
        "Owned the entire frontend architecture as the sole engineer, from component design to delivery.",
      ux: "Implemented onboarding and recovery flows in close collaboration with design, ensuring smooth and trustworthy user experiences.",
      logo: MarbleLogo,
    },
  ];

  return (
    <SectionLayout sectionRef={sectionRef} id="experience" title="EXPERIENCE">
      <SectionIntro>
        Throughout my career, I've worked on various projects, from building
        scalable systems to designing user-friendly interfaces. Here's a brief
        overview.
      </SectionIntro>

      {experienceData.map((exp, i) => (
        <ExperienceRow key={i}>
          <Years>{exp.years}</Years>
          <Details>
            <Heading>
              <p>{exp.role} at </p>
              <CompanyName
                logo={exp.logo}
                company={exp.company}
                noPadding={exp.company === "Marble IT"}
              />
            </Heading>
            <Summary>{exp.summary}</Summary>
            <CategoryTitle>⚡ Performance</CategoryTitle>
            <Summary>{exp.performance}</Summary>

            <CategoryTitle>🏛 Architecture</CategoryTitle>
            <Summary>{exp.architecture}</Summary>

            <CategoryTitle>✨ UX</CategoryTitle>
            <Summary $noPadding>{exp.ux}</Summary>
          </Details>
        </ExperienceRow>
      ))}
    </SectionLayout>
  );
};

export default ExperienceSection;

const SectionIntro = styled.p`
  margin-top: ${({ theme }) => theme.spacing.s16};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
`;

const ExperienceRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s40};
  margin-top: ${({ theme }) => theme.spacing.s32};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.s8};
  }
`;

const Years = styled.div`
  width: 130px;
  font-family: "Geist Mono", monospace;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
`;

const Details = styled.div`
  flex: 1;
`;

const Heading = styled.span`
  color: ${({ theme }) => theme.colors.white1};
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Summary = styled.p<{ $noPadding?: boolean }>`
  margin-bottom: ${({ theme, $noPadding }) =>
    $noPadding ? 0 : theme.spacing.s12};
`;

const CategoryTitle = styled.p`
  color: ${({ theme }) => theme.colors.grey2};
`;
