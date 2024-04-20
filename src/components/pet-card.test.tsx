import { render, screen } from "@testing-library/react";
import PetCard from "@/components/pet-card";
import { Gender, PetType } from "@/types";

describe("PetCard Component", () => {
  it("renders pet and owner details by pet name: Garfield, owner: Bob, type: Cat, gender: Male, owner age: 23", () => {
    render(
      <PetCard
        name="Garfield"
        ownerName="Bob"
        type={PetType.Cat}
        ownerGender={Gender.Male}
        ownerAge={23}
      />,
    );
    const petDetails = screen.getByTestId("pet-details").textContent;
    expect(petDetails).toEqual("Garfield (cat)");

    const ownerDetails = screen.getByTestId("owner-details").textContent;
    expect(ownerDetails).toEqual("Bob, 23, M");
  });
});
