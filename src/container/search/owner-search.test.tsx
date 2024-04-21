import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import OwnerSearch from "./owner-search";
import "@testing-library/jest-dom";

describe("OwnerSearch Component", () => {
  it("renders correctly with initial state", () => {
    render(<OwnerSearch />);
    expect(screen.getByText("Search by Name")).toBeInTheDocument();
    expect(screen.getByText("Group by Genders")).toBeInTheDocument();
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });

  it("handles genders to be selected by default", () => {
    render(<OwnerSearch />);
    const badgeMale = screen.getByTestId("badge-Male");
    const badgeFemale = screen.getByTestId("badge-Female");
    expect(badgeMale.className).toContain("bg-primary");
    expect(badgeFemale.className).toContain("bg-primary");
  });

  it("handles badge clicks for selecting genders", () => {
    render(<OwnerSearch />);
    const badge = screen.getByTestId("badge-Male");
    fireEvent.click(badge);
    expect(badge.className).toContain("text-foreground");
  });

  it("handles reset button click", () => {
    render(<OwnerSearch />);
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    const badgeMale = screen.getByTestId("badge-Male");
    expect(badgeMale.className).toContain("text-foreground");

    const badgeFemale = screen.getByTestId("badge-Female");
    expect(badgeFemale.className).toContain("text-foreground");

    const searchInput = screen.getByLabelText("Search by Name");
    expect(searchInput).toHaveValue("");
  });
});
