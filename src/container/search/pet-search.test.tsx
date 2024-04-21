import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PetSearch from "./pet-search";
import "@testing-library/jest-dom";

describe("PetSearch Component", () => {
  it("renders correctly with initial state", () => {
    render(<PetSearch />);
    expect(screen.getByText("Search by Name")).toBeInTheDocument();
    expect(screen.getByText("Filter by Types")).toBeInTheDocument();
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });

  it("handles badge to be selected by default", () => {
    render(<PetSearch />);
    const badge = screen.getByTestId("badge-Cat");
    expect(badge.className).toContain("bg-primary");
  });

  it("handles badge clicks for selecting pet types", () => {
    render(<PetSearch />);
    const badge = screen.getByTestId("badge-Cat");
    fireEvent.click(badge);
    expect(badge.className).toContain("text-foreground");
  });

  it("handles reset button click", () => {
    render(<PetSearch />);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    const badgeCat = screen.getByTestId("badge-Cat");
    const badgeDog = screen.getByTestId("badge-Dog");
    const badgeFish = screen.getByTestId("badge-Cat");
    expect(badgeCat.className).toContain("text-foreground");
    expect(badgeDog.className).toContain("text-foreground");
    expect(badgeFish.className).toContain("text-foreground");
  });
});
