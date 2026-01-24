import { useRef } from "react";
import Header from "./components/Header";
import styled from "styled-components";

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);

  const sections = [
    { id: "home", label: "Home", ref: homeRef },
    { id: "about", label: "About", ref: aboutRef },
    { id: "work", label: "Work", ref: workRef },
  ];

  return (
    <div className="App">
      <Header sections={sections} />
      <StyledSection ref={homeRef} id="home">
        <h1>Home</h1>
      </StyledSection>

      <StyledSection ref={aboutRef} id="about">
        <h1>About</h1>
      </StyledSection>

      <StyledSection ref={workRef} id="work">
        <h1>Work</h1>
      </StyledSection>
    </div>
  );
};

export default App;

const StyledSection = styled.section`
  min-height: 100vh;
  padding: 6rem 1.5rem;
  scroll-margin-top: 90px; /* sticky header offset */
`;
