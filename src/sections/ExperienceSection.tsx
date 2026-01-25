import styled from "styled-components";

const experienceData = [
  {
    years: "07/2024 - PRESENT",
    role: "Senior Frontend Engineer",
    company: "Clarivate",
    description:
      "Build a user-friendly web app that helps professionals manage their intellectual properties efficiently. Design interactive dashboards with real-time updates to make tracking and monitoring simple for users.",
  },
  {
    years: "11/2021 - 07/2024",
    role: "Frontend Developer",
    company: "IVC Evidensia",
    description:
      "Work on a mobile app that supports veterinary clinics worldwide. In addition, develop a web app that streamlines daily tasks and makes workflows more intuitive and efficient for users.",
  },
  {
    years: "04/2021 - 11/2021",
    role: "Frontend Developer",
    company: "Marble IT",
    description:
      "Develop a mobile app that helps users reconnect with contacts after losing their phone, ensuring a seamless and reliable experience.",
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle>EXPERIENCE</SectionTitle>
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
              {exp.role} at {exp.company}
            </Heading>
            <Description>{exp.description}</Description>
          </Details>
        </ExperienceRow>
      ))}
    </SectionWrapper>
  );
};

export default ExperienceSection;

const SectionWrapper = styled.section`
  margin-top: ${({ theme }) => theme.spacing.s40};
`;

const SectionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  font-family: "Geist Mono", monospace;
`;

const SectionIntro = styled.p`
  margin-top: ${({ theme }) => theme.spacing.s16};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin-bottom: ${({ theme }) => theme.spacing.s32};
`;

const ExperienceRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s40};
  margin-bottom: ${({ theme }) => theme.spacing.s32};

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

const Heading = styled.div`
  color: ${({ theme }) => theme.colors.white1};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  margin: 0;
`;
