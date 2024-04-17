import React from "react";
import Image from "next/image";
import cat1 from "../../public/assets/cat-1.png";
import cat2 from "../../public/assets/cat-2.png";
import dog1 from "../../public/assets/dog-1.png";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";

const Hero = () => {
  return (
    <div className="flex flex-col w-full h-[500px] bg-gradient-to-b from-[#626AAB] to-[#303056]">
      <div className="flex flex-col justify-end items-center gap-3 flex-1 lg:gap-8">
        <TypographyH1 className="lg:text-[90px] text-white">
          PetPedia
        </TypographyH1>
        <TypographyH2 className="text-white font-normal">
          A place where you can find all the pets you need
        </TypographyH2>
      </div>
      <div className="justify-between items-end flex">
        <Image src={cat1} alt="cat-1" />
        <Image src={dog1} alt="dog-1" />
        <Image src={cat2} alt="cat-2" />
      </div>
    </div>
  );
};

export default Hero;
