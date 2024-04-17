"use client";

import { useQueryPets } from "@/hooks/query/useQueryPets";

export default function Home() {
  const { data, isLoading, isError } = useQueryPets();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <main className="flex">
      {data?.map((pet) => (
        <div
          key={pet.name}
          className="flex flex-col items-center justify-center w-1/3 p-4"
        >
          <h1 className="text-2xl font-semibold">{pet.name}</h1>
        </div>
      ))}
    </main>
  );
}
