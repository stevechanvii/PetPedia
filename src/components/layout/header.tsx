import { ThemeToggle } from "@/components/layout/theme-toggle";
import Link from "next/link";
import { Dog } from "lucide-react";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link href={"/"} className="items-center justify-between gap-2 flex">
          <Dog className="h-6 w-6" />
          <h1 className="text-lg font-semibold">PetPedia</h1>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
