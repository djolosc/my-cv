import { useEffect, useState } from "react";
import type { RefObject } from "react";
import styled from "styled-components";
import NavClock from "./Clock";

interface HeaderProps {
  sections: { id: string; label: string; ref: RefObject<HTMLElement | null> }[];
}

const Header: React.FC<HeaderProps> = ({ sections }) => {
  const [active, setActive] = useState("home");

  const scrollTo = (ref: RefObject<HTMLElement | null>) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
      },
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <StyledHeader>
      <StyledNavContainer>
        <nav>
          <StyleNavLinks>
            {sections.map((s) => (
              <li key={s.id}>
                <StyledNavLink
                  $active={active === s.id}
                  onClick={() => scrollTo(s.ref)}
                >
                  {s.label}
                </StyledNavLink>
              </li>
            ))}
          </StyleNavLinks>
        </nav>
        <NavClock />
      </StyledNavContainer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.black3};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
`;

const StyledNavContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.s16};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyleNavLinks = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s20};
  list-style: none;
`;

const StyledNavLink = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  position: relative;
  transition: color 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.fs14};
`;
