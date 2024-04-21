import Hero from "@/container/hero";
import Pets from "@/container/pets";
import SearchBar from "@/container/search";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SearchBar />
      <div className="min-h-[600px]">
        <Pets />
      </div>
    </main>
  );
}
