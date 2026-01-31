import { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { CustomCursor, Navigation } from "@/shared/components";
import Signature from "./shared/components/Signature";

import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import {
  HomeSection,
  ExperienceSection,
  StackSection,
  PersonalSection,
  ContactSection,
} from "@/sections";
import { CursorProvider } from "@/shared/context/CursorContext";
import {
  faBolt,
  faEnvelope,
  faLayerGroup,
  faSuitcase,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const homeRef = useRef(null);
  const stackRef = useRef(null);
  const experienceRef = useRef(null);
  const personalRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    { id: "home", label: "Home", ref: homeRef, icon: faUser },
    {
      id: "experience",
      label: "Experience",
      ref: experienceRef,
      icon: faSuitcase,
    },
    { id: "stack", label: "Stack", ref: stackRef, icon: faLayerGroup },
    { id: "personal", label: "Personal", ref: personalRef, icon: faBolt },
    { id: "contact", label: "Contact", ref: contactRef, icon: faEnvelope },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CursorProvider>
        <StyledWrapper>
          <GlobalStyle />
          <CustomCursor />

          <StyledContent>
            <HomeSection sectionRef={homeRef} />
            <ExperienceSection sectionRef={experienceRef} />
            <StackSection sectionRef={stackRef} />
            <PersonalSection sectionRef={personalRef} />
            <ContactSection sectionRef={personalRef} />

            {/* <Signature /> */}
          </StyledContent>

          <Navigation sections={sections} />
        </StyledWrapper>
      </CursorProvider>
    </ThemeProvider>
  );
};

export default App;

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.black2};
`;

const StyledContent = styled.main`
  max-width: 640px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.s16};
  position: relative;
`;
