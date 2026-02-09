// src/screens/NotFoundScreen/NotFoundScreen.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import NotFoundScreen from "./NotFoundScreen";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual: typeof import("react-router-dom") = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NotFoundScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // fake timers for countdown
    mockNavigate.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderWithThemeAndRouter = (component: React.ReactElement) =>
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </BrowserRouter>
    );

  it("renders initial countdown and message", () => {
    renderWithThemeAndRouter(<NotFoundScreen />);
    expect(screen.getByText(/Oops! That section doesn’t exist./i)).toBeInTheDocument();
    expect(screen.getByText(/Returning home in 5 seconds/i)).toBeInTheDocument();
  });

  it("counts down every second", () => {
    renderWithThemeAndRouter(<NotFoundScreen />);

    expect(screen.getByText(/Returning home in 5 seconds/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/Returning home in 4 seconds/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/Returning home in 2 seconds/i)).toBeInTheDocument();
  });

  it("navigates to home when countdown reaches 0", () => {
    renderWithThemeAndRouter(<NotFoundScreen />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });
});