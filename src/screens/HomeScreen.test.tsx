// src/screens/HomeScreen/HomeScreen.test.tsx
import { describe, it, expect, vi } from "vitest";
import {  screen } from "@testing-library/react";
import HomeScreen from "./HomeScreen";
import { renderWithTheme } from '@/test/utils';

// Mock the sections and Navigation components
vi.mock("@/sections", () => ({
  HomeSection: vi.fn(() => <div data-testid="home-section" />),
  ExperienceSection: vi.fn(() => <div data-testid="experience-section" />),
  StackSection: vi.fn(() => <div data-testid="stack-section" />),
  PersonalSection: vi.fn(() => <div data-testid="personal-section" />),
  ContactSection: vi.fn(() => <div data-testid="contact-section" />),
  Footer: vi.fn(() => <div data-testid="footer" />),
}));

vi.mock("@/shared/components", () => ({
  Navigation: vi.fn(({ sections }) => (
    <div data-testid="navigation">{sections.length} sections</div>
  )),
}));



describe("HomeScreen", () => {
  it("renders all sections, footer and navigation", () => {
    renderWithTheme(<HomeScreen />);

    // Check that all sections render
    expect(screen.getByTestId("home-section")).toBeInTheDocument();
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
    expect(screen.getByTestId("stack-section")).toBeInTheDocument();
    expect(screen.getByTestId("personal-section")).toBeInTheDocument();
    expect(screen.getByTestId("contact-section")).toBeInTheDocument();

    // Footer renders
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    // Navigation renders with 5 sections
    const navigation = screen.getByTestId("navigation");
    expect(navigation).toBeInTheDocument();
    expect(navigation.textContent).toContain("5 sections");
  });
});