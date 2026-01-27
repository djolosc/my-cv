import { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import CustomCursor from "./components/CustomCursor";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import HomeSection from "./sections/HomeSection";
import { CursorProvider } from "./context/CursorContext";
import {
  faBolt,
  faEnvelope,
  faLayerGroup,
  faSuitcase,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Navigation from "./components/Navigation";
import ExperienceSection from "./sections/ExperienceSection";
import Signature from "./components/Signature";
import StackSection from "./sections/StackSection";

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

            <StyledSection ref={personalRef} id="personal">
              <StyledH1>Personal</StyledH1>
            </StyledSection>
            <StyledSection ref={contactRef} id="contact">
              <StyledH1>Contact</StyledH1>
            </StyledSection>
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

const StyledSection = styled.section`
  min-height: 100vh;
  padding: 6rem 1.5rem;
  scroll-margin-top: 55px; /* sticky header offset */
`;

const StyledH1 = styled.h1`
  color: white;
  font-size: 4rem;
  text-align: center;
  margin-top: 2rem;
`;
