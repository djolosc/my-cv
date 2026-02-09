import { type FC } from "react";
import styled from "styled-components";

import SectionLayout from "@/sections/layout/SectionLayout";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import GitHub from "@/assets/logos/GitHubG.svg";
import LinkedIn from "@/assets/logos/LinkedIn.svg";
import LinkItem from "../components/LinkItem";

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const ContactSection: FC<ContactSectionProps> = ({ sectionRef }) => {
  const links = [
    {
      name: "Email",
      icon: faEnvelope,
      linkUrl: "mailto:djsimovic@gmail.com",
      linkName: "djsimovic@gmail.com",
    },
    {
      name: "GitHub",
      icon: GitHub,
      linkUrl: "https://github.com/djolosc",
      linkName: "@djolosc",
    },
    {
      name: "LinkedIn",
      icon: LinkedIn,
      linkUrl: "https://www.linkedin.com/in/djsimovic/",
      linkName: "@djsimovic",
    },
  ];

  return (
    <SectionLayout sectionRef={sectionRef} id="contact" isNarrow>
      <TitleWrapper>
        <Title>CONTACT</Title>
      </TitleWrapper>
      <div>
        {links.map((link) => (
          <LinkItem key={link.linkName} {...link} />
        ))}
      </div>
    </SectionLayout>
  );
};

export default ContactSection;

const TitleWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.s16};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  font-family: "Geist Mono", monospace;
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;
