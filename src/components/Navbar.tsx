import React from "react";
import { ShieldCheck, Monitor, HelpCircle, LayoutDashboard, Globe, Moon, Sun, Laptop } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  // Toggle dark mode classes on document.documentElement
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md transition-colors dark:border-gray-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-indigo shadow-lg shadow-brand-indigo/25 transition-transform hover:scale-105 dark:bg-brand-indigo">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            VeriFact<span className="text-brand-violet">AI</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-5 lg:gap-x-8 ml-8 md:ml-6 lg:ml-12">
          <a
            href="#demo-tool"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("demo-tool")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-bold text-brand-indigo hover:text-brand-violet transition-colors dark:text-brand-lilac dark:hover:text-brand-violet whitespace-nowrap"
          >
            Live Tool
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-gray-600 hover:text-brand-violet transition-colors dark:text-gray-300 dark:hover:text-brand-violet whitespace-nowrap"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-gray-600 hover:text-brand-violet transition-colors dark:text-gray-300 dark:hover:text-brand-violet whitespace-nowrap"
          >
            How It Works
          </a>
          <a
            href="#technology"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-gray-600 hover:text-brand-violet transition-colors dark:text-gray-300 dark:hover:text-brand-violet whitespace-nowrap"
          >
            Technology
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-gray-600 hover:text-brand-violet transition-colors dark:text-gray-300 dark:hover:text-brand-violet whitespace-nowrap"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-gray-600 hover:text-brand-violet transition-colors dark:text-gray-300 dark:hover:text-brand-violet whitespace-nowrap"
          >
            FAQ
          </a>
        </nav>

        {/* Actions & View Selector */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            id="theme-toggle"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Try Live Tool Button */}
          <button
            onClick={() => document.getElementById("demo-tool")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-brand-indigo hover:bg-brand-violet text-white font-bold text-xs px-4 py-2 transition-all active:scale-95 cursor-pointer shadow shadow-brand-indigo/20"
          >
            Try Live Tool
          </button>
        </div>
      </div>
    </header>
  );
}
