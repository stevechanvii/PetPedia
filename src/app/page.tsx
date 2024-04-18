import Hero from "@/container/hero";
import Pets from "@/container/ptes";
import SearchBar from "@/container/search";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SearchBar />
      <Pets />
    </main>
  );
}
