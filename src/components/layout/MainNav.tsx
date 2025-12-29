"use client";
import Link from "next/link";
import Logo from "./Logo";
import { ThemeToggleButton } from "@/components/ui/shadcn-io/theme-toggle-button";
import { useTheme } from "@/providers/theme-provider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const navItems = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

import { useState, useEffect, Fragment } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MainNav() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    let newTheme: "light" | "dark" | "system";

    if (theme === "system") {
      const isDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      newTheme = isDark ? "light" : "dark";
    } else {
      newTheme = theme === "light" ? "dark" : "light";
    }

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as any).startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  const getResolvedTheme = (): "light" | "dark" => {
    if (theme === "system") {
      return typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme as "light" | "dark";
  };

  const currentTheme = getResolvedTheme();

  return (
    <nav className="dark:from-background dark:via-background dark:to-background/20 sticky top-0 z-50 bg-linear-to-b from-white via-white to-white/20 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-10">
        {/* Left Section: Logo */}
        {/* Left Section: Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-10 md:size-12 lg:size-10" />
            <h3
              data-umami-event="nav-brand-text-click"
              className="font-excon text-xl font-bold md:text-2xl"
            >
              SaveServe
            </h3>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      asChild
                      className={`${navigationMenuTriggerStyle()} h-auto text-base`}
                      data-umami-event={`nav-link-${item.label.toLowerCase()}`}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
          {mounted && (
            <>
              <ThemeToggleButton
                theme={currentTheme}
                onClick={handleThemeToggle}
                variant="circle-blur"
                start="top-right"
              />
              <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />
            </>
          )}

          <Button
            asChild
            variant="default"
            size="default"
            className="bg-[#008640] text-white hover:bg-[#008640]/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
            data-umami-event="nav-signin-click"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {mounted && (
            <ThemeToggleButton
              theme={currentTheme}
              onClick={handleThemeToggle}
              variant="circle-blur"
              start="top-right"
              className="md:hidden"
            />
          )}
          <button
            className="text-foreground z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-background/95 fixed inset-0 top-22 z-40 flex h-[calc(100vh-88px)] flex-col gap-6 overflow-y-auto p-6 backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground py-4 text-lg font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="bg-border h-px w-full" />

            <div className="flex flex-col gap-4">
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-[#008640] w-full text-white hover:bg-[#008640]/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
