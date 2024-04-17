import { type Gender, type PetType } from "@/types";
import React from "react";
import { TypographyP } from "./ui/typography";

type Props = {
  name: string;
  ownerName: string;
  type: PetType;
  ownerGender: Gender;
  ownerAge: number;
};

const PetCard = ({ name, ownerAge, ownerGender, ownerName, type }: Props) => {
  return (
    <div className="flex flex-col p-5 w-60 justify-center items-center border">
      <TypographyP>Owner: {ownerName}</TypographyP>
      <TypographyP>Age: {ownerAge}</TypographyP>
      <TypographyP>Gender: {ownerGender}</TypographyP>
      <TypographyP>Pet Name: {name}</TypographyP>
      <TypographyP>Pet Type: {type}</TypographyP>
    </div>
  );
};

export default PetCard;
