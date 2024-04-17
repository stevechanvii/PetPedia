"use client";

import { useQueryPets } from "@/hooks/query/useQueryPets";
import Image from "next/image";
import cat1 from "../../public/assets/cat-1.png";
import cat2 from "../../public/assets/cat-2.png";
import dog1 from "../../public/assets/dog-1.png";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";

export default function Home() {
  const { data, isLoading, isError } = useQueryPets();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <main className="flex">
      <div className="flex flex-col w-full h-[500px] bg-gradient-to-b from-[#626AAB] to-[#303056]">
        <div className="flex flex-col justify-end items-center gap-3 flex-1 lg:gap-6">
          <TypographyH1 className="lg:text-[60px] text-white">
            Welcome to PetPedia
          </TypographyH1>
          <TypographyH2 className="text-white">
            A place where you can find all the pets you need
          </TypographyH2>
        </div>
        <div className="justify-between items-end flex">
          <Image src={cat1} alt="cat-1" />
          <Image src={dog1} alt="dog-1" />
          <Image src={cat2} alt="cat-2" />
        </div>
      </div>
      {/* {data?.map((owner) => (
                <div
                    key={owner.name}
                    className='flex flex-col items-center justify-center w-1/3 p-4'
                >
                    <h1 className='text-2xl font-semibold'>{owner.name}</h1>
                </div>
            ))} */}
    </main>
  );
}
