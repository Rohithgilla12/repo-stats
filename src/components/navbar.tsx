"use client";

import Link from "next/link";
import { ModeToggle } from "./color-mode-toggle";
import darkLogo from "../../public/icon_dark_mode.svg";
import lightLogo from "../../public/icon_light_mode.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-lg">
          <div className="flex items-center">
            <Image
              src={theme === "dark" ? darkLogo : lightLogo}
              alt="Repo Stats"
              width={32}
              height={32}
            />
            <span className="ml-2">Repo Stats</span>
          </div>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://github.com/Rohithgilla12/repo-stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="mr-2 h-4 w-4" />
              Star me
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
