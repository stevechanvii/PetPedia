import { PetType, type Gender } from "@/types";
import React from "react";
import { TypographyP } from "./ui/typography";

import dog1 from "../../public/icons/dog-1.png";
import dog2 from "../../public/icons/dog-2.png";
import dog3 from "../../public/icons/dog-3.png";
import cat1 from "../../public/icons/cat-1.png";
import cat2 from "../../public/icons/cat-2.png";
import cat3 from "../../public/icons/cat-3.png";
import cat4 from "../../public/icons/cat-4.png";
import cat5 from "../../public/icons/cat-5.png";
import cat6 from "../../public/icons/cat-6.png";
import fish1 from "../../public/icons/fish-1.png";
import github from "../../public/icons/github.png";
import Image from "next/image";
import { Badge } from "./ui/badge";

type Props = {
  name: string;
  ownerName: string;
  type: PetType;
  ownerGender: Gender;
  ownerAge: number;
};

// Get the image based on the pet type and name
const PetIcon = ({ type, name }: { type: PetType; name: string }) => {
  if (!type) {
    return <Image src={github} alt={name} className="w-30 h-30" />;
  }
  const petIcons = {
    [PetType.Dog]: [dog1, dog2, dog3],
    [PetType.Cat]: [cat1, cat2, cat3, cat4, cat5, cat6],
    [PetType.Fish]: [fish1],
  };

  const icons = petIcons[type];
  const icon = icons[name.length % icons.length];

  return <Image src={icon} alt={name} className="w-30 h-30" />;
};

const PetCard = ({ name, ownerAge, ownerGender, ownerName, type }: Props) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <Badge>
        <TypographyP className="text-base">
          {type ? `${name} (${type.toLowerCase()})` : "No Pet"}
        </TypographyP>
      </Badge>
      <PetIcon type={type} name={name} />

      <Badge>
        <TypographyP className="text-sm">{`${ownerName}, ${ownerAge}, ${ownerGender}`}</TypographyP>
      </Badge>
    </div>
  );
};

export default PetCard;
