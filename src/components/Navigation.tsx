import type { RefObject } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface SectionItem {
  id: string;
  label: string;
  ref: RefObject<HTMLElement | null>;
  icon: IconDefinition;
}

interface NavigationProps {
  sections: SectionItem[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <NavigationWrapper>
      <NavContainer>
        <Nav>
          {sections.map((section) => (
            <NavItem key={section.id}>
              <NavButton
                aria-label={section.label}
                onClick={() => scrollToSection(section.ref)}
              >
                <FontAwesomeIcon icon={section.icon} />
              </NavButton>
            </NavItem>
          ))}
        </Nav>
      </NavContainer>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom) + 16px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  background: ${({ theme }) => theme.colors.black5};
  backdrop-filter: blur(6px); // frosted glass effect
  -webkit-backdrop-filter: blur(6px); // Safari support

  border-radius: 12px;

  border: 1px solid rgba(255, 255, 255, 0.15);

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

const NavContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.s12};
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s8};
  list-style: none;
`;

const NavItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavButton = styled.button`
  background: transparent;

  font-size: ${({ theme }) => theme.fontSizes.fs18};

  color: ${({ theme }) => theme.colors.grey2};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.25s ease;
  &:active {
    color: ${({ theme }) => theme.colors.grey4};
    transform: scale(1.1);
  }
`;
