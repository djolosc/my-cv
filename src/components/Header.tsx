import { useEffect, useState } from "react";
import type { RefObject } from "react";
import styled from "styled-components";

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
                  active={active === s.id}
                  onClick={() => scrollTo(s.ref)}
                >
                  {s.label}
                </StyledNavLink>
              </li>
            ))}
          </StyleNavLinks>
        </nav>
      </StyledNavContainer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgb(20, 20, 20);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
`;

const StyledNavContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyleNavLinks = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

const StyledNavLink = styled.button<{ active: boolean }>`
  background: none;
  border: none;

  /* color: ${({ active }) => (active ? "red" : "#8f8f8f")}; */
  color: #8f8f8f;

  font-weight: 500;
  position: relative;
  transition: color 0.2s ease;
  padding: 10px;

  /* &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: ${({ active }) => (active ? "100%" : "0%")};
    height: 2px;
    background: var(--color-primary);
    transition: width 0.25s ease;
  } */
`;
