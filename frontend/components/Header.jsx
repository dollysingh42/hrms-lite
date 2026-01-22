'use client';

import React, { useEffect, useState } from "react";
import { Moon, Sun, Bell } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-16 shadow-sm border-b 
      bg-background border-border text-foreground transition-colors duration-300">
      
      <div className="flex items-center pl-10 lg:pl-0 overflow-hidden">
        <h1 className="font-semibold text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
          HRMS Lite <span className="hidden sm:inline">Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground text-muted-foreground transition cursor-pointer"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="p-2 text-muted-foreground hover:text-foreground transition cursor-pointer hover:bg-accent rounded-full">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer pl-2 border-l border-border ml-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
            A
          </div>
          <span className="text-sm font-medium hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  );
}