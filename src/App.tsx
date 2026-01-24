import { useRef } from "react";
import Header from "./components/Header";
import styled, { ThemeProvider } from "styled-components";
import CustomCursor from "./components/CustomCursor";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const stackRef = useRef(null);
  const experienceRef = useRef(null);
  const personalRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    { id: "home", label: "Home", ref: homeRef },
    { id: "about", label: "About", ref: aboutRef },
    { id: "stack", label: "Stack", ref: stackRef },
    { id: "experience", label: "Experience", ref: experienceRef },
    { id: "personal", label: "Personal", ref: personalRef },
    { id: "contact", label: "Contact", ref: contactRef },
  ];

  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>
        <GlobalStyle />
        <CustomCursor />

        <Header sections={sections} />
        <StyledContent>
          <StyledSection ref={homeRef} id="home">
            <StyledH1>Home</StyledH1>
          </StyledSection>

          <StyledSection ref={aboutRef} id="about">
            <StyledH1>About</StyledH1>
          </StyledSection>

          <StyledSection ref={stackRef} id="stack">
            <StyledH1>Stack</StyledH1>
          </StyledSection>

          <StyledSection ref={experienceRef} id="experience">
            <StyledH1>Experience</StyledH1>
          </StyledSection>

          <StyledSection ref={personalRef} id="personal">
            <StyledH1>Personal</StyledH1>
          </StyledSection>
          <StyledSection ref={contactRef} id="contact">
            <StyledH1>Contact</StyledH1>
          </StyledSection>
        </StyledContent>
      </StyledWrapper>
    </ThemeProvider>
  );
};

export default App;

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledContent = styled.main`
  max-width: 640px;
  margin: 0 auto;
  background-color: red;
`;

const StyledSection = styled.section`
  min-height: 100vh;
  padding: 6rem 1.5rem;
  scroll-margin-top: 90px; /* sticky header offset */
`;

const StyledH1 = styled.h1`
  color: white;
  font-size: 4rem;
  text-align: center;
  margin-top: 2rem;
`;
