"use client";

import Link from "next/link";
import { ModeToggle } from "./color-mode-toggle";
import darkLogo from "../../public/icon_dark_mode.svg";
import lightLogo from "../../public/icon_light_mode.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Github, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function Navbar() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleShare = () => {
    toast({
      title: "Sharing",
      description: "Sharing the link to the repo stats",
    });
    if (navigator.share) {
      navigator
        .share({
          title: "Repo Stats",
          text: "Check out these GitHub repository statistics!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast({
            title: "Link Copied!",
            description: "The link has been copied to your clipboard.",
          });
        })
        .catch((error) => {
          console.error("Failed to copy link:", error);
          toast({
            title: "Copy Failed",
            description: "Failed to copy the link. Please try again.",
            variant: "destructive",
          });
        });
    }
  };

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
          {pathname.startsWith("/stats") && (
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://github.com/Rohithgilla12/repo-stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Star me
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
