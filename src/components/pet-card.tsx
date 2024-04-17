import { type Gender, type PetType } from "@/types";
import React from "react";

type Props = {
  name: string;
  ownerName: string;
  type: PetType;
  ownerGender: Gender;
  ownerAge: number;
};

const PetCard = ({ name }: Props) => {
  return (
    <div className="flex p-5 justify-center items-center border">{name}</div>
  );
};

export default PetCard;
