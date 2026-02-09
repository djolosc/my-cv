// src/screens/HomeScreen/index.tsx
import { useRef } from "react";
import styled from "styled-components";
import {
  HomeSection,
  ExperienceSection,
  StackSection,
  PersonalSection,
  ContactSection,
  Footer,
} from "@/sections";
import { Navigation } from "@/shared/components";
import {
  faBolt,
  faEnvelope,
  faLayerGroup,
  faSuitcase,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
  const homeRef = useRef(null);
  const stackRef = useRef(null);
  const experienceRef = useRef(null);
  const personalRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    { id: "home", label: "Home", ref: homeRef, icon: faUser },
    { id: "experience", label: "Experience", ref: experienceRef, icon: faSuitcase },
    { id: "stack", label: "Stack", ref: stackRef, icon: faLayerGroup },
    { id: "personal", label: "Personal", ref: personalRef, icon: faBolt },
    { id: "contact", label: "Contact", ref: contactRef, icon: faEnvelope },
  ];

  return (
    <StyledWrapper>
      <main>
        <HomeSection sectionRef={homeRef} />
        <ExperienceSection sectionRef={experienceRef} />
        <StackSection sectionRef={stackRef} />
        <PersonalSection sectionRef={personalRef} />
        <ContactSection sectionRef={contactRef} />
        <Footer />

        <Navigation sections={sections} />
      </main>
    </StyledWrapper>
  );
};

export default HomeScreen;

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.black2};
`;