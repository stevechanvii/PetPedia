import Hero from "@/container/hero";
import Pets from "@/container/ptes";
import SearchBar from "@/container/search-bar";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SearchBar />
      <Pets />

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
